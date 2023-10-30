import express from 'express';
import { register, login, getUser, updateUser  } from '../controllers/userController.js';

const router = express.Router();

router.post('/registro', register);//ruta para registrar usuario
router.post('/login', login);//ruta para logear usuario
router.get('/perfil', getUser);//ruta para obtener datos del usuario
router.put('/actualizar-perfil', updateUser);//ruta para actualizar datos del usuario


export default router;