import express from  'express';
import { verifytToken } from '../utils/userVerify.js';
import { create, getposts, deletepost } from '../controllers/postController.js';

const router=express.Router();
router.post('/create', verifytToken ,create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId',verifytToken, deletepost);

export default router;