import express from 'express';
import mongoose from 'mongoose';

//To access .env file in backend alos
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect
    (process.env.MONGO).then(()=>{
        console.log("MongoDb is connected");
    }
).catch(err => {
    console.log(err);
});

const app= express();

app.listen(3000,()=>{
    console.log("Server is running on 3000!");
});