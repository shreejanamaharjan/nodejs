const fs = require("fs").promises;
const asyncHandler = require("express-async-handler");
const path = require("path");
require("dotenv").config();
const Product = require("../models/productModel");

const storeTo = process.env.STORE_TO;
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

// CRUD operation
// create a product
const addProduct = asyncHandler(async (req, res) => {
  const { id, name, price, description, quantity, product_type } = req.body;
  try {
    if (storeTo === "FS") {
      let products = await readDatafile(product_file);
      const newProduct = {
        id,
        name,
        price,
        description,
        quantity,
        product_type,
      };
      products.push(newProduct);
      await writeData(product_file, products);
      res.status(201).json(newProduct);
    } else if (storeTo === "DB") {
      const newProduct = new Product({
        name,
        price,
        description,
        quantity,
        product_type,
      });
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } else {
      return res.status(500).json({ message: "Invalid Storage Configuration" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all products
const getProduct = asyncHandler(async (req, res) => {
  try {
    if (storeTo === "FS") {
      const products = await readDatafile(product_file);
      res.json(products);
    } else if (storeTo === "DB") {
      try {
        const products = await Product.find();
        res.status(201).json(products);
      } catch (err) {
        res.status(400).json({ message: "products not found" });
      }
    } else {
      return res.status(500).json({ message: "Invalid Storage Configuration" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // read product using id
const getProductById = asyncHandler(async (req, res) => {
  try {
    if (storeTo === "FS") {
      const productId = parseInt(req.params.id);
      const products = await readDatafile(product_file);
      const product = products.find((p) => p.id === productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } else if (storeTo === "DB") {
      try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).send("Product not found");
        }
        res.send(product);
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      return res.status(500).json({ message: "Invalid Storage Configuration" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update product quantity using id
const updateProductById = asyncHandler(async (req, res) => {
  try {
    if (storeTo === "FS") {
      const productId = parseInt(req.params.id);
      const { quantity } = req.body;
      const products = await readDatafile(product_file);
      const productIndex = products.findIndex((p) => p.id === productId);
      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
      }
      products[productIndex].quantity = quantity;
      await writeData(product_file, products);
      res.json(products[productIndex]);
    } else if (storeTo === "DB") {
      try {
        const product = await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (!product) {
          return res.status(404).send("Product not found");
        }
        res.send(product);
      } catch (error) {
        res.status(400).send(error);
      }
    } else {
      return res.status(500).json({ message: "Invalid Storage Configuration" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // delete product using id
const deleteProductById = asyncHandler(async (req, res) => {
  try {
    if (storeTo === "FS") {
      const productId = parseInt(req.params.id);
      let products = await readDatafile(product_file);
      const updatedProducts = products.filter((p) => p.id !== productId);
      if (updatedProducts.length === products.length) {
        return res.status(404).json({ message: "Product not found" });
      }
      await writeData(product_file, updatedProducts);
      res.json({ message: "Product deleted successfully" });
    } else if (storeTo === "DB") {
      try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
          return res.status(404).send("Product not found");
        }
        res.send(product);
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      return res.status(500).json({ message: "Invalid Storage Configuration" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List out of stock products (quantity less than 5)
const outofstock = asyncHandler(async (req, res) => {
  try {
    if (storeTo === "FS") {
      const products = await readDatafile(product_file);
      const outOfStockProducts = products.filter((p) => p.quantity < 5);
      res.json(outOfStockProducts);
    } else if (storeTo === "DB") {
      try {
        const products = await Product.find({ quantity: { $lt: 5 } });
        res.send(products);
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      return res.status(500).json({ message: "Invalid Storage Configuration" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create an API to search among the products. Search by either name or description. Sort by price,
// filter by product_type
const searchProduct = asyncHandler(async (req, res) => {
  try {
    if (storeTo === "FS") {
      const { query, sort, filter } = req.query;
      let products = await readDatafile(product_file);

      if (query) {
        const lowerCaseQuery = query.toLowerCase();
        products = products.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerCaseQuery) ||
            p.description.toLowerCase().includes(lowerCaseQuery)
        );
      }

      if (sort === "price") {
        products.sort((a, b) => a.price - b.price);
      }

      if (filter) {
        const lowerCaseFilter = filter.toLowerCase();
        products = products.filter(
          (p) => p.product_type.toLowerCase() === lowerCaseFilter
        );
      }

      res.json(products);
    } else if (storeTo === "DB") {
      const { name, description, product_type, sort } = req.query;
      const query = {};

      if (name) {
        query.name = new RegExp(name, "i");
      }
      if (description) {
        query.description = new RegExp(description, "i");
      }
      if (product_type) {
        query.product_type = product_type;
      }

      const sortOptions = {};
      if (sort === "price") {
        sortOptions.price = 1; // ascending order
      }

      const products = await Product.find(query).sort(sortOptions);
      res.json(products);
    } else {
      return res.status(500).json({ message: "Invalid Storage Configuration" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  addProduct,
  getProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProduct,
  outofstock,
};
