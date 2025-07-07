const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Basic Auth API- JWT+OAuth2',
    version: '1.0.0',
    description: 'API documentation for a basic authentication system using JWT and OAuth2',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'local Server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../routes/*.js')],
};

const configSwagger = swaggerJSDoc(options);

module.exports = configSwagger;
