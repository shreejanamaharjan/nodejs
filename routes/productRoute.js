const express = require("express");
const router = express.Router();
const {addProduct,outofstock, getProduct,getProductById, updateProductById, deleteProductById, searchProduct}  = require('../controller/productContoller');

router.post('/add',addProduct);
router.get('/outofstock', outofstock);
router.get('/search', searchProduct);
router.get('/all',getProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);




module.exports=router;