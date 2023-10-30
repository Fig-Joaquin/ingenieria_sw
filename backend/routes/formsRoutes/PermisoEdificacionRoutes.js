import express from 'express';
const router = express.Router();
import { crearPermisoEdificacion, obtenerPermisoEdificacionPorRut,  marcarComoPagadoPermisoEdificacion, obtenerTodosLosPermisosEdificacion,
} from "../../controllers/formsControllers/PermisoEdificacionController.js";

// Crear un nuevo Permiso de Edificación
router.post('/crear', crearPermisoEdificacion);

// Obtener un Permiso de Edificación por su RUT
router.get('/obtener/:rutSolicitante', obtenerPermisoEdificacionPorRut);

// Obtener todos los Permisos de Edificación
router.get('/obtener-todos', obtenerTodosLosPermisosEdificacion);

// Marcar un Permiso de Edificación como pagado por su RUT
router.put('/marcar/:rutSolicitante/pagado', marcarComoPagadoPermisoEdificacion);

export default router;
