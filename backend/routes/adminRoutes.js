import express from 'express'
const router = express.Router();
import {profile,register} from "../controllers/adminController.js";

router.get('/perfil', profile);
router.post('/registro', register)

export default router;

