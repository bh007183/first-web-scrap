const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// const db = require("./models");
// Sets up the Express App
var PORT = process.env.PORT || 8080;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors());

app.use(express.static("public"));

app.post("/sendMessage", (req, res) => {
  console.log(req.body)
  client.messages
      .create({body: 'Trilogy has new job listings for TA positions', from: '+17044198270', to: '+19072312406'})
      .then(message => res.json(message.sid));
})

  app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
  });
