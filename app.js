var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
        extended: true
    }))
    // ?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://sanadab7:PasswordPassword@cluster0.qxmzvmg.mongodb.net/users', {
    useNewUrLParser: true,
    useUnifiedTopoLogy: true

});


var db = mongoose.connection;
app.get("/", (req, res) => {
    res.render("login")

})




db.on('error', () => console.log("Error in connecting to database"));
db.once('open', () => console.log("Connected to Databases"))

app.post("/Sign-Up", (req, res) => {
    var _id = req.body._id;
    var Fname = req.body.Fname;
    var Lname = req.body.Lname;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;


    var data = {
        "_id": _id,
        "Fname": Fname,
        "Lname": Lname,
        "email": email,
        "phno": phno,
        "password": password
    }

    db.collection('Users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfuly");
    });

    return res.redirect('Log-in.html')

})





.listen(5000);

console.log("Listening on PORT 5000");