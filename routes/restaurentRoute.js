const express = require("express");
const router = express.Router();
const { 
    createRestaurentController,
    getAllRestaurentsController,
    getSingleRestaurentController,
    } = require("../controllers/restaurentController"); 
const { authMiddleware } = require("../middlewares/authMiddleware");

//create restaurent
router.post('/createrestaurent', authMiddleware, createRestaurentController);

// get all restaurents
router.get('/getall', authMiddleware, getAllRestaurentsController);

//get single restaurent
router.get('/get/:restaurentId', authMiddleware, getSingleRestaurentController);






module.exports = router;
 