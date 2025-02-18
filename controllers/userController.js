const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const getUserController =  async (req, res) => {
   try {
    const user = await userModel.findById({_id:req.body.userId});
    if(!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    //hide password from response
    user.password = undefined;
    res.status(200).json({
        success: true,
        message: 'User get successfully',
        user
    });
   } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error
    });
   }
};

const updateUserController = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate({_id:req.body.userId}, req.body, {new:true});
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        //hide password from response
        user.password = undefined;
        
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user
        }); 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error
        });
    }
};

const resetPasswordController = async (req, res) => {
    try {
        const {email, newPassword, answer, confirmPassword} = req.body   
        if (!email || !answer ||!newPassword || !confirmPassword ) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        //check user
        const user = await userModel.findOne({email, answer});
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid email or answer',
            });
        }
        //compare password
        if(newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and confirmPassword do not match',
            });
        }
        //hash password
        var salt =  bcrypt.genSaltSync(10);
        const  hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        //save user
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Password reset successfully',
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error
        });
    }
}

const updatePasswordController = async (req, res) => {
    try {
        const {oldPassword, newPassword, confirmPassword} = req.body;
        if(!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }  
        //check user
        const user = await userModel.findById({_id:req.body.userId});
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            }); 
        }
        //compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) {
            return res.status(500).json({
                success: false,
                message: 'Old password is incorrect',
            });
        }
        //compare password
        if(newPassword !== confirmPassword) {
            return res.status(500).json({
                success: false,
                message: 'Password and confirmPassword do not match',
            }); 
        }
        //hash password
        var salt =  bcrypt.genSaltSync(10);
        const  hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        //save user
        await user.save();  
        res.status(200).json({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (error) {   
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error
        });
    }
}


module.exports = { 
    getUserController,
    updateUserController,
    resetPasswordController,
    updatePasswordController
};     