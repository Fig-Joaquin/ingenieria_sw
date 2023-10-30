import express from 'express' // importa express
const router = express.Router(); // enrutador

import createAppealUser from "../controllers/appealUserController.js";

router.post('/solicitud', createAppealUser); // Ruta para crear una apelación


export default router; // exporta el enrutador