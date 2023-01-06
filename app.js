var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const path = require('path');
var passwordValidator = require('password-validator');
const app = express();
const ejs = require("ejs");
var engines = require('consolidate');
const { send } = require("process");

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.use(bodyParser.urlencoded({
    extended: true
}));

const User = require('./Database/DBs/User.js').User

app.get("/", (req, res) => {
    res.render("Home.html")

})
app.get('/Sign-Up', function(req, res) {
    res.render('Sign-Up.html');
});

app.get('/Log-in', function(req, res) {
    res.render('Log-in.html');
});

app.get('/profile', function(req, res) {
    res.render('profile.ejs');
});

app.get('/profile-cos', function(req, res) {
    res.render('profile-cos.html');
});

app.get('/Profile-Service1', function(req, res) {
    res.render('Profile-Service1.ejs');
});

app.get('/Employees', function(req, res) {
    User.find({}, function(err, users) {
        res.render('Employees.ejs', {
            p: users
        });
    });
});

app.get('/reset-password', function(request,response)
{
    response.render("./reset-password/reset-password.html")

});

app.get('/Customer-details', function(req, res) {
    User.find({}, function(err, users) {
        // console.log("asd");
        console.log(users);
        res.render('Customer-details.ejs', {
            p: users
        });
    });
});

app.post('/Log-In', (req, res) => {
    try {
        User.findOne({
            id: req.body.id,
        }, function(err, user) {
            if (err) { // user doesn't exist
                res.json({
                    error: err
                })
            }
            if (user) { //user exist
                if (req.body.password === user.password) {
                    console.log(user);
                    console.log("\n inside the login\n");
                    console.log(req.body);
                    if (user.Roll === 'Employee') {
                        return res.redirect("/Home.html");
                    }
                    if (user.Roll === 'Admin') {
                        return res.redirect("/profile");
                    }
                    if (user.Roll === 'customer') {
                        return res.redirect("/profile-cos");
                    }
                    // req.session.user = user;
                    console.log("asas");
                } else {
                    return res.redirect("/Log-in");
                }
            } else {
                return res.redirect("/Log-in");
            }
        });
    } catch {
        return res.redirect(500, "/Log-in");

    }
});
// settings for password
var passwordschema = new passwordValidator();

passwordschema
    .is().max(15)
    .is().min(7)
    .has().uppercase()
    .has().not().spaces()
    .has().digits(2);
app.post("/Sign-Up", (req, res) => {

    let users = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        id: req.body.id,
        password: req.body.password,
        email: req.body.email,
        Gender: req.body.Gender,
        Age: req.body.Age,
        Phone: req.body.Phone,
        Roll: req.body.Roll,
        Birthdate: req.body.Birthdate
    })

    console.log(users);
    console.log(req.body.id);
    User.findOne({
        id: req.body.id,

    }, function(err, user) {
        if (err) {

            res.json({
                error: err
            })
        }
        console.log(user);
        if (!user) {
            if (passwordschema.validate(req.body.password)) {
                users.save(function(err) {
                    if (!err) {
                        console.log("sign up succesfuly");
                        return res.redirect('/Log-in');
                    }
                });
            } else {
                console.log("sign up not succesfuly");
                return res.redirect("/Sign-Up");
            };
        } else {
            console.log("the user is already exist!");
            return res.redirect("/Sign-Up");
        }
    });
});

app.get('/Log-out', (req, res) => {
    req.session.destroy();
    res.redirect('/Log-in');
});

module.exports = app;