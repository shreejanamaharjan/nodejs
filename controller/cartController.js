const fs = require("fs").promises;
const asyncHandler = require("express-async-handler");
const path = require("path");
require("dotenv").config();
const cart = require("../models/cartModel");
const users = require("../models/userModel");
const products = require("../models/productModel");

const storeTo = process.env.STORE_TO;
const cart_file = path.join(__dirname, "../data/cart.json");
const user_file = path.join(__dirname, "../data/user.json");
const product_file = path.join(__dirname, "../data/product.json");

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

// API  to add products
const addCart = asyncHandler(async (req, res) => {
  const { username, productID, quantity } = req.body;
  try {
    if (storeTo === "FS") {
      const users = await readDatafile(user_file);
      const products = await readDatafile(product_file);

      
     // check if user exists
     const userIndex = users.findIndex(user => user.username === username);
     if (userIndex === -1) {
         return res.status(404).json({ message: "User not found" });
     }

      // check if product exists
    const productIndex = products.findIndex(product => product.id=== productID);
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    // check if the product quantity is sufficient
    if (products[productIndex].quantity < quantity) {
      return res.status(400).json({ message: "Insufficient product quantity" });
  }
  // Update product quantity
  products[productIndex].quantity -= quantity;
  await writeData(product_file, products);

   // Add product to cart
   const cartItems = await readDatafile(cart_file);
   const newItem = {
     username,
     productID,
     quantity,
   };
   cartItems.push(newItem);
   await writeData(cart_file, cartItems);

   res.status(201).json(newItem);
    } else if (storeTo === "DB") {
      // check if user exists
      const user = await users.findOne({username});
      if(!user){
        return res.status(404).json({ message: "User not found" });
      }

       // Check if product exists
    const product = await products.findById({ _id: productID });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product quantity is sufficient
    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient product quantity" });
    }

     // Update product quantity
     product.quantity -= quantity;
     await product.save();

     // Add product to cart
    const cartItem = new cart({
      username,
      productID,
      quantity,
    });
    await cartItem.save();

    res.status(201).json(cartItem);
    } else {
      return res.status(500).json({ message: "Invalid Storage Configuration" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = {addCart };