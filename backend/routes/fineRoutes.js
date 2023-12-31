import express from 'express' // importa express
import checkAuth from "../middleware/authMiddleware.js" // importa el middleware
const router = express.Router(); // enrutador

import {createFine,getAllFines,getFinesByRut,updateFineStatus,getFinesByRutUser} from "../controllers/fineController.js";

router.post('/nueva-multa', checkAuth, createFine); // Ruta para crear una apelación
router.get('/multas',checkAuth, getAllFines); // Ruta para obtener todas las multas
router.get('/persona-multa', getFinesByRut); // Ruta para obtener las multas por rut
router.put('/estado-multa',checkAuth, updateFineStatus); // Ruta para actualizar el estado de una apelacion 
router.get('/persona-multa/:rut', getFinesByRutUser);

export default router; // exporta el enrutador