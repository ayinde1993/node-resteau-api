const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    food: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
    payment:{type:String},
    // quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, 
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending' },
    
}
,{timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;