import express from 'express';
import { broadcast } from '../controllers/chat.Controller.js';

const router = express.Router();

router.get('/', broadcast);

export default router;