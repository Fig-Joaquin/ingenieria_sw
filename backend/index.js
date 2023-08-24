import express from 'express';	// importa express

const app = express();	// Llamado a la función de express

app.use('/', (req, res) => {
    res.send('App use running');
})	// Ruta principal

app.listen(4000, () => console.log('Conexión realizada en el puerto 4000'));    // Inicializa el servidor en el puerto 4000
