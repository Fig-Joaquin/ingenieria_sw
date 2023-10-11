import express from 'express'
const router = express.Router();
import {profile,authprofile,register,confirmAccount,extractUserIdFromToken} from "../controllers/adminController.js"
import checkAuth from "../middleware/authMiddleware.js"


router.get('/perfil/:rut', profile);
router.post('/registro', register)
router.get('/confirmar/:token', confirmAccount);
router.post('/login', authprofile);
router.get('/auth', authprofile);
router.get('/authcheck', checkAuth, extractUserIdFromToken);
export default router;

