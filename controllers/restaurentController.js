const restaurentModel = require("../models/restaurentModel");
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')


//create restaurent controller
const createRestaurentController = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
            address
        } = req.body;

        if (!title || !coords) {
            return res.status(400).json({
                success: false,
                message: 'title and coords are required',
            });
        }
        const newRestaurent = new restaurentModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
            address
        })
        await newRestaurent.save();

        res.status(201).json({
            success: true,
            message: 'new restaurent created successfully',
            newRestaurent,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error while creating restaurent api',
            error,
        });
    }
}


//get all restaurents controller
const getAllRestaurentsController = async (req, res) => {
    try {
        const restaurents = await restaurentModel.find();
        if (!restaurents) {
            return res.status(404).json({
                success: false,
                message: 'no restaurents found',
            });
        }
        res.status(200).json({
            success: true,
            totalCount: restaurents.length,
            message: 'all restaurents fetched successfully',
            restaurents,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error while fetching all restaurents',
            error,
        });
    }
}


//get single restaurent controller
const getSingleRestaurentController = async (req, res) => {
    try {
        const { restaurentId } = req.params;
        const restaurent = await restaurentModel.findById(restaurentId);
        if (!restaurent) {
            return res.status(404).json({
                success: false,
                message: 'restaurent not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'restaurent fetched successfully',
            restaurent,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error while fetching single restaurent',
            error,
        });
    }
}

// delete restaurent controler

const deleteRestaurentController = async (req, res) => {
    try {
        const { id: restaurentId } = req.params;


        const restaurent = await restaurentModel.findByIdAndDelete(restaurentId);

        if (!restaurent) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Restaurant deleted successfully',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while deleting restaurant',
            error: error.message, // Fournir un message d'erreur plus clair
        });
    }
};



module.exports = {
    createRestaurentController,
    getAllRestaurentsController,
    getSingleRestaurentController,
    deleteRestaurentController,

};
