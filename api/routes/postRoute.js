import express from  'express';
import { verifytToken } from '../utils/userVerify.js';
import { create, getposts } from '../controllers/postController.js';

const router=express.Router();
router.post('/create', verifytToken ,create);
router.get('/getposts', getposts);

export default router;