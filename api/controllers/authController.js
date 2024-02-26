import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req,res) =>{
    console.log(req.body);
    const {username, email, password} = req.body;

    if(!username || !email || !password || username === "" || email==="" || password==="" ){
        return res.status(400).json({message:"All fields are require"});
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
        res.json("Signup sucessful");
    }catch(error){
        res.status(500).json({message: error.message});
    }

};