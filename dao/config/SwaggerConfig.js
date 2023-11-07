const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Productos y Carritos',
    version: '1.0.0',
    description: 'Documentación de la API de Productos y Carritos',
  },
  servers: [
    {
      url: 'http://localhost:3000', 
      description: 'Servidor de desarrollo',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['../dao/routes/productRoutes.js', '../dao/routes/cartRoutes.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
