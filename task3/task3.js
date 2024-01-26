const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const product_file = './product.json';

// create file
app.post("/create", function(req, res){
    const data = [
        {
            "id": 1,
            "name": "sweet almond oil",
            "price": 350,
            "description": "hair and skin oil",
            "quantity": 30,
            "product_type": "oil"
    
        },
        {
            "id": 2,
            "name": "lavender oil",
            "price": 350,
            "description": "hair and skin oil",
            "quantity": 25,
            "product_type": "oil"
    
        },
        {
            "id": 3,
            "name": "skin aqua",
            "price": 370,
            "description": "moisturing serum",
            "quantity": 75,
            "product_type": "serum"
    
        },
        {
            "id": 4,
            "name": "victoria secret",
            "price": 1500,
            "description": "perfume",
            "quantity": 250,
            "product_type": "perfume"
    
        },
        {
            "id": 5,
            "name": "diva",
            "price": 350,
            "description": "toner and hydrating mist",
            "quantity": 200,
            "product_type": "toner"
    
        }
    ];
    fs.writeFile("product.json", JSON.stringify(data), (error) => {
        if(error){
            console.log(error);
            res.status(500).send("Error creating file");
            return;
        }
        res.send("created");
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
