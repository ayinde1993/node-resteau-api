const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'food title is required']
    },
    description: {
        type: String,
        required: [true, 'food description is required']
    },
    price: {
        type: Number,
        required: [true, 'food price is required']
    },
    image: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png',
       
    },

    foodTags: {
        type: String,
       
    },
    category: {
        type: String,
        
    },
    code: {
        type: String,
       
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'restaurant is required']
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: String,
    },
   
   
}, 
{timestamps: true})  

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;