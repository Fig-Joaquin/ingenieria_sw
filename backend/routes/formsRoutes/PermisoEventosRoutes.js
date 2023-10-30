import express from 'express';
const router = express.Router();
import { crearPermisoEventosEspectaculos, obtenerPermisoEventosEspectaculosPorRut, marcarComoPagadoPermisoEventosEspectaculos, obtenerTodosLosPermisosEventosEspectaculos, } from "../../controllers/formsControllers/PermisoEventosController.js";

// Crear un nuevo Permiso de Eventos y Espectáculos
router.post('/crear', crearPermisoEventosEspectaculos);

// Obtener un Permiso de Eventos y Espectáculos por su RUT
router.get('/obtener/:rutSolicitante', obtenerPermisoEventosEspectaculosPorRut);

// Obtener todos los Permisos de Eventos y Espectáculos
router.get('/obtener-todos', obtenerTodosLosPermisosEventosEspectaculos);

// Marcar un Permiso de Eventos y Espectáculos como pagado por su RUT
router.put('/marcar/:rutSolicitante/pagado', marcarComoPagadoPermisoEventosEspectaculos);

export default router;
