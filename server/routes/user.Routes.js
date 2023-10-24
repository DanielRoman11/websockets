import express from 'express';
import { register, registerUser } from '../controllers/user.Controller.js';


const router = express.Router();

router.get("/register", register);
router.post("/register", registerUser);

export default router;