const app = require("./app.js");
const db = require('./Database/database.js');

const port = process.env.PORT || 5000;


db.connect();
const server = app.listen(port, () => {
    console.log("Starting Server port 5000");
});