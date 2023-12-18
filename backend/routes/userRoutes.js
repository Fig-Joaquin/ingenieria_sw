import express from 'express';
import { register, login, getUser, updateUser  } from '../controllers/userController.js';

const router = express.Router();

router.post('/registro', register);
router.post('/login', login);
router.get('/perfil', getUser);
router.put('/actualizar', updateUser);


export default router;