import express from 'express';
const router = express.Router();
import {crearDerechosDeAseo, obtenerDerechosDeAseoPorRut, marcarComoPagadoDerechosDeAseo, obtenerTodosLosDerechosDeAseo,} from "../../controllers/formsControllers/DerechoDeAseoController.js";

// Crear un nuevo pago de Derechos de Aseo
router.post('/crear', crearDerechosDeAseo);

// Obtener un pago de Derechos de Aseo por su RUT
router.get('/obtener/:rutResidente', obtenerDerechosDeAseoPorRut);

// Obtener todos los pagos de Derechos de Aseo
router.get('/obtener-todos', obtenerTodosLosDerechosDeAseo);

// Marcar un pago de Derechos de Aseo como pagado por su RUT
router.put('/marcar/:rutResidente/pagado', marcarComoPagadoDerechosDeAseo);

export default router;
