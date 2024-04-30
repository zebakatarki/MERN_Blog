import express from 'express';
import {verifytToken} from '../utils/userVerify.js';
import { createComment } from '../controllers/commentController.js';
import { getPostComments } from '../controllers/commentController.js';
import { likeComment } from '../controllers/commentController.js';
import { editComment } from '../controllers/commentController.js';
import { deleteComment } from '../controllers/commentController.js';
const router = express.Router();

router.post('/create',verifytToken, createComment);
router.get('/getPostComments/:postId',getPostComments);
router.put('/likeComment/:commentId', verifytToken, likeComment);
router.put('/editComment/:commentId', verifytToken, editComment);
router.delete('/deleteComment/:commentId', verifytToken, deleteComment);

export default router;