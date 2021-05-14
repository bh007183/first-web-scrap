const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
var PORT = process.env.PORT || 8070;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
let numberOfJobs = 16;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
// setInterval(() => {
axios
  .get("https://www.trilogyed.com/about/careers")
  .then(function (res) {
    let TA = res.data.split("Teaching Assistant").length - 1;
    let LA = res.data.split("Learning Assistant").length - 1;
    
    if (TA + LA > numberOfJobs){


      client.messages
        .create({
          body: "Trilogy has new job listings for TA || LA positions",
          from: "+17044198270",
          to: "+19072312406",
        })
        .then(function (message) {
          numberOfJobs = TA + LA;
          res.json(message.sid);
        });
    }else{
      numberOfJobs = TA + LA;
    }
  })
  .catch((err) => console.log(err));
// }, 1000 * 60 * 60 * 3);

app.listen(PORT, function () {
  console.log("App listening on PORT http://localhost:" + PORT);
});

setInterval(() => {
  let today = new Date()
  var T = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log(T)
  console.log(numberOfJobs)
  
}, 1000 * 60 * 60 * 3);


