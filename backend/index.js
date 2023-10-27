import express from 'express'	// importa express
import conectarDB from './config/db.js'	// importa la función de conexión a la base de datos
import dotenv from 'dotenv'	// importa dotenv
import administradorRoutes from './routes/adminRoutes.js'	// importa las rutas de administrador
import PermisoCirculacionRoutes from './routes/formsRoutes/PermisoCirculacionRoutes.js'	// importa las rutas de permiso de circulación
import PatenteComercialRoutes from './routes/formsRoutes/PatenteComercialRoutes.js' //importa las rutas de patentes comerciales
import uploadRoutes from './routes/uploadRoutes.js'

const app = express();	// Llamado a la función de express
app.use(express.json());	// Enviar datos de tipo json
dotenv.config();    // Llamado a la función de dotenv
conectarDB();	// Llamado a la función de conexión a la base de datos

app.use('/comprobante', uploadRoutes) // Ruta subir comprobantes
app.use('/adm-muni', administradorRoutes);	// Ruta administrador
app.use('/permcirc', PermisoCirculacionRoutes); // Ruta Permiso Circulacion
app.use('/patcom', PatenteComercialRoutes); // Ruta Patente Comercial

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log('Conexión realizada en el puerto 4000'));    // Inicializa el servidor en el puerto 4000
