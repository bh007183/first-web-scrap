const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
var PORT = process.env.PORT || 8070;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const MyPhone = process.env.PERSONAL_PHONE

const runner = require("./function.js")


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

runner("https://www.trilogyed.com/about/careers", "Trilogy", "Teaching Assistant", MyPhone, 1000 * 60 * 60 * 1)
runner("https://www.trilogyed.com/about/careers", "Trilogy", "Learning Assistant", MyPhone, 1000 * 60 * 60 * 1)
runner("https://www.highspot.com/careers", "HighSpot", "Accelerate", MyPhone, 1000 * 60 * 60 * 1)


app.listen(PORT, function () {
  console.log("App listening on PORT http://localhost:" + PORT);
});




