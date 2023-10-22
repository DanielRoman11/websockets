import express from 'express';
import { registeUser } from '../controllers/user.Controller.js';

const router = express.Router();

router.get('/register', registeUser);
router.post('/register', );
router.get('/login', );
router.put('/:id', );
router.delete('/:id', );

export default router;