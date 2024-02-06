const mongoose = require('mongoose');
DB_URI = "mongodb://127.0.0.1:27017/shop";



const connectDb = async () => {
    try {
        const connect = await mongoose.connect(DB_URI);
        console.log("Database connected Successfully");
    } catch (error) {
        console.log("Error", error);
    }
};

module.exports = connectDb;