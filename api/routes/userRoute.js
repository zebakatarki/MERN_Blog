import express from 'express';
import { test, updateUser, deleteUser } from '../controllers/userController.js';
import { errorHandler } from '../utils/error.js';
import { verifytToken } from '../utils/userVerify.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId',verifytToken, updateUser);
router.delete('/delete/:userId',verifytToken,deleteUser);

router.get('/tests',(req,res,next)=>{
    // { message: "Router is working tests" } is the JSON object being sent as the response. 
    // It contains a key-value pair where the key is "message" and the value is "Router is working tests".
    console.log("Response Status",res);
    next(errorHandler(400,"trying"));
    // res.json({message:"Router is working tests"});
});

export default router;