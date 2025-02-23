const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Category title is required"]
    },
    imageUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3oD-7ZQz34w7piqqtOc3WQWHn5wl_Vjso6g&s",
        required: [true, "Category image is required"]
    },
    
}, {timestamps: true})

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;