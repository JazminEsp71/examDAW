import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

//Configuracion de swagger
const swaggerDefinition ={
  openapi: '3.0.0',

  info:{
    title:'Documentacion de la API',
    version: '1.0.0',
    description: 'Documentracion de la API con Swagger',
  },
  servers:[
    {
      url: 'http://localhost:4000/',
      description: 'Servidor de desarrollo'
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}



