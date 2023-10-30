import express from 'express';
const router = express.Router();
import { uploadComprobante } from "../controllers/uploadController.js"; 

router.post('/subir-comprobante', uploadComprobante);
router.post('/subir-comprobante/:comprobanteId', uploadComprobante); //sube comprobante asociado a id

export default router;
