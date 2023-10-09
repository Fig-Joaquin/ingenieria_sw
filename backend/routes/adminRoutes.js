import express from 'express'
const router = express.Router();
import {profile,profileBody,register,confirmAccount} from "../controllers/adminController.js";

router.get('/perfil/:rut', profile);
router.post('/registro', register)
router.get('/confirmar/:token', confirmAccount);
router.get('/buscar/', profileBody);

export default router;

