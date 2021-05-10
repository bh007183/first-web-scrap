const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
var PORT = process.env.PORT || 8070;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
let numberOfJobs = 0;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
setInterval(() => {
axios
  .get("https://www.trilogyed.com/about/careers")
  .then(function (res) {
    if (res.data.split("Teaching Assistant").length - 1 > numberOfJobs){

      client.messages
        .create({
          body: "Trilogy has new job listings for TA positions",
          from: "+17044198270",
          to: "+19072312406",
        })
        .then(function (message) {
          numberOfJobs = res.data.split("Teaching Assistant").length - 1;
          res.json(message.sid);
        });
    }else{
      numberOfJobs = res.data.split("Teaching Assistant").length - 1;
    }
  })
  .catch((err) => console.log(err));
}, 10000);

app.listen(PORT, function () {
  console.log("App listening on PORT http://localhost:" + PORT);
});


