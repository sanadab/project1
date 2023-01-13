const mongoose = require('mongoose');

const reqschema = new mongoose.Schema({
Name:String,
Email:String,
request:String
})
let requestt = mongoose.model("request2", reqschema)
module.exports = {requestt}
