import express from 'express';
import validarComprobante from '../controllers/ValidarComprobante.js'; 

const router = express.Router();

router.post('/comprobante', validarComprobante);

export default router;
