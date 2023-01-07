const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    Firstname:String,
    email:string,
    Request:string
  
  });
const Request = mongoose.model("Request", requestSchema);
module.exports = { Request };