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
app.use(cors({
  origin: 'http://localhost:5173', // Reemplaza con la URL de tu aplicación React
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));


// Configurar el middleware para servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/adm-muni', adminRoutes, appealRoutes, fineRoutes);
app.use('/permcirc', PermisoCirculacionRoutes);
app.use('/usuario', userRoutes);
app.use('/nueva-apelacion', appealUserRoutes);
app.use('/patcom', PatenteComercialRoutes);
app.use('/upload', uploadRoutes);
app.use('/aseo', DerechoDeAseoRoutes);
app.use('/permconst', PermisoConstruccionRoutes);
app.use('/permedif', PermisoEdificacionRoutes);
app.use('/permevent', PermisoEventosRoutes);
app.use('/datosmunicipalidad', datosTransferenciaRoutes);
app.use('/multas-usuario', fineRoutes);
app.use('/transaccion', transaccionRoutes);
app.use('/boletas',rutaArchivo);

const PORT = process.env.PORT || 443;
app.listen(PORT, () => console.log(`Conexión con el puerto ${PORT}`));
