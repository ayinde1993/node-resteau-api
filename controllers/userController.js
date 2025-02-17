const userModel = require("../models/userModel");

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

module.exports = { 
    getUserController,
    updateUserController
};     