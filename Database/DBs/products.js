const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({
pants:Number,
coat:Number,
shirt:Number,
shoes:Number,
chair:Number,
table:Number

});
const User = mongoose.model("products", regSchema);
module.exports = { User };