const userModel = require("../models/userModel");

const registerUserController = async (req, res) => {
    try {
        const { userName, email, password, phone, address } = req.body;
        // check if all fields are provided
        if(!userName || !email || !password  || !address || !phone) {    
            return res.status(500).json({
                success: false,
                message: 'all fields are required',
            })
        }
        // check if user already exists
        const existingUser = await userModel.findOne({ email });
        if(existingUser) {
            return res.status(500).json({
                success: false,
                message: 'user already exists',
            })
        }
        const user = await userModel.create(req.body);
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
                message: 'please provide all fields',
            });
        }
        // check if user exists
        const user = await userModel.findOne({ email, password});
        if(!user) {
            return res.status(500).json({
                success: false,
                message: 'invalid email or password',
            });
        }
        res.status(200).json({
            success: true,
            message: 'login successful',
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
