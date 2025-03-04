const express = require("express");
const router = express.Router();
const { 
    createCategoryController,
    getAllCategoriesController,
    updateCategoryController,
    deleteCategoryController,
    } = require("../controllers/categoryController"); 
const { authMiddleware } = require("../middlewares/authMiddleware");

//create category
router.post('/create', authMiddleware, createCategoryController);

//get all categories
router.get('/getall', authMiddleware, getAllCategoriesController);

//update category
router.put('/update/:id', authMiddleware, updateCategoryController);

//delete category
router.delete('/delete/:id', authMiddleware, deleteCategoryController);









module.exports = router;
 