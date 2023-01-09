var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const path = require('path');
//const session = require('session');

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
const pro = require('./Database/DBs/products.js').pro
const User = require('./Database/DBs/User.js').User
const test = require('./Database/DBs/deat-seed.js').test


app.get("/", (req, res) => {
    res.render("Home.html")

})
app.get('/Sign-Up', function(req, res) {
    res.render('Sign-Up.html');
});
app.get('/Sign-Up-Service', function(req, res) {
    res.render('Sign-Up-Service.html');
});

app.get('/Log-in', function(req, res) {
    res.render('Log-in.html');
});

app.get('/profile', function(req, res) {
    res.render('profile.ejs');
});
app.get('/Profile-Service1', function(req, res) {
    res.render('Profile-Service1.ejs');
});
app.get('/Profile-cos', function(req, res) {
    res.render('Profile-cos.html');
});
app.get('/add-product', function(req, res) {
    res.render('add-product.html');
});



app.get('/Employees', function(req, res) {
    User.find({}, function(err, users) {
        res.render('Employees.ejs', {
            p: users
        });
    });
});

app.get('/products', function(req, res) {
    pro.find({}, function(err, product) {
        res.render('products.ejs', {
            p: product
        });
    });
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
                    if (user.Roll === 'Employee') {
                        return res.redirect("/Profile-Service1");
                    }
                    if (user.Roll === 'Admin') {
                        return res.redirect("/profile"); /////////////////////
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
                //if(user.Roll==='Employee'){
                console.log("sign up not succesfuly");
                return res.redirect("/Sign-Up");
                //}
            };
        } else {
            console.log("the user is already exist!");
            return res.redirect("/Sign-Up");
        }
    });
});
// app.post("/product", (req, res) => {

//     let products = new User({
//         pants:req.body.pants,
//         coat:req.body.coat,
//         shirt:req.body.shirt,
//         shoes:req.body.shoes,
//         chair:req.body.chair,
//         table:req.body.table
//     })
//     products.save(function(err) {
//         if (!err) {
//             console.log("sign up succesfuly");
//             return res.redirect('/product');
//         }
//     });
// });

app.post('/ForgotPW', function(req, res) {
    var password = req.body.password;

    User.findOne({
        id: req.body.id,

    }, function(err, user) {
        if (err) { // user doesn't exist
            res.json({
                error: err
            })
        }
        if (user) { //user exist

            console.log(user);

            if (req.body.id == user.id && req.body.email == user.email) {

                if (req.body.newpass === req.body.confnewpass) {

                    User.updateOne({
                        id: user.id
                    }, {
                        password: req.body.newpass
                    }, function(err, reas) {
                        if (err) {
                            console.log("couldn't change password");
                        } else {
                            console.log("password changed successfully");
                            return res.redirect("/Log-In");
                        }
                    });


                } else {
                    console.log("passwords doesn't match");
                }




            } else {
                console.log("email and password doesn't match ");
                return res.redirect("/ForgotPW");
            }
        } else {
            console.log("user doesn't exist");
            return res.redirect("/ForgotPW");
        }
    });
});
app.get('/Log-out', (req, res) => {
    console.log("logout user");
    res.redirect('/Log-in.html');
});

app.post("/volunteerdeat", (req, res) => {

    let voldeat = new test({
        date: req.body.date,
        hours: req.body.hours,
        aboutmeet: req.body.aboutmeet

    })

    voldeat.save(function(err) {
        if (!err) {
            console.log(voldeat);
            return res.redirect('/volunteer-detail');
        }
    });
});


app.post("/add-product", (req, res) => {

    let product = new pro({
        pants: req.body.pants,
        coat: req.body.coat,
        shirt: req.body.shirt,
        shoes: req.body.shoes,
        chair: req.body.chair,
        table: req.body.table


    })

    product.save(function(err) {
        if (!err) {
            console.log(product);
            return res.redirect('/add-product');
        }
    });
});





module.exports = app;