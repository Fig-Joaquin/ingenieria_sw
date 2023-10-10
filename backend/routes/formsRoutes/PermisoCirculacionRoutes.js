const express = require('express');
const router = express.Router();

// PERMISO DE CIRCULACIÓN:

const formController = require('../controllers/formsControllers/PermisoCirculacionController.js');

// Crear un nuevo formulario de Permiso de Circulación
router.post('/permisocirculacion', formController.crearFormulario);

// Obtener un formulario por su RUT
router.get('/permisocirculacion/:rut', formController.obtenerFormularioPorRut);

// Eliminar un formulario por su RUT
router.delete('/permisocirculacion/:rut', formController.eliminarFormulario);

// Marcar un formulario como pagado por su RUT
router.put('/permisocirculacion/:rut/pagado', formController.marcarComoPagado);

module.exports = PermisoCirculacionRoutes;
