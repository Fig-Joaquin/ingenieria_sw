import express from 'express' // importa express
import checkAuth from "../middleware/authMiddleware.js" // importa el middleware
const router = express.Router(); // enrutador

import {createFine,getAllFines,getFinesByRut,updateFineStatus} from "../controllers/fineController.js";

router.post('/nueva-multa', checkAuth, createFine); // Ruta para crear una apelación
router.get('/multas', getAllFines); // Ruta para obtener todas las multas
router.get('/persona-multa', getFinesByRut); // Ruta para obtener las multas por rut
router.put('/estado-multa', updateFineStatus); // Ruta para actualizar el estado de una apelacion 

export default router; // exporta el enrutador