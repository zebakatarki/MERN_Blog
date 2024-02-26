import express from 'express';
import { test } from '../controllers/userController.js';

const router = express.Router();

router.get('/test', test);

router.get('/tests',(req,res)=>{
    // { message: "Router is working tests" } is the JSON object being sent as the response. 
    // It contains a key-value pair where the key is "message" and the value is "Router is working tests".
    res.json({message:"Router is working tests"});
});

export default router;