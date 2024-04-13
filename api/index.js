import express from 'express';
import mongoose from 'mongoose';

//To access .env file in backend alos
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';

import postRoutes from './routes/postRoute.js';

import cookieParser from 'cookie-parser';

mongoose.connect
    (process.env.MONGO).then(()=>{
        console.log("MongoDb is connected");
    }
).catch(err => {
    console.log(err);
});

const app= express();

// we cannot able to send the json info directly from any api tool like Insomnia so it Allows json as the input of the backend
app.use(express.json());

app.use(cookieParser());

// app.use((req,res,next)=>{
//     console.log("random");
//     next();
// });

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);

//Backend like duplicate required errors etc
app.use((err, req, res, next)=>{
    console.log("Backend (mongoo) Error handling middleware is triggered which is for both Api tools and from routes of ui side");
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});

app.listen(3000,()=>{
    console.log("Server is running on 3000!");
});
