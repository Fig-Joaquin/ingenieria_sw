import express from 'express'
const router = express.Router();
import {crearFormulario,obtenerFormularioPorRut,eliminarFormulario,marcarComoPagado} from "../../controllers/formsControllers/PermisoCirculacionController.js";
// PERMISO DE CIRCULACIÓN:

// Crear un nuevo formulario de Permiso de Circulación
router.post('/crear', crearFormulario);

// Obtener un formulario por su RUT
router.get('/obtener/:rut', obtenerFormularioPorRut);

// Eliminar un formulario por su RUT
router.delete('/eliminar/:rut', eliminarFormulario);

// Marcar un formulario como pagado por su RUT
router.put('/marcar/:rut/pagado', marcarComoPagado);

export default router;