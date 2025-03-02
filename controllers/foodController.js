const Food = require("../models/foodModel");
const Restaurent = require("../models/restaurentModel");

const createFoodController = async (req, res) => {
    try {
        const {
            title,
            description,
            foodTags,
            category,
            price,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount
        } = req.body;
        if (!title || !description || !price || !restaurant) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        //check if the restaurant is already in the database

        const restaurantExists = await Restaurent.findById(restaurant);
        if (!restaurantExists) {
            return res.status(400).json({
                success: false,
                message: "Restaurant not found please provide a valid restaurant id"
            })
        }
        const newFood = await Food.create({
            title,
            description,
            price,
            restaurant,
            foodTags,
            category,
            isAvailable,
            rating,
            ratingCount,
            code,
        })
        await newFood.save();
        res.status(201).json({
            success: true,
            message: "New Food created successfully",
            newFood
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

//get all food items
const getAllFoodsController = async (req, res) => {
    try {
        const foods = await Food.find();
        if (!foods) {
            return res.status(400).json({
                success: false,
                message: "No foods found"
            })
        }
        res.status(200).json({
            success: true,
            foods,
            numberOfFoods: foods.length
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error while getting all foods',
            error
        })
    }
}

//get single food item
const getSingleFoodController = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findById(id);
        if (!food) {
            return res.status(400).json({
                success: false,
                message: "Food not found "
            })
        }
        res.status(200).json({
            success: true,
            food
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error while getting single food',
            error
        })
    }
}

//get food by restaurant id
const getFoodByRestaurantIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const foods = await Food.find({ restaurant: id });
        if (foods.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No foods found for this restaurant"
            })
        }
        res.status(200).json({
            success: true,
            foods
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error while getting food by restaurant id',
            error
        })
    }
}

//update food item
const updateFoodController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Food id is required"
            })
        }
        const { title,
            description,
            price,
            restaurant,
            foodTags,
            category,
            isAvailable,
            rating,
            ratingCount,
            code
        } = req.body;
        if (!title || !description || !price || !restaurant) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        //check if the restaurant is already in the database
        const restaurantExists = await Restaurent.findById(restaurant);
        if (!restaurantExists) {
            return res.status(400).json({
                success: false,
                message: "Restaurant not found"
            })
        }
        const food = await Food.findByIdAndUpdate(id, { title, description, price, restaurant, foodTags, category, isAvailable, rating, ratingCount, code }, { new: true });
        if (!food) {
            return res.status(400).json({
                success: false,
                message: "Food not found"
            })
        }

    
        res.status(200).json({
            success: true,
            message: "Food updated successfully",
            food
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error while updating food',
            error
        })
    }
}

//delete food item
const deleteFoodController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Food id is required"
            })
        }
        const food = await Food.findByIdAndDelete(id);
        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Food deleted successfully",
            
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error while deleting food',
            error
        })
    }
}
module.exports = {
    createFoodController,
    getAllFoodsController,
    getSingleFoodController,
    getFoodByRestaurantIdController,
    updateFoodController,
    deleteFoodController
};
