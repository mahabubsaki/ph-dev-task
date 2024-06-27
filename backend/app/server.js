

const mongoose = require('mongoose');
const envConfigs = require('./configs/env');
const app = require('./app');
let server;


process.on("uncaughtException", (error) => {
    console.log(error, 'in server file');
    process.exit(1);
});
async function bootstrap() {

    try {
        await mongoose.connect(envConfigs.dbUri);
        server = app.listen(envConfigs.port, () => {
            console.log(`Listening to ${envConfigs.port}`);
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