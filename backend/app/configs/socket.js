

const onlineUsers = {};



const bootstrapSocket = (io) => {

    const getAllConnectedClients = (roomId) => {
        const currentRoomClients = io.sockets.adapter.rooms.get(roomId);
        const clients = currentRoomClients ? Array.from(currentRoomClients).map((socketId) => ({
            socketId,
            username: onlineUsers[socketId]

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
        socket.on('join_private', function ({ room, user }) {
            console.log('joining room private', room);
            onlineUsers[socket.id] = user.username;
            socket.join(room);
            const clients = getAllConnectedClients(room);
            console.log(clients, 'clients');

            clients.forEach((data) => {

                io.to(data.socketId).emit('new_user', {
                    clients,
                    message: `${user.username} joined the room`,
                    username: user.username,
                    socket: socket.id
                });

            });

        });
        socket.on('disconnecting', () => {
            console.log('disconnected', socket.id);
            const rooms = Array.from(socket.rooms);
            console.log(rooms, 'rooms');

            rooms.forEach((room) => {
                const clients = getAllConnectedClients(room);
                clients.forEach((data) => {

                    io.to(data.socketId).emit('user_left', {
                        clients: clients.filter((client) => client.socketId !== socket.id),
                        message: `${onlineUsers[socket.id]} left the room`,
                        username: onlineUsers[socket.id],
                        socket: socket.id
                    });

                });
            });
            delete onlineUsers[socket.id];
            socket.leave();

        });
        socket.on('code-change', ({ code, room }) => {
            console.log('code change', code);
            socket.in(room).emit('reflact-change', { code });
        });
    });

    io.on('error', (err) => {
        console.log(err, 'in socket');
    });

};

module.exports = bootstrapSocket;