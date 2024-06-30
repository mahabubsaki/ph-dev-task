

const mongoose = require('mongoose');
const envConfigs = require('./configs/env');
const app = require('./app');
const { createServer } = require('http');
const { Server } = require('socket.io');
const bootstrapSocket = require('./configs/socket');


const httpServer = createServer(app);


const io = new Server(httpServer, {
    cors: {
        origin: 'https://ph-dev-task-frontend.vercel.app'
    },

});



let server;


process.on("uncaughtException", (error) => {
    console.log(error, 'in server file');
    process.exit(1);
});
async function bootstrap() {

    try {
        await mongoose.connect(envConfigs.dbUri);
        server = httpServer.listen(envConfigs.port, () => {
            console.log(`Listening to ${envConfigs.port}`);
            bootstrapSocket(io);
        });

    } catch (err) {
        console.log('failed to connect db in server file', err);
    }
    process.on('unhandledRejection', (error) => {
        if (server) {
            server.close(() => {
                console.log(error, 'in server file');
                process.exit(1);
            });
        } else {
            process.exit(1);
        }

    });
}
bootstrap();

process.on("SIGTERM", () => {
    console.log("Sigterm recieved");
    server.close(() => {
        process.exit(1);
    });
});
