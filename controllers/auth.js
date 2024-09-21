import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Users from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();
//register controller
/**
 * Registers a new user.
 * @function
 * @async
 * @param {Object} req - The request object containing the user data. 
 * @param {Object} res - The resonse object to send feedback to the user.
 * @returns {Promise<void>} - A promise that resolves when the user is registered.
 * @throws {Error} - Throws an Error if the registration fails.
 * @see UserModel for details on the User schema.
 * 
 */
export const register = async (req, res) =>{
    console.log("Registering in process...");
    try{
        const { email, firstName, lastName, username, password} = req.body;
        const usernameExists = await Users.findOne({username: username});
        const emailExists = await Users.findOne({email: email});
        if (usernameExists || emailExists){
            return res.status(404).json({success: false, message: "User already exists"});
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new Users({
            email: email,
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: hashedPassword
        })
        await newUser.save();
        res.status(200).json({success: true, message: "User registered successfully"});

    } catch(error){
        console.log("Error happened while registering!");
        res.status(500).json({success: false, message: "Something went wrong while registering user " + error});
    }
    
    
}


//login controller
/**
 * logs the user into the application.
 * 
 * @function 
 * @async 
 * @param {Object} req - Incoming request with user login information. 
 * @param {Object} res - Response that gives jwt token to the user.
 * @returns {Promise<void>} - A promise that is resolved when the user successfully logs in.
 * @throws {Error} - Throws an error if login fails.
 * @description 
 * - Returns status 404 if user is not found in the database, 401 if the user enters invalid credentials.
 * - Utlizes bcyrpt to check if the password sent is the same as the encrypted password stored in the database.
 * - Utilizes JWT that contains the user ID and expires in 5hrs.
 * - If authentication is successful, a JWT token is generated and send in the response.
 */
export const login = async (req, res) =>{
    console.log("Logging in ...");
    try{
        const { username, password } = req.body;
        const secret = process.env.JWT_SECRET;
        const user = await Users.findOne({username: username});
        if(!user){
            return res.status(404).json({success: false, message: "user does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(401).json({success: false, message: "Invalid credentials"});
        }
        const token = jwt.sign({userId: user._id}, secret, {expiresIn: '5h'});
        return res.status(200).json({success: true, token, message: "Successfully logged in user"});
    
    } catch(error){
        console.log("Error happened while logging in!");
        res.status(500).json({success: false, message: "Something went wrong while logging in user " + error});
    }

}

export const sendVerification = async( req, res) => {
    try{
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Could not send verification code"});
    }
}