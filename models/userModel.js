const mongoose = require('mongoose');

// user Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model('user', userSchema);