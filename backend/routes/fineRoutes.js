import express from 'express' // importa express
const router = express.Router(); // enrutador

import {createFine,getAllFines,getFinesByRut} from "../controllers/fineController.js";

router.post('/nueva-multa', createFine); // Ruta para crear una apelación
router.get('/multas', getAllFines); // Ruta para obtener todas las multas
router.get('/persona-multa', getFinesByRut); // Ruta para obtener las multas por rut
export default router; // exporta el enrutador