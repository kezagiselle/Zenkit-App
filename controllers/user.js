import userModel from '../models/user.js';
import asyncWrapper from "../middleware/async.js";
import bcrypt from 'bcrypt';
import BadRequestError from "../Errors.js/BadRequestError.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
import otpGenerator from "../utils/otp.js";
import sendEmail from '../utils/sendEmail.js';
import  UnauthorizedError  from '../Errors.js/UnauthorizedError.js';

const secret = process.env.SECRET_KEY
const signUp = asyncWrapper(async (req, res, next) => {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    };
    //checking if  the user is already in using the email
    const foundUser = await userModel.findOne({ email: req.body.email });
    if (foundUser) {
        return next(new BadRequestError("Email already in use"));
    };
    //hashing the password
    const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
    //Generate the otp
    const otp = otpGenerator();
    const otpExpirationDate = new Date().getTime()+(60*1000*5)
    //Recording the user to the database
    const newUser = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        otp: otp,
        otpExpires: otpExpirationDate,
    });

    const savedUser = await newUser.save();
    sendEmail(req.body.email, "Verify your account", `Your otp is ${otp}`);
    if (savedUser) {
        return res.status(201).json({
            message: "user account created!",
            user: savedUser
        });
    }
});
const validateOtp = asyncWrapper(async(req,res,next) =>{
    //validate
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new BadRequestError(errors.array()[0].msg));
    }
    //checking if the given otp is stored in the database
    const foundUser = await userModel.findOne({otp: req.body.otp});
    if(!foundUser){
        next(new UnauthorizedError('Authorization is denied'));
    }
    //checking if the otp is expired or not.
    if(foundUser.otpExpires < new Date().getTime()){
        next(new UnauthorizedError('otp expired'));
    }

    //updating a user to be verified
    foundUser.verified = true;
    const savedUser = await foundUser.save();
    if(savedUser){
        return res.status(201).json({
            message: "user account verified",
            user: savedUser
        });
    }
});
const SignIn = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!(email && password)) {
        return res.status(401).json({ message: "Email and password are required" });
    }

    // Check if user is in the database
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "User not found. Please register" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({
        user_id: user.id,
        email: user.email
    }, secret, { expiresIn: "5h" });

    const options = {
        expiresIn: "3h",
        httpOnly: true
    };

    res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user
    });
});

const userControllers = {
    signUp,
    SignIn,
    validateOtp
};
export default userControllers;