const restaurentModel = require("../models/restaurentModels");
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

        if(!title ||  !coords){
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



module.exports = {
    createRestaurentController,
};
