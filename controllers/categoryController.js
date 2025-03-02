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

const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) {
            return res.status(404).json({
                success: false,
                message: "No categories found"
            });
        }
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while getting all categories",
            error
        });
    }
}

const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl } = req.body;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const category = await Category.findByIdAndUpdate(id, { title, imageUrl }, { new: true });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error  in update category api",
            error
        });
    }
}

const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error while deleting category",
            error
        });
    }
}

module.exports = { 
    createCategoryController,
    getAllCategoriesController,
    updateCategoryController,
    deleteCategoryController
};     