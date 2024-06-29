const Project = require("../modules/projects/projects.model");


const users = {};


let conId = 1;
const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#FF8C33", "#33FF8C", "#338CFF", "#FF338C", "#8C33FF",
    "#FFD433", "#33FFD4", "#D433FF", "#FF33D4", "#D4FF33",
    "#B833FF", "#33FFB8", "#FFB833", "#33B8FF", "#B8FF33",
    "#FF33B8", "#33FFD8", "#D8FF33", "#FFD833", "#33D8FF",
    "#D833FF", "#FF33D8", "#33FFDC", "#DCFF33", "#FFDCDC",
    "#33DCDC", "#DC33FF", "#FFDC33", "#33FFDC", "#DCDC33",
    "#FF33DC", "#33DCFF", "#DC33DC", "#FFDC33", "#33FFDC",
    "#DCDCFF", "#FF33DC", "#33FFDC", "#DCFF33", "#FFDCDC",
    "#33DCDC", "#DC33FF", "#FFDC33", "#33FFDC", "#DCDC33",
    "#FF4500", "#32CD32", "#1E90FF", "#FF69B4", "#8A2BE2"
];









const bootstrapSocket = (io) => {

    const getAllConnectedClients = (roomId) => {
        const currentRoomClients = io.sockets.adapter.rooms.get(roomId);
        console.log(users);
        const clients = currentRoomClients ? Array.from(currentRoomClients).map((socketId) => ({
            socketId,
            client: users[socketId]

        })) : [];
        return clients;
    };
    io.on('connection', (socket) => {
        console.log('user connected', socket.id);



        socket.on('join_public', function (room) {
            console.log('joining room', room);
            socket.join(room);
        });

        socket.on('new_product', (product) => {
            console.log('message from client :-', product);

            io.emit('update', "updating the product list");
        });
        socket.on('join_private', async function ({ room, user }) {
            console.log('joining room private', room);
            // if (Object.values(users).find((u) => u.username === user.username)) {
            //     return io.to;
            // }

            users[socket.id] = {};

            users[socket.id].user = socket.user = 'user' + conId;
            users[socket.id].color = socket.color = colors[conId % colors.length];
            users[socket.id].username = socket.username = user.username;

            conId++;

            socket.join(room);
            const clients = getAllConnectedClients(room);


            clients.forEach((data) => {

                io.to(data.socketId).emit('new_user', {
                    clients,
                    message: `${user.username} joined the room`,
                    username: user.username,
                    socketId: socket.id
                });

            });
            const doc = await Project.findById(room);

            socket.emit('initial-document', { content: doc.document, changes: doc.changes });

        });
        socket.on('editor-change-client', async (change) => {
            // applyChange(change);

            await Project.findByIdAndUpdate(change.room, {
                $push: { changes: change.changes },
                $set: { document: change.document }
            });


            socket.broadcast.emit('editor-change', change);


        });
        socket.on('disconnecting', () => {
            console.log('disconnected', socket.id);
            const rooms = Array.from(socket.rooms);
            console.log(rooms, 'rooms');

            rooms.forEach((room) => {
                const clients = getAllConnectedClients(room);
                clients.forEach((data) => {
                    console.log(users, 'users');
                    console.log(socket);
                    io.to(data.socketId).emit('user_left', {
                        clients: clients.filter((client) => client.socketId !== socket.id),
                        message: `${socket.username} left the room`,
                        username: socket.username,
                        socket: socket.id
                    });

                });
            });

            delete users[socket.id];
            socket.leave();

        });
        socket.on('leave-room', ({ room }) => {
            console.log(`leave room the id is ${socket.id} username is ${socket.username}`, room);
            const rooms = Array.from(socket.rooms);


            rooms.forEach((room) => {
                const clients = getAllConnectedClients(room);
                clients.forEach((data) => {

                    io.to(data.socketId).emit('user_left', {
                        clients: clients.filter((client) => client.socketId !== socket.id),
                        message: `${socket.username} left the room`,
                        username: users[socket.id],
                        socket: socket.id
                    });

                });
            });
            delete users[socket.id];

            socket.leave(room);
        });
        socket.on('code-change', ({ code, room }) => {
            console.log('code change', code);
            socket.in(room).emit('reflact-change', { code });
        });
        socket.on('sync-code', ({ code, socketId }) => {
            console.log('sync code', code, socketId);
            io.to(socketId).emit('reflact-change', { code: code });
        });
    });

    io.on('error', (err) => {
        console.log(err, 'in socket');
    });

};

module.exports = bootstrapSocket;