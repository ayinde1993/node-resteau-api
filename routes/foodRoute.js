const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { createFoodController, getAllFoodsController, getSingleFoodController ,getFoodByRestaurantIdController,updateFoodController,deleteFoodController} = require("../controllers/foodController");




router.post('/create', authMiddleware, createFoodController);

//get all food items
router.get('/getallfoods',authMiddleware, getAllFoodsController);

//get single food item
router.get('/getsinglefood/:id',authMiddleware, getSingleFoodController);

//get food by restaurant id
router.get('/getfoodbyrestaurantid/:id',authMiddleware, getFoodByRestaurantIdController);  

//update food item
router.put('/updatefood/:id',authMiddleware, updateFoodController);

//delete food item
router.delete('/deletefood/:id',authMiddleware, deleteFoodController);



module.exports = router;
