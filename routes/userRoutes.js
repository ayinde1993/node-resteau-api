const express = require("express");
const router = express.Router();
const { getUserController, updateUserController } = require("../controllers/userController"); 
const { authMiddleware } = require("../middlewares/authMiddleware");



router.get('/getuser', authMiddleware, getUserController); // get user data

// update user data
router.put('/updateuser', authMiddleware, updateUserController);    // update user data 


module.exports = router;
