import express from 'express';
const router = express.Router();
import { 
    crearDatosTransferenciaFijos, 
    obtenerDatosTransferencia,
} from "../controllers/datosTransferenciaController.js";

// Crear datos de transferencia fijos (ejecutar una sola vez)
router.post('/crear-datos-fijos', crearDatosTransferenciaFijos);

// Obtener los datos de transferencia
router.get('/obtener-datos-transferencia', obtenerDatosTransferencia);

export default router;
