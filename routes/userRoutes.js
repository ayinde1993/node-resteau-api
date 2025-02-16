const express = require("express");
const router = express.Router();
const { getUserController } = require("../controllers/userController"); 
const { authMiddleware } = require("../middlewares/authMiddleware");



router.get('/getuser', authMiddleware, getUserController); // get user data


module.exports = router;
