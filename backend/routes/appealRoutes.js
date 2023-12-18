import express from 'express' // importa express
import checkAuth from '../middleware/authMiddleware.js';
const router = express.Router(); // enrutador

import {decisionAppeal,getUserAppeals,getAllAppeals,createAppealForClient,findAppealsByClientRut} from "../controllers/appealController.js";

router.put('/decision-apelacion', checkAuth, decisionAppeal); // Ruta para crear una apelación
router.post('/apelaciones-cliente2', checkAuth, getUserAppeals); // Ruta para obtener las apelaciones de un usuario
router.get('/apelaciones', checkAuth, getAllAppeals); // Ruta para obtener todas las apelaciones
router.post('/nueva-apelacion', createAppealForClient); // Ruta para crear una apelación
router.post('/apelacion-cliente', checkAuth, findAppealsByClientRut); // Ruta para buscar apelacion por rut
export default router; // exporta el enrutador