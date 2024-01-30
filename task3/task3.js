const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const product_file = './product.json';
const user_data = './user.json';
const order_data = './order.json';

const readDatafile = (filename) => {
    try {
        const data = fs.readFileSync(filename);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeData = (filename, data) => {
    fs.writeFileSync(filename, JSON.stringify(data));
};

// CRUD APIs for product
// create a product
app.post("/products", (req, res) => {
    const { id, name, price, description, quantity, product_type } = req.body;
    const products = readDatafile(product_file);
    const newProduct = { id, name, price, description, quantity, product_type };
    products.push(newProduct);
    writeData(product_file, products);
    res.status(201).json(newProduct);
});

// Read all products
app.get("/products", (req, res) => {
    const products = readDatafile(product_file);
    res.json(products);
});

// read product using id
app.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const products = readDatafile(product_file);
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});

// update product quantity using id
app.patch("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const { quantity } = req.body;
    const products = readDatafile(product_file);
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }
    products[productIndex].quantity = quantity;
    writeData(product_file, products);
    res.json(products[productIndex]);
});

// delete product using id
app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    let products = readDatafile(product_file);
    const updatedProducts = products.filter(p => p.id !== productId);
    if (updatedProducts.length === products.length) {
        return res.status(404).json({ message: "Product not found" });
    }
    writeData(product_file, updatedProducts);
    res.json({ message: "Product deleted successfully" });
});

// Create an API to search among the products. Search by either name or description. Sort by price,
// filter by product_type
app.get("/search", (req, res) => {
    const { query, sort, filter } = req.query;
    let products = readDatafile(product_file);

    if (query) {
        const lowerCaseQuery = query.toLowerCase();
        products = products.filter(p => p.name.toLowerCase().includes(lowerCaseQuery) || p.description.toLowerCase().includes(lowerCaseQuery));
    }

    if (sort === 'price') {
        products.sort((a, b) => a.price - b.price);
    }

    if (filter) {
        const lowerCaseFilter = filter.toLowerCase();
        products = products.filter(p => p.product_type.toLowerCase() === lowerCaseFilter);
    }

    res.json(products);
});

// List out of stock products (quantity less than 5)
app.get("/out-of-stock", (req, res) => {
    const products = readDatafile(product_file);
    const outOfStockProducts = products.filter(p => p.quantity < 5);
    res.json(outOfStockProducts);
});

// TASK-4

// CRUD APIs for user
// create a user
app.post("/users", (req, res) => {
    const { userID, name, address, contact } = req.body;
    const users = readDatafile(user_data);
    const newUser = { userID, name, address, contact, cart: [] }; // Initialize cart as an empty array
    users.push(newUser);
    writeData(user_data, users);
    res.status(201).json(newUser);
});

// Read all users
app.get("/users", (req, res) => {
    const users = readDatafile(user_data);
    res.json(users);
});

// read user using id
app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const users = readDatafile(user_data);
    const user = users.find(u => u.userID === userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// update user address using id
app.patch("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const { address } = req.body;
    let users = readDatafile(user_data);
    const userIndex = users.findIndex(u => u.userID === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    users[userIndex].address = address;
    writeData(user_data, users);
    res.json(users[userIndex]);
});

// delete user using id
app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    let users = readDatafile(user_data);
    const updatedUsers = users.filter(u => u.userID !== userId);
    if (updatedUsers.length === users.length) {
        return res.status(404).json({ message: "User not found" });
    }
    writeData(user_data, updatedUsers);
    res.json({ message: "User deleted successfully" });
});

// API  to add products to cart and order must be generated only upon checkout.
app.post("/cart/add", (req, res) => {
    const { userID, productID, quantity } = req.body;
    const users = readDatafile(user_data);
    const products = readDatafile(product_file);

    // check if user exists
    const userIndex = users.findIndex(user => user.userID === userID);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    // check if product exists
    const productIndex = products.findIndex(product => product.productID === productID);
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    // check if the product quantity is sufficient
    if (products[productIndex].quantity < quantity) {
        return res.status(400).json({ message: "Insufficient product quantity" });
    }

    // add product to user's cart
    const cartItem = { productID, quantity };
    users[userIndex].cart.push(cartItem);

    // update product quantity
    products[productIndex].quantity -= quantity;

    // write updated data to files
    writeData(user_data, users);
    writeData(product_file, products);

    res.status(201).json({ message: "Product added to cart" });
});

// API to generate order upon checkout
app.post("/checkout", (req, res) => {
    const { userID } = req.body;
    const users = readDatafile(user_data);
    const products = readDatafile(product_file);

    // check if the user exists
    const userIndex = users.findIndex(user => user.userID === userID);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    // check if the user has items in the cart
    if (!users[userIndex].cart || users[userIndex].cart.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    // calculate total order price
    let totalPrice = 0;
    users[userIndex].cart.forEach(cartItem => {
        const product = products.find(product => product.productID === cartItem.productID);
        totalPrice += product.price * cartItem.quantity;
    });

    // Check if the total order price meets the minimum threshold
    const minimumThreshold = 50; // Example minimum threshold
    if (totalPrice < minimumThreshold) {
        return res.status(400).json({ message: `Total order price must be at least $${minimumThreshold}` });
    }

    // Generate order
    const order = {
        userID,
        items: users[userIndex].cart,
        totalPrice,
        orderDate: new Date().toISOString()
    };

    // Clear user's cart
    users[userIndex].cart = [];

    // Write updated data to files
    writeData(user_data, users);
    writeData(order_data, [order]); // Overwrite existing orders with a new one

    res.status(201).json({ message: "Order generated successfully" });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;
