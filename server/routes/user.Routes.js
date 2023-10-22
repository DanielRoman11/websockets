import express from 'express';
import { registerUser, resgisterUserPost } from '../controllers/user.Controller.js';

const router = express.Router();

router.get('/register', registerUser);
router.post('/register', resgisterUserPost);
router.get('/login', );
router.put('/:id', );
router.delete('/:id', );

export default router;