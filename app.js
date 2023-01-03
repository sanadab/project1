var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const path = require('path');
var passwordValidator = require('password-validator');
const app = express();
const ejs = require("ejs");
var engines = require('consolidate');

const MongoClient = require('mongodb').MongoClient;
const url = '<mongodb+srv://sanadab7:PasswordPassword@cluster0.qxmzvmg.mongodb.net/?retryWrites=true&w=majority>';
const dbName = '<DB>';



// MongoClient.connect('mongodb://localhost:27017/mydatabmongodb+srv://sanadab7:PasswordPassword@cluster0.qxmzvmg.mongodb.net/?retryWrites=true&w=majorityase', (err, client) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
  
//   const db = client.db('mydatabase');
  
//   db.createCollection('users', (err, collection) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
    
//     const user = { _id: 1, name: 'John', age: 30 };
//     collection.insertOne(user, (err, result) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
      
//       console.log('Inserted user into the collection');
//     });
//   });
// });





app.set('view engine', 'ejs');
app.use(express.static('views'));
app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.use(bodyParser.urlencoded({
    extended: true
}));


var db = mongoose.connection;
db.on('error', () => console.log("Error in connecting to database"));
db.once('open', () => console.log("Connected to Databases"))
const User = require('./Database/DBs/User.js').User




app.get("/", (req, res) => {
    res.render("Home.html")

})
function requireAdmin(req, res, next) {
    if (req.session.role === 'admin') {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  }
  
  function requireEmployee(req, res, next) {
    if (req.session.role === 'Service') {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  }
  
  function requireCustomer(req, res, next) {
    if (req.session.role === 'customer') {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  }
  
  // Routes that should only be accessible to admins
  app.get('/admin-only', requireAdmin, function(req, res) {
    // Only admins can access this route
  });
  
  // Routes that should only be accessible to employees
  app.get('/employee-only', requireEmployee, function(req, res) {
    // Only employees can access this route
  });
  
  // Routes that should only be accessible to customers
  app.get('/customer-only', requireCustomer, function(req, res) {
    // Only customers can access this route
  });
  
app.get('/Sign-Up', function(req, res) {
    res.render('Sign-Up.html');
});

app.get('/Log-in', function(req, res) {
    res.render('Log-in.html');
});
app.get('/profile', function(req, res) {
    res.render('profile.html');
});

app.post('/Log-In', (req, res) => {

    try {
        var password = req.body.Password;
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
                    LoggedInUser = user.FirstName;
                    console.log("\n inside the login\n");

                    return res.redirect("/profile");
                    // req.session.user = user;


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

var passwordschema = new passwordValidator();

passwordschema
    .is().max(15)
    .is().min(7)
    .has().uppercase()
    .has().not().spaces()
    .has().digits(2);
app.post("/Sign-Up", (req, res) => {

    let users = new User({
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        id: req.body.id,
        password: req.body.password,
        email: req.body.email,
        Gender: req.body.Gender,
        Age: req.body.Age,
        Phone: req.body.Phone,
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

                        //console.log(user);
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

app.post("/Sign-Up-Service", (req, res) => {

    let users = new User({
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        id: req.body.id,
        password: req.body.password,
        email: req.body.email,
        Gender: req.body.Gender,
        Age: req.body.Age,
        Phone: req.body.Phone,
        Birthdate: req.body.Birthdate
    })

    console.log(users);
    console.log(req.body.id);
    User.findOne({
        id: req.body.id,

    }, function(err, user) {
        if (err) {
            res.send('Error: Sign up was not successful');
      return;

            res.json({
                error: err
            })
        }
        console.log(user);
        if (!user) {

            if (passwordschema.validate(req.body.password)) {

                users.save(function(err) {
                    if (!err) {

                        //console.log(user);
                        console.log("sign up succesfuly");
                        return res.redirect('/Home');
                    }
                });



            } else {
                document.getElementById('message').innerHTML = 'Sign up unsuccessful. Please try again.';
                console.log("sign up not succesfuly");
                return res.redirect("/Sign-Up-Service");
            };

        } else {
            console.log("the user is already exist!");
            return res.redirect("/Sign-Up-Service");
        }
    });


});
app.post("/Sign-Up-Customer", (req, res) => {

    let users = new User({
        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        id: req.body.id,
        password: req.body.password,
        email: req.body.email,
        Gender: req.body.Gender,
        Age: req.body.Age,
        Phone: req.body.Phone,
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

                        //console.log(user);
                        console.log("sign up succesfuly");
                        return res.redirect('/Log-in');
                    }
                });



            } else {

                console.log("sign up not succesfuly");
                return res.redirect("/Sign-Up-Customer");
            };

        } else {
            console.log("the user is already exist!");
            return res.redirect("/Sign-Up-Customer");
        }
    });


});
app.get('/Profile-Service', function(req, res) {
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
       if (err) throw err;
 
       console.log("Connected successfully to server");
 
       const db = client.db('DB');
       const collection = db.collection('Request');
 
       collection.find({}).toArray(function(err, result) {
          if (err) throw err;
 
          res.render('Request', {Request: result});
        console.log(Request);
          client.close();
       });
    });
 });

app.post('/Profile-Service', (req, res) => {
    const Name = req.body.Name;
    const Email = req.body.Email;
    const Request = req.body.Request;
  
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("DB").collection("Request");
      collection.insertOne({ Name: Name, Email: Email, Request: Request }, function(err, res) {
        console.log("Request saved to database");
        client.close();
      });
    });
  });


module.exports = app;