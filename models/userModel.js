const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required:[ true, 'userName is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        sparse: true 
      
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    phone: {
        type: String,
        required: [true, 'phoneNumber is required'],
    },
    address: {
        type: Array,
    },
    userType: {
        type: String,
        required: [true, 'userType is required'],
        default: 'client',
        enum: ['admin', 'client','vendor','driver'],
    },
    profile: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png',
    }
   
}, {timestamps: true});                 

const User = mongoose.model("User", userSchema);

module.exports = User;