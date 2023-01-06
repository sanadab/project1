var express = require("express");
var mongoose = require("mongoose");
const app = express.Router();
const UserModel = require("../Database/DBs/User").User;

app.get("/reset-password-be", async (request, response) => {

    try {
        console.log("lapota")
        let email = request.query.email;
        let newPassword = request.query.password;
        console.log(request.query);
        let user = await UserModel.find({email: email}).exec(); 
        console.log(user);
        if(user !== null)
        {
            user[0].password = newPassword;
            user[0].save();
            console.log(user[0])
        }
        else
        {
            console.log("asd2")
            response.send(500).message("invalid email");
        }
        console.log(email+ "here");
        response.send(200).message("password changed succefully");
    } catch (err) {

    }
})


module.exports = app;