import express from 'express';
import { findAllUsers, findUser, loginUser, registerUser } from '../controllers/user.Controller.js';


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:id", findUser);
router.get("/", findAllUsers);


export default router;