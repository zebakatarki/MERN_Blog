import express from  'express';
import { verifytToken } from '../utils/userVerify.js';
import { create } from '../controllers/postController.js';

const router=express.Router();
router.post('/create', verifytToken ,create);

export default router;