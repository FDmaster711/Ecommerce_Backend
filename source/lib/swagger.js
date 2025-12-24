// source/config/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API',
      version: '1.0.0',
      description: 'Documentation For the Ecommerce Api',
    },
    servers: [
      {
        url: 'http://localhost:5800', 
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  
  apis: ['./source/routes/*.js'], 
};

export const swaggerSpec = swaggerJSDoc(options);