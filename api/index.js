import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import dotenv from 'dotenv';
import postRoutes from './routes/postRoute.js';
import commentRoutes from './routes/commentRoute.js'
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose.connect
    (process.env.MONGO).then(()=>{
        console.log("MongoDb is connected");
    }
).catch(err => {
    console.log(err);
});

const __dirname = path.resolve();

const app= express();

// we cannot able to send the json info directly from any api tool like Insomnia so it Allows json as the input of the backend
app.use(express.json());

app.use(cookieParser());

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client', 'dist', 'index.html'));
});

//Backend like duplicate required errors etc
app.use((err, req, res, next)=>{
    console.log(err.message);
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
