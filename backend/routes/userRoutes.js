import express from 'express';
import { register, updateUser , login } from '../controllers/userController.js';
import verifyToken from '../middleware/authUser.js';

const router = express.Router();

router.post('/registro', register);
router.post('/login', login);

router.get('/perfil', verifyToken, (req, res) => {
  res.json({ msg: 'Perfil del usuario', user: req.user });
  console.log(req.user);
  });
  
router.put('/actualizar', updateUser);


export default router;