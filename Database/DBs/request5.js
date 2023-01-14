const mongoose = require('mongoose');

const reschema = new mongoose.Schema({
    Name: String,
    Email: String,
    age: Number,
    request: String
})
let requestt5 = mongoose.model("request5", reschema)
module.exports = { requestt5 }