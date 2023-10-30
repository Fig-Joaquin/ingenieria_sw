import express from 'express';
const router = express.Router();
import { crearPermisoConstruccion,  obtenerPermisoConstruccionPorRut, marcarComoPagadoPermisoConstruccion, obtenerTodosLosPermisosConstruccion, } from "../../controllers/formsControllers/PermisoConstruccionController.js";

// Crear un nuevo Permiso de Construcción
router.post('/crear', crearPermisoConstruccion);

// Obtener un Permiso de Construcción por su RUT
router.get('/obtener/:rutSolicitante', obtenerPermisoConstruccionPorRut);

// Obtener todos los Permisos de Construcción
router.get('/obtener-todos', obtenerTodosLosPermisosConstruccion);

// Marcar un Permiso de Construcción como pagado por su RUT
router.put('/marcar/:rutSolicitante/pagado', marcarComoPagadoPermisoConstruccion);

export default router;
