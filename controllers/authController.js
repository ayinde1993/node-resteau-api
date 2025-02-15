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






// const getUsersController = () => {};    
// const getUserByIdController = () => {};                         
// const updateUserController = () => {};
// const deleteUserController = () => {};


module.exports = {
    registerUserController
    // getUsersController,
    // getUserByIdController,
    // updateUserController,
   // deleteUserController
};
