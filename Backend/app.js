global.config = require("./config-dev.json");
require("./dal/dal");
const express = require("express");
const cors = require("cors");
const controller = require("./controllers/base-controller");


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.render("./")

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
app.get('/Profile-Service1', function(req, res) {
    res.render('Profile-Service1.ejs');
});

app.listen(3001, () => console.log("Listening..."));
