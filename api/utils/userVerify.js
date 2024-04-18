import jwt from 'jsonwebtoken';
// import { errorHandler } from 'utils/error.js';
import { errorHandler } from './error.js';
export const verifytToken = (req,res,next) => {
    const token = req.cookies.access_token; //req.cookies 
    if(!token){
        return next(errorHandler(401,'Unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err){
            return next(errorHandler(401,'Unauthorized'));
        }
        req.user = user;
        next(); //updateUser function
    });
};