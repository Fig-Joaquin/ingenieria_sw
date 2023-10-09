import express from 'express'
const router = express.Router();
import {register,loginUser,updateUser,getUserProfile,getUserTransactions} from "../controllers/userController.js";

router.post('/login/', loginUser);
router.post('/registro', register)
router.post('/updateUser/', updateUser);
router.get('/getUserProfile/', getUserProfile);
router.get('/getUserTransactions/', getUserTransactions);

export default router;
