const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    quantity: Number,
    product_type: String,
});

module.exports = mongoose.model('Product', productSchema);