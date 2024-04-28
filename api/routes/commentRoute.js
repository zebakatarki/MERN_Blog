import express from 'express';
import {verifytToken} from '../utils/userVerify.js';
import { createComment } from '../controllers/commentController.js';
const router = express.Router();

router.post('/create',verifytToken, createComment);

export default router;