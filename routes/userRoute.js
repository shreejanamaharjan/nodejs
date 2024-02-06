const express = require("express");
const router = express.Router();
const {signUp, login, updateUser}  = require('../controller/userController');

router.post('/signup',signUp);
router.post('/login', login);
router.patch('/updateUser', updateUser);





module.exports=router;