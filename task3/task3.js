const express = require('express');
const bodyParser = require('body-parser'); 
const fs = require('fs');
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

const product_file = './product.json';

const readDatafile = () =>{
    try{
        const productdata = fs.readFileSync(product_file);
        return JSON.parse(productdata);
    }catch(error){
        return [];
    }
};

const writeData = (products) => {
    fs.writeFileSync(product_file, JSON.stringify(products));
};

// CRUD APIs for product
// create a product
app.post("/create", function(req, res){
    const{id, name, price, description, quantity, product_type} = req.body;
    const products = readDatafile();
    console.log(req.body)
    const newProduct = {id, name, price, description, quantity, product_type};
    products.push(newProduct);
    writeData(products);
    res.json(newProduct);
});

// Read all products
app.get("/create", (req, res) => {
    const products = readDatafile();
    res.json(products);
});

// read product using id
app.get("/create/:id", function(req, res){
    const products = readDatafile();
    const product = products.find(p => p.id === parseInt(req.params.id));
    if(!product){
        return res.status(404).json({message: 'product not found'});
    }
    res.json(product);
});

// update product quantity using id
app.patch("/create/:id", function(req, res){
    const products = readDatafile();
    const productID = parseInt(req.params.id);
    const {quantity} = req.body;
    const productIndex = products.findIndex(p => p.id === productID);
    if(productIndex === -1){
        return res.status(404).json({mesage: "product not found"});
    }
    products[productIndex].quantity = quantity;
    writeData(products);
    res.json(products[productIndex])
});

// delete product using id
app.delete("/create/:id", function(req, res){
    const products = readDatafile();
    const productID = parseInt(req.params.id);
    const updatedProduct = products.filter(p => p.id !== productID);
    if(updatedProduct.length === products.length){
        return res.status(404).json({message: "product not found"});
    }
    writeData(updatedProduct);
    res.json({message: "product deleted sucessfully"});
});

// Create an API to search among the products. Search by either name or description. Sort by price,
// filter by product_type
app.get("/create/search", function(req, res){
    const {query, sort, filter} = req.query;
    let products = readDatafile();

    if(query){
        products = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));
    }

    if(sort === 'price'){
        products.sort((a,b) => a.price - b.price);
    }

    if(filter){
        products = products.filter(p => p.product_type.toLowerCase() === filter.toLowerCase());
    }

    res.json(products);
});

// List out of stock products (quantity less than 5)
app.get("/create/out-of-stock", function(req, res)  {
    const products = readDatafile();
    const outOfStockProducts = products.filter(p => p.quantity < 5);
    res.json(outOfStockProducts);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
