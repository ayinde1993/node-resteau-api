const Category = require("../models/categoryModel");
const bcrypt = require("bcrypt");


const createCategoryController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const category =  new Category({ title, imageUrl });
        await category.save();
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while creating category  api",
            error
        });
    }
}

module.exports = { 
    createCategoryController,
};     