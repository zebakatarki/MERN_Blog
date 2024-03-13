import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import  jwt  from "jsonwebtoken";
// import pkg from "jsonwebtoken";
// const {jwt} = pkg;

export const signup = async (req, res, next) =>{
    console.log(req.body);
    const {username, email, password} = req.body;

    //if request is from api tool like insomnia
    if(!username || !email || !password || username === "" || email==="" || password==="" ){
        // return res.status(400).json({message:"All fields are require"});
        next(errorHandler(400, "Api tool All fields are required"));
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
        // res.status(500).json({message: error.message});
        next(error);
    }
};

export const signin = async(req,res,next)=>{
    const {email, password} = req.body;

    if(!email || !password || email === "" || password ===  ""){
        next (errorHandler(400,"Api tool All fields are required"));
    }
    try{
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, "Invalid Email"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400,"Invalid Password"));
        }    
        const token = jwt.sign(
            {id: validUser._id}, process.env.JWT_SECRET
        ); 

        //Sepreates the password from the rest of information we can see the result without password on iosomnia
        const {password: pass, ...rest} = validUser._doc; 

        res.status(200).cookie('access_token', token, {
            httpOnly : "true"}).json(rest);
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
            const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
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
            const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET);
            const {password, ...rest} = newUser._doc;
            res.status(200).cookie('access_token', token,{
                httpOnly:true,
            }).json(rest);
        }
    }catch(error){
        next(error);
    }
}; 














































































// JWT Token Generation:
// The jwt.sign() function generates a JWT token. It takes a payload (in this case, an object containing the user's ID)
// and signs it using the provided secret key (process.env.JWT_SECRET). This step ensures that the token is 
// cryptographically secure and can be verified by the server later.

// Setting HTTP Response Status:
// The res.status(200) function sets the HTTP response status code to 200, indicating that the request has been 
// successfully processed.

// Setting Access Token Cookie:
// The .cookie() function sets a cookie named 'access_token' in the HTTP response. The cookie contains the JWT token 
// generated in the first step. Additionally, the { httpOnly: "true" } option ensures that the cookie is marked as 
//HTTP 
// only, meaning it cannot be accessed by client-side JavaScript. This enhances security by protecting the token from 
// certain types of attacks like Cross-Site Scripting (XSS).

// Sending JSON Response:
// The .json() function sends a JSON response back to the client. It includes the validUser object, which likely 
// represents the user data retrieved from the database during the authentication process. By sending this user data 
// along with the token, the client-side application can have immediate access to information about the authenticated 
// user, enabling personalized user experiences.

// Completing the Response:
// Once all response setup is completed, the server sends the HTTP response back to the client, containing the status 
// code, cookie, and JSON payload.
// Internally, the server-side framework (such as Express.js in Node.js) handles the processing of these response setup 
// functions and ensures that the appropriate headers and content are included in the HTTP response. The framework 
// abstracts away many of the lower-level details, allowing developers to focus on writing clean and maintainable code 
// for handling authentication and generating responses.