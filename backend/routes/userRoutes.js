import express from 'express'
const router = express.Router();
import { register, login, getUser } from  '../controllers/userController.js';

// Register a new user
router.post('/register', register);

// Login an existing user
router.get('/login', login);

// Get a user by rut
router.get('/user', getUser);

export default router;