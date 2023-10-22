import express from 'express';
import { register } from '../controllers/user.Controller.js';

const router = express.Router();

router.get('/register', register);
router.post('/regsiter', );
router.get('/login', );
router.put('/:id', );
router.delete('/:id', );

export default router;