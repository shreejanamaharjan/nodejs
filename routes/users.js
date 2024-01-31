const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/shop");

const userSchema = mongoose.Schema({
  userID: Number,
  name: String,
  address: String,
  contact: Number
});

module.export = mongoose.model("user", userSchema);
