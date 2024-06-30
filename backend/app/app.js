const notFoundErrorHandler = require('./errors/not-found');
const router = require('./routes');
const globalErrorHandler = require('./errors/global');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const useragent = require('express-useragent');


//middleare and parser
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://ph-dev-task-frontend.vercel.app']
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());


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