const express = require('express');
const morgan = require('morgan');
const UserRouter = require('../routes/UserRouter');
const configSwagger = require('../config/ConfigSwagger'); 
const swaggerUI = require('swagger-ui-express');


const app = express();
app.use(express.json());


// Middleware for logging requests
app.use(morgan('dev'));

// swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(configSwagger));


app.use('/api/v1/user', UserRouter);




module.exports= app;