const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
var PORT = process.env.PORT || 8070;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const MyPhone = process.env.PERSONAL_PHONE
const client = require("twilio")(accountSid, authToken);
const runner = require("./function.js")
let numberOfJobs = 16;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

runner("https://www.trilogyed.com/about/careers", "Trilogy", "Teaching Assistant", MyPhone, 10000)
runner("https://www.trilogyed.com/about/careers", "Trilogy", "Learning Assistant", MyPhone, 1000 * 60 * 60 * 3)
runner("https://www.highspot.com/careers", "HighSpot", "Accelerate", MyPhone, 1000 * 60 * 60 * 3)


app.listen(PORT, function () {
  console.log("App listening on PORT http://localhost:" + PORT);
});




