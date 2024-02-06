const fs = require("fs").promises;
const asyncHandler = require("express-async-handler");
const path = require("path");
require("dotenv").config();
const carts = require("../models/cartModel");
const users = require("../models/userModel");
const products = require("../models/productModel");
const orders = require("../models/orderModel");

const storeTo = process.env.STORE_TO;
const cart_file = path.join(__dirname, "../data/cart.json");
const user_file = path.join(__dirname, "../data/user.json");
const product_file = path.join(__dirname, "../data/product.json");
const order_file = path.join(__dirname, "../data/order.json");

// Generate random id for the orders
const generateRandomId = () => Math.floor(Math.random() * 1000000);

const readDatafile = async (filename) => {
    try {
        const data = await fs.readFile(filename, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeData = async (filename, data) => {
    await fs.writeFile(filename, JSON.stringify(data), "utf-8");
};

// Calculate total price of items in the cart
const calculateTotalPrice = (cart, products) => {
    let totalPrice = 0;
    for (const item of cart) {
        const product = products.find((p) => p.id === item.productID);
        if (product) {
            totalPrice += product.price * item.quantity;
        }
    }
    return totalPrice;
};

// Update cart data
const updateCart = async (cart) => {
    try {
        await writeData(cart_file, cart);
    } catch (error) {
        console.error("Error updating cart:", error);
    }
};

// API to generate order upon checkout
const checkout = asyncHandler(async (req, res) => {
    try {
        const { username } = req.body;
        if (storeTo === "FS") {
            const orderId = generateRandomId();
            // Read data from cart.json and product.json
            const cart = await readDatafile(cart_file);
            const products = await readDatafile(product_file);


            // Filter cart items for the given username
            const userCart = cart.filter((item) => item.username === username);


            // Calculate total price
            const totalPrice = calculateTotalPrice(userCart, products);

            // Generate order
            const order = {
                id: orderId,
                date: new Date().toISOString(),
                username,
                items: userCart,
                totalPrice,
            };

            // Write order to order.json
            const orderHistory = await readDatafile(order_file);
            orderHistory.push(order);
            await writeData(order_file, orderHistory);

            // Clear user's cart
            const updatedCart = cart.filter((item) => item.username !== username);
            await updateCart(updatedCart);

            console.log("Order processed successfully.");
            res.status(201).json({ message: "Order generated successfully" });
        }

        else if (storeTo === "DB") {

            // check if user exists
            const userCart = await carts.findOne({ username });
            if (!userCart) {
                return res.status(404).json({ message: "User not found" });
            }

            // Calculate total price
            let totalPrice = 0;
            for (const item of userCart) {
                const product = products.find((p) => p.id === item.productID);
                if (product) {
                    totalPrice += product.price * item.quantity;
                }


                // Check if total price meets minimum threshold
                const minimumThreshold = 50;
                if (totalPrice < minimumThreshold) {
                    return res.status(400).json({ message: `Total order price must be at least $${minimumThreshold}` });
                }

                // Create order
                const order = new orders({
                    username,
                    items: userCart,
                    totalPrice,
                    orderDate: new Date(),
                });
                // Save order to the database
                await order.save();

                // Clear user's cart
                userCart.items = [];
                await userCart.save();

                res.status(201).json({ message: "Order generated successfully", order });
            }
        } else {
            return res.status(500).json({ message: "Invalid Storage Configuration" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { checkout };
