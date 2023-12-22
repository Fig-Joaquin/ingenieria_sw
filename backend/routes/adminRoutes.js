import express from 'express'
const router = express.Router();
import {profile,authprofile,register,confirmAccount,extractUserIdFromToken,getAllUser,changeUserStatus,statusAdm} from "../controllers/adminController.js"
import checkAuth from "../middleware/authMiddleware.js"
import checkAdm from "../middleware/authAdmin.js"

router.get('/perfil/:rut', profile);
router.post('/registro',checkAuth, register)
router.get('/confirmar/:token',checkAuth, confirmAccount);
router.post('/login', authprofile);
router.get('/authcheck', checkAuth, extractUserIdFromToken);
router.get('/profile',checkAuth, getAllUser);
router.put('/estado-usuario',checkAuth, changeUserStatus);
router.get('/check', checkAdm,statusAdm);

export default router;

