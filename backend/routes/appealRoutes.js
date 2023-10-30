import express from 'express' // importa express
import checkAuth from '../middleware/authMiddleware.js';
const router = express.Router(); // enrutador

import {createAppealForClient,decisionAppeal,getUserAppeals,getAllAppeals} from "../controllers/appealController.js";

router.post('/nueva-apelacion',checkAuth, createAppealForClient); // Ruta para crear una apelación
router.put('/decision-apelacion',checkAuth, decisionAppeal); // Ruta para crear una apelación
router.get('/apelaciones-cliente',checkAuth, getUserAppeals); // Ruta para obtener las apelaciones de un usuario
router.get('/apelaciones',checkAuth, getAllAppeals); // Ruta para obtener todas las apelaciones

export default router; // exporta el enrutador