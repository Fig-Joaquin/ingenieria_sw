import express from 'express'
const router = express.Router();
import {uploadComprobante} from "../controllers/uploadController.js";

router.post('/subir-comprobante', uploadController.uploadComprobante);

export default router;
