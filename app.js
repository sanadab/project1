var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const path = require('path');
var router = express.Router();

//const session = require('session');

var passwordValidator = require('password-validator');
const app = express();


const ejs = require("ejs");
var engines = require('consolidate');
const { send } = require("process");
const { requestt3 } = require("./Database/DBs/Request.js");
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
const Request = require('./Database/DBs/Request-ac.js').Request
const volreq = require('./Database/DBs/volreq.js').volreq
const sclreq = require('./Database/DBs/sclreq.js').sclreq
const requestt = require('./Database/DBs/request2.js').requestt



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

app.get('/Request-cu', function(req, res) {
    res.render('Request-cu.html');
});

app.get('/volunteerdeat', function(req, res) {
    res.render('volunteerdeat.html');
});

app.get('/volunteerreq',function(req,res){
    res.render('volunteerreq.html');

});

app.get('/requestapli',function(req,res){
    res.render('requestapli.html');

});
app.get('/Customer-Donation-Request',function(req,res){
    res.render('Customer-Donation-Request.html');

});
// app.get('/Scholarship-Approval-for-Volunteers',function(req,res){
//     res.render('Scholarship-Approval-for-Volunteers.ejs');

// });


app.get('/volunteer-detail', function(req, res) {
    test.find({}, function(err, voldeat) {

        res.render('volunteer-detail.ejs', {


            p: voldeat

        });


    });
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

app.get('/Customer-details-sr', function(req, res) {
    User.find({}, function(err, users) {

        res.render('Customer-details-sr.ejs', {
            r: users
        });
    });
});
app.get('/Requests-table', function(req, res) {
    Request.find({}, function(err, Request1) {
        res.render('Requests-table.ejs', {
            p: Request1
        });
    });
});
app.get('/Admin-Assistance-Approval', function(req, res) {
    Request.find({}, function(err, Request1) {
        res.render('Admin-Assistance-Approval.ejs', {
            p: Request1
        });
    });
    
});
app.get('/Scholarship-Approval-for-Volunteers', function(req, res) {
    sclreq.find({}, function(err, sclreq1) {
        res.render('Scholarship-Approval-for-Volunteers.ejs', {
            p: sclreq1
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
// app.post("/Admin-Assistance-Approval", (req, res) => {

//     // let product = new pro({
//     //     pants: req.body.pants,
//     //     coat: req.body.coat,
//     //     shirt: req.body.shirt,
//     //     shoes: req.body.shoes,
//     //     chair: req.body.chair,
//     //     table: req.body.table
//     console.log("asd");

//     // })

//     test.Request1.remove(function(err) {
//         if (!err) {
//             console.log(product);
//             return res.redirect('/Home');
//         }
//     });
// });


app.post("/Request-cu", (req, res) => {

    let Request1 = new Request({
        Name: req.body.Name,
        Email: req.body.Email,
        request: req.body.request
    })

    Request1.save(function(err) {

        if (!err) {

            console.log(Request1);

            return res.redirect('/Request-cu');
        }
    });
});
app.post("/volunteerreq", (req, res) => {

    let reqs = new volreq({
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
        aboutme:req.body.aboutme,
        volunteer:req.body.volunteer
    })

    reqs.save(function(err) {

        if (!err) {

            console.log(reqs);

            return res.redirect('/volunteerreq');
        }
    });
});
app.post("/requestapli", (req, res) => {

    let sclreq1 = new sclreq({
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Studyat: req.body.Studyat,
        Yearofstud:req.body.Yearofstud,
        aboutme:req.body.aboutme

        
    })

    sclreq1.save(function(err) {

        if (!err) {

            console.log(sclreq1);

            return res.redirect('/requestapli');
        }
    });
});





    app.post("/add-product", (req, res) => {
    
        let product = new pro({
            pants:req.body.pants,
            coat: req.body.coat,
            shirt:req.body.shirt,
            shoes:req.body.shoes,
            chair:req.body.chair,
            table:req.body.table
            
         
        })
       
                    product.save(function(err) {

                        if (!err) {

                            console.log(product);

                            return res.redirect('/add-product');
                        }
                    });
        });
       
    
app.post("/Customer-Donation-Request", (req, res) => {

    let request2 = new requestt({
        Name: req.body.Name,
        Email: req.body.Email,
        request: req.body.request
    })

    request2.save(function(err) {

        if (!err) {

            console.log(request2);

            return res.redirect('/Customer-Donation-Request');
        }
    });
});
     
// app.get('/views/delete/:id',function(req,res){
//     mongoose.model("request1").remove({_id:req.body.id},function(err,delData){
//         res.redirect("/views/Admin-Assistance-Approval")
//     })
//     res.send(req.body.id);
// })

// app.delete('/views/delete/:id', function (req, res) {
//     User.findByIdAndRemove(req.body.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem deleting the user.");
//       res.status(200).send("User "+ user.name +" was deleted.");
//     });
//   });

app.post('/Delete', async (req, res) => {
  //console.log(req.body);
    var a=req.body.id;
    console.log(a);
    await Request.deleteOne({id: req.body.id});
    return res.redirect('/profile');
  });
/*
  app.post('/Delete', function(req, res) {
    Request.find({}, function(err, Request1) {
        res.render('Admin-Assistance-Approval.ejs', {
            p: Request1
        });
    });
});
 */
app.post('/Delete1', async (req, res) => {
    //console.log(req.body);
      var a=req.body.id;
    //   console.log(a);
      await sclreq.deleteOne({id: req.body.id});
      return res.redirect('/profile');
    });


app.post('/Block', async (req, res) => {
    //console.log(req.body);
      var a=req.body.id;
       console.log(a);
      await User.deleteOne({id: req.body.id});
      return res.redirect('/profile');
    });
module.exports = app;






















































