import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorHandler, logErrors } from './Middlewares/errorHandler.js';
import routerApi from './routes/rutas.js';
import { setupSwagger } from './swagger.js';

// Puerto del servidor
const port = process.env.PORT || 4000;

// Conexión a MongoDB
mongoose
  .connect(
    'mongodb+srv://bressesp8:tV8Z58jQqXUgJFa@clusterdaw24.syeub.mongodb.net/mydatabase?retryWrites=true&w=majority'
  )
  .then(() => console.log('Conexión a MongoDB exitosa.'))
  .catch((err) => console.error('No se pudo conectar a MongoDB', err));

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Middleware de Express para JSON
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Server en funcionamiento'); // Responde con un mensaje simple
});

// rutas de la API
routerApi(app);

// Configurar Swagger
setupSwagger(app);

// Middleware
app.use(logErrors);
app.use(errorHandler);

// puerto
app.listen(port, () =>
  console.log(`Servidor corriendo en http://localhost:${port}`)
);

