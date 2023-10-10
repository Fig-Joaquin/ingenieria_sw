import express from 'express';
import { register, login, getUser, getUserTransactions } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', getUser);
router.get('/transactions', getUserTransactions);

export default router;