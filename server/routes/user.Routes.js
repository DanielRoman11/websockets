import express from 'express';
import { registerUser, registerUserPost } from '../controllers/user.Controller.js';

const router = express.Router();

router.get('/register', registerUser);
router.post('/register', registerUserPost);
router.get('/login', );
router.put('/:id', );
router.delete('/:id', );

export default router;