import express from 'express'
const router = express.Router();
import {profile,authprofile,register,confirmAccount,extractUserIdFromToken} from "../controllers/adminController.js"
import checkAuth from "../middleware/authMiddleware.js"


router.get('/perfil/:rut', profile);
router.post('/registro',checkAuth, register)
router.get('/confirmar/:token',checkAuth, confirmAccount);
router.get('/login', authprofile);
router.get('/authcheck', checkAuth, extractUserIdFromToken);

export default router;

