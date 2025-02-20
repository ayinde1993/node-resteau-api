const express = require("express");
const router = express.Router();
const { 
    createRestaurentController,
    } = require("../controllers/restaurentController"); 
const { authMiddleware } = require("../middlewares/authMiddleware");

//create restaurent
router.post('/createrestaurent', authMiddleware, createRestaurentController);






module.exports = router;
 