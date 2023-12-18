import express from 'express';
import transaccionController from '../controllers/transaccionController.js';

const router = express.Router();

router.post('/enviar', transaccionController.crearTransaccion);
router.get('/buscar', transaccionController.buscarPorRut);

export default router;
