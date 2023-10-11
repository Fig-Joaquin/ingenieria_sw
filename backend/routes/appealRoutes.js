import express from 'express' // importa express
const router = express.Router(); // enrutador

import {createAppealForClient,decisionAppeal} from "../controllers/appealController.js";

router.post('/nueva-apelacion', createAppealForClient); // Ruta para crear una apelación
router.put('/decision-apelacion', decisionAppeal); // Ruta para crear una apelación
export default router; // exporta el enrutador