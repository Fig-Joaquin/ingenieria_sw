import express from 'express'	// importa express
import conectarDB from './config/db.js'	// importa la función de conexión a la base de datos
import dotenv from 'dotenv'	// importa dotenv
import adminRoutes from './routes/adminRoutes.js'	// importa las rutas de administrador
import PermisoCirculacionRoutes from './routes/formsRoutes/PermisoCirculacionRoutes.js'	// importa las rutas de permiso de circulación
import userRoutes from './routes/userRoutes.js'
import appealRoutes from './routes/appealRoutes.js'	// importa las rutas de apelación
import appealUserRoutes from './routes/appealUserRoutes.js'
import fineRoutes from './routes/fineRoutes.js'	// importa las rutas de multas
import PatenteComercialRoutes from './routes/formsRoutes/PatenteComercialRoutes.js' // importa rutas de patente comercial
import uploadRoutes from './routes/uploadRoutes.js' // importa rutas para subida de comprobantes
import DerechoDeAseoRoutes from './routes/formsRoutes/DerechoDeAseoRoutes.js' //importa rutas para derechos de aseo
import PermisoConstruccionRoutes from './routes/formsRoutes/PermisoConstruccionRoutes.js' // ..
import PermisoEdificacionRoutes from './routes/formsRoutes/PermisoEdificacionRoutes.js' // ..
import PermisoEventosRoutes from './routes/formsRoutes/PermisoEventosRoutes.js' // ..
import datosTransferenciaRoutes from './routes/datosTransferenciaRoutes.js' // ..
import transaccionRoutes from './routes/transaccionRoutes.js' // ..
import cors from 'cors'; // Importa cors

const app = express();	// Llamado a la función de express
app.use(express.json());	// Enviar datos de tipo json
dotenv.config();    // Llamado a la función de dotenv
conectarDB();	// Llamado a la función de conexión a la base de datos
// Configura CORS (antes de las definiciones de rutas)
// Configura CORS para todas las rutas
app.use(cors());

app.use('/adm-muni', adminRoutes, appealRoutes, fineRoutes);	// Ruta administrador - tambien dirige a las apelaciones con funciones propias del administrador
app.use('/permcirc', PermisoCirculacionRoutes);
app.use('/usuario', userRoutes);// ruta usuario
app.use('/nueva-apelacion', appealUserRoutes);	// Ruta apelación para el usuario
app.use('/patcom', PatenteComercialRoutes); // Ruta Patente Comercial
app.use('/upload', uploadRoutes); // Ruta para subir archivos
app.use('/aseo', DerechoDeAseoRoutes); // Ruta para derecho de aseo
app.use('/permconst', PermisoConstruccionRoutes); //Ruta permiso de construcción
app.use('/permedif', PermisoEdificacionRoutes); //Ruta permiso de edificacion
app.use('/permevent', PermisoEventosRoutes); //Ruta permiso de eventos
app.use('/datosmunicipalidad', datosTransferenciaRoutes); //Ruta para obtener datos de municipalidad, opcional de usar manualmente.
app.use('/multas-usuario', fineRoutes);
app.use('/transaccion', transaccionRoutes);
const PORT = process.env.PORT || 443; //443;	// Puerto de conexión

app.listen(PORT, () => console.log('Conexión con el puerto 443 - 1705'));    // Inicializa el servidor en el puerto 4000
