// RutaArchivoRoutes.js
import express from 'express';
import buscarRutaPorRutUsuario from '../controllers/rutaArchivoController.js';

const router = express.Router();

// Definir la ruta para buscar la ruta de archivo por RUT de usuario
router.post('/ruta-archivo/usuario', buscarRutaPorRutUsuario);

export default router;
