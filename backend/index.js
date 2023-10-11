import express from 'express'	// importa express
import conectarDB from './config/db.js'	// importa la función de conexión a la base de datos
import dotenv from 'dotenv'	// importa dotenv
import adminRoutes from './routes/adminRoutes.js'	// importa las rutas de administrador
import PermisoCirculacionRoutes from './routes/formsRoutes/PermisoCirculacionRoutes.js'	// importa las rutas de permiso de circulación
import userRoutes from './routes/userRoutes.js'
import appealRoutes from './routes/appealRoutes.js'	// importa las rutas de apelación

const app = express();	// Llamado a la función de express
app.use(express.json());	// Enviar datos de tipo json
dotenv.config();    // Llamado a la función de dotenv
conectarDB();	// Llamado a la función de conexión a la base de datos


app.use('/adm-muni', adminRoutes, appealRoutes);	// Ruta administrador - tambien dirige a las apelaciones
app.use('/permcirc', PermisoCirculacionRoutes);
app.use('/usuario', userRoutes);// ruta usuario


const PORT = process.env.PORT || 4000;	// Puerto de conexión

app.listen(PORT, () => console.log('Conexión con el puerto 4000'));    // Inicializa el servidor en el puerto 4000
