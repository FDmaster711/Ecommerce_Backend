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
        // 👇 PEGA AQUÍ TU URL DE RENDER EXACTA (SIN barra al final)
        url: 'https://ecommerce-api-x8jv.onrender.com', 
        description: 'Servidor Producción (Render)'
      },
      {
        // Esta opción servirá cuando trabajes en tu PC
        url: `http://localhost:${process.env.API_PORT || 5800}`,
        description: 'Servidor Local'
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