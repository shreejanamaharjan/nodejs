const express = require('express');
const cors = require('cors');
const connectDb = require('./db/database');
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const cart = require('./routes/cartRoute');
const order = require('./routes/orderRoute');
const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());
require('dotenv').config();


const PORT = process.env.PORT || 3000;


app.use('/products', product);
app.use('/users', user);
app.use('/carts', cart);
app.use('/orders', order);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
    connectDb();
});