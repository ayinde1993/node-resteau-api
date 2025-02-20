const express = require("express");
const router = express.Router();
const { 
    getUserController,
     updateUserController,
     resetPasswordController, 
     updatePasswordController,
     deleProfileController,
    } = require("../controllers/userController"); 
const { authMiddleware } = require("../middlewares/authMiddleware");



router.get('/getuser', authMiddleware, getUserController); // get user data

// update user data
router.put('/updateuser', authMiddleware, updateUserController);    // update user data 

//Reset password 
router.post('/resetpassword', authMiddleware, resetPasswordController);

// password update
router.put('/updatepassword', authMiddleware, updatePasswordController);


//delete user
router.delete('/deleteuser/:id', authMiddleware, deleProfileController);

//logout user




module.exports = router;
 