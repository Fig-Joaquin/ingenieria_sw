import express from 'express';
const router = express.Router();
import {crearFormulario, obtenerFormularioPorRut, eliminarFormulario, marcarComoPagado,} from "../../controllers/formsControllers/PatenteComercialController.js";

// Crear un nuevo formulario de Patentes Comerciales
router.post('/crear', crearFormulario);

// Obtener un formulario de Patentes Comerciales por su RUT
router.get('/obtener/:rut', obtenerFormularioPorRut);

// Eliminar un formulario de Patentes Comerciales por su RUT
router.delete('/eliminar/:rut', eliminarFormulario);

// Marcar un formulario de Patentes Comerciales como pagado por su RUT
router.put('/marcar/:rut/pagado', marcarComoPagado);

export default router;
