const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({

    FirstName: String,
    LastName: String,
    id: Number,
    password: String,
    email: String,
    Gender: String,
    Age: Number,
    Phone: Number,
    Birthdate: Date,

});
const User = mongoose.model("Users", regSchema);
module.exports = { User };