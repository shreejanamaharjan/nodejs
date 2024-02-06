const express = require("express");
const router = express.Router();
const {addCart}  = require('../controller/cartController');

router.post('/addCart',addCart);





module.exports=router;