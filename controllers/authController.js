const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




const registerUserController = async (req, res) => {
    try {
        const { userName, email, password, phone, address,answer } = req.body;
        // check if all fields are provided
        if(!userName || !email || !password  || !address || !phone || !answer) {    
            return res.status(500).json({
                success: false,
                message: 'all fields are required',
            });
        }
        // check if user already exists
        const existingUser = await userModel.findOne({ email });
        if(existingUser) {
            return res.status(500).json({
                success: false,
                message: 'email already exists please login',
            });
        }
        // hash password
        var salt =  bcrypt.genSaltSync(10);
        const  hashedPassword = await bcrypt.hash(password, salt);
        // create user                                      
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            phone,
            address,
            answer,
        });
        res.status(201).json({
            success: true,
            message: 'user created successfully',
            user,
        });
    } catch (error) {
        res.status(500).json({
             message: 'error in register controller',
             error,
            });
    }
   
};




// login user controller
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if all fields are provided
        if(!email || !password) {
            return res.status(500).json({
                success: false,
                message: 'please provide Email OR Password',
            });
        }
        // check if user exists
        const user = await userModel.findOne({ email});
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found',
            });
        }
        // check user password AND compare then 
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(500).json({
                success: false,
                message: 'Invalid email or password',
            });
        }
        // create token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { 
            expiresIn: '7d' });
        // send token to client 
        user.password = undefined
        res.status(200).json({
            success: true,
            message: 'login successful',
            token,
            user,
           
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error in login controller',
            error
        });
    }
}   


// const getUsersController = () => {};    
// const getUserByIdController = () => {};                         
// const updateUserController = () => {};
// const deleteUserController = () => {};


module.exports = {
    registerUserController,
    loginUserController
    // getUsersController,
    // getUserByIdController,
    // updateUserController,
   // deleteUserController
};
