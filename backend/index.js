import express from 'express';
import conectarDB from './config/db.js';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import PermisoCirculacionRoutes from './routes/formsRoutes/PermisoCirculacionRoutes.js';
import userRoutes from './routes/userRoutes.js';
import appealRoutes from './routes/appealRoutes.js';
import appealUserRoutes from './routes/appealUserRoutes.js';
import fineRoutes from './routes/fineRoutes.js';
import PatenteComercialRoutes from './routes/formsRoutes/PatenteComercialRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import DerechoDeAseoRoutes from './routes/formsRoutes/DerechoDeAseoRoutes.js';
import PermisoConstruccionRoutes from './routes/formsRoutes/PermisoConstruccionRoutes.js';
import PermisoEdificacionRoutes from './routes/formsRoutes/PermisoEdificacionRoutes.js';
import PermisoEventosRoutes from './routes/formsRoutes/PermisoEventosRoutes.js';
import datosTransferenciaRoutes from './routes/datosTransferenciaRoutes.js';
import transaccionRoutes from './routes/transaccionRoutes.js';
import cors from 'cors';
import rutaArchivo from './routes/rutaArchivoRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
app.use(express.json());
dotenv.config();
conectarDB();

// Obtener el directorio actual usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración CORS (antes de las definiciones de rutas)
// Configura CORS para todas las rutas
// Puedes ajustar el valor de origin según tus necesidades
const corsOptions = {
  origin: '*', // Permitir solicitudes desde cualquier origen (para pruebas)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization',
};

// Configurar el middleware para servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', cors(corsOptions), express.static(path.join(__dirname, 'uploads')));

// Middleware para manejar las solicitudes OPTIONS de manera explícita
app.options('*', cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/adm-muni', cors(corsOptions), adminRoutes, appealRoutes, fineRoutes);
app.use('/permcirc', cors(corsOptions), PermisoCirculacionRoutes);
app.use('/usuario', cors(corsOptions), userRoutes, adminRoutes);
app.use('/nueva-apelacion', cors(corsOptions), appealUserRoutes);
app.use('/patcom', cors(corsOptions), PatenteComercialRoutes);
app.use('/upload', cors(corsOptions), uploadRoutes);
app.use('/aseo', cors(corsOptions), DerechoDeAseoRoutes);
app.use('/permconst', cors(corsOptions), PermisoConstruccionRoutes);
app.use('/permedif', cors(corsOptions), PermisoEdificacionRoutes);
app.use('/permevent', cors(corsOptions), PermisoEventosRoutes);
app.use('/datosmunicipalidad', cors(corsOptions), datosTransferenciaRoutes);
app.use('/multas-usuario', cors(corsOptions), fineRoutes);
app.use('/transaccion', cors(corsOptions), transaccionRoutes);
app.use('/boletas', cors(corsOptions), rutaArchivo);
app.use((err, req, res, next) => {
  if (err.name === 'CorsError') {
    res.status(500).json({ error: 'Error de CORS' });
  } else {
    next(err);
  }
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Conexión con el puerto ${PORT}`));
