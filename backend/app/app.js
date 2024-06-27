const notFoundErrorHandler = require('./errors/not-found');
const router = require('./routes');
const globalErrorHandler = require('./errors/global');
const express = require('express');
const cors = require('cors');
// import globalErrorHandler from './middlewares/globalErrorHandler';
// import router from './routes';
const app = express();


//middleare and parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Application routes
app.use("/api/v1", router);


//testing route
app.get('/', (_, res) => {
    res.send({ status: true, message: 'server runinng perfectly' });
});



//ERRORS HANDLERS


//global error handler should be always under the application route
app.use(globalErrorHandler);

//not found error handler
app.use(notFoundErrorHandler);


module.exports = app;