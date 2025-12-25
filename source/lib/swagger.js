import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv'; 
dotenv.config();

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
        url: process.env.ZG_RENDER_EXTERNAL_URL || `http://localhost:${process.env.API_PORT || 5800}`,
        description: 'Servidor Principal'
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