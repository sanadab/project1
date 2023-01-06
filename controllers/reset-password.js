var express = require("express");
var mongoose = require("mongoose");
const app = express.Router();
const UserModel = require("../Database/DBs/User").User;

app.get("/reset-password-be", async (request, response) => {
    try {
        let email = request.query.email;
        let newPassword = request.query.password;
        let user = await UserModel.find({email: email}).exec(); 
        if(user !== null)
        {
            user[0].password = newPassword;
            user[0].save();
        }
        else
        {
            response.send(500).message("invalid email");
        }
        response.send(200).message("password changed succefully");
    } catch (err) {

    }
})

module.exports = app;