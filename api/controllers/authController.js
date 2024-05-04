import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import  jwt  from "jsonwebtoken";

export const signup = async (req, res, next) =>{
    const {username, email, password} = req.body;

    //if request is from api tool like insomnia
    if(!username || 
       !email || 
       !password || 
       username === "" || 
       email==="" || 
       password==="" ){
        // return res.status(400).json({message:"All fields are require"});
        next(errorHandler(400, "All fields are required"));
    }

    // (password,10); password with salt 10
    const hashedPassword = bcryptjs.hashSync(password,10);

    const newUser = new User({
        // username:"username" As value and key is same so dont need write 2 times
        username,
        email,
        password:hashedPassword,
    });

    try{
        await newUser.save();
        res.json("Signup successful");
    }catch(error){
        // res.status(500).json({message: error.message});
        next(error);
    }
};

export const signin = async(req,res,next)=>{
    const {email, password} = req.body;

    if(!email || !password || email === "" || password ===  ""){
        next (errorHandler(400,"All fields are required"));
    }
    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, "User not found"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400,"Invalid Password"));
        }    
        const token = jwt.sign(
            {id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRET
        ); 

        //Sepreates the password from the rest of information we can see the result without password on insomnia
        const {password: pass, ...rest} = validUser._doc; 

        res.status(200).cookie('access_token', token, {
            httpOnly : true,
        }).json(rest);
    }catch(error){
        next(error);
    }
};

export const google = async (req,res,next) =>{
    const {name, email, googlePhotoUrl} = req.body;
    try{
        const user = await User.findOne({email}); 
        if(user){
            console.log("User is present in database");
            const token = jwt.sign({id: user._id, isAdmin:user.isAdmin},process.env.JWT_SECRET);
            const {password, ...rest} = user._doc; //Hiding password
            res.status(200).cookie('access_token', token,{
                httpOnly:true,
            }).json(rest);
        } else{
            console.log("User is not present in database");
            const generatedPassword = 
            Math.random().toString(36).slice(-8) + 
            Math.random().toString(36).slice(-8); //0.2345asdfghjkm

            const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + 
                Math.random().toString(9).slice(-4), //Zeba Katarki = zebakatarki987654
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin}, process.env.JWT_SECRET);
            const {password, ...rest} = newUser._doc;
            res.status(200).cookie('access_token', token,{
                httpOnly:true,
            }).json(rest);
        }
    }catch(error){
        next(error);
    }
}; 
