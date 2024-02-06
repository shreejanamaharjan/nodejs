const mongoose = require('mongoose');

// Cart Schema
const cartSchema = new mongoose.Schema({
    username: String,
    productID: String,
    quantity: Number
});

module.exports = mongoose.model('cart', cartSchema);