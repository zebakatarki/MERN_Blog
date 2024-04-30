import express from 'express';
import {verifytToken} from '../utils/userVerify.js';
import { createComment } from '../controllers/commentController.js';
import { getPostComments } from '../controllers/commentController.js';
const router = express.Router();

router.post('/create',verifytToken, createComment);
router.get('/getPostComments/:postId',getPostComments)

export default router;