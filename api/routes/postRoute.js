import express from  'express';
import { verifytToken } from '../utils/userVerify.js';
import { create, getposts, deletepost,updatepost } from '../controllers/postController.js';

const router=express.Router();
router.post('/create', verifytToken ,create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId',verifytToken, deletepost);
router.put('/updatepost/:postId/:userId', verifytToken, updatepost)

export default router;