import express from 'express' // importa express
const router = express.Router(); // enrutador

import {createAppealForClient,decisionAppeal,getUserAppeals,getAllAppeals} from "../controllers/appealController.js";

router.post('/nueva-apelacion', createAppealForClient); // Ruta para crear una apelación
router.put('/decision-apelacion', decisionAppeal); // Ruta para crear una apelación
router.get('/apelaciones-cliente', getUserAppeals); // Ruta para obtener las apelaciones de un usuario
router.get('/apelaciones', getAllAppeals); // Ruta para obtener todas las apelaciones
export default router; // exporta el enrutador