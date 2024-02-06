const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
    username: String,
    productID: String,
    productName: String,
    quantity: Number,
    totalPrice: Number,
    orderTime: Date
});

module.exports = mongoose.model('order', orderSchema);