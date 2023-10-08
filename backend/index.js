import express from 'express';	// importa express
import conectarDB from './config/db.js';	// importa la función de conexión a la base de datos
import dotenv from 'dotenv';	// importa dotenv

const app = express();	// Llamado a la función de express
dotenv.config();    // Llamado a la función de dotenv
conectarDB();	// Llamado a la función de conexión a la base de datos


app.use('/', (req, res) => {
    res.send('App use running');
})	// Ruta principal

app.listen(4000, () => console.log('Conexión realizada en el puerto 4000'));    // Inicializa el servidor en el puerto 4000
