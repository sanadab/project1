var express = require("express");
var mongoose = require("mongoose");
const app = express.Router();
const UserModel = require("../../Database/DBs/User").User;

function changePassword()
{
    $("button")
    console.log("ad");
    let useremail = document.getElementById("user-email").value;
    let userNewPassword = document.getElementById("user-new-password").value;
    console.log("user ema il "+useremail);
    getJSON("localhost:3000/reset-password-be?email="+useremail+"&newPassword="+userNewPassword);
}


async function changePasswordv2()
{
    let useremail = document.getElementById("user-email").value;
    let userNewPassword = document.getElementById("user-new-password").value;
    console.log("asdasdasdasd")
    try {
        console.log("lapota")
        let user = await UserModel.find({email: useremail}).exec(); 
        console.log(user);
        if(user !== null)
        {
            user[0].password = userNewPassword;
            user[0].save();
            console.log(user[0])
        }
        else
        {
            console.log("asd2")
        }
    } catch (err) {

    }
}

const button = document.querySelector('button');

button.addEventListener('click', () => {
  console.log('The button was clicked!');
});

$(document).ready(function () {
    console.log("zobra");
    $(".change-password-button").click(function(){
        console.log("ad");
        let useremail = document.getElementById("user-email");
        let userNewPassword = document.getElementById("user-new-password");
        getJSON("localhost:3000/reset-password-be?email="+useremail+"&newPassword="+userNewPassword);
    });
    //your code here
  });