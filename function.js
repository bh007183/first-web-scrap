const axios = require("axios");
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);


// ???????             string  integer   string
                                                //    format = +19072312406    run every ms
const runner = async function (url, company, titleToLookFor, notificationPhoneNumber, interval) {
let numberOfJobs;
axios
    .get(url)
    .then(function (res) {
      
      numberOfJobs = res.data.split(titleToLookFor).length - 1;
      console.log("Start " + numberOfJobs + " " + titleToLookFor)
    }).catch((err) => console.log(err))


setInterval(() => {
  console.log(numberOfJobs + " " + titleToLookFor)
  axios
    .get(url)
    .then(function (res) {
      //  jobsArr = number of indexes in the returned split on the page
      let jobsArr = res.data.split(titleToLookFor).length - 1;

      switch (jobsArr) {
        case jobsArr > numberOfJobs:
          client.messages
            .create({
              body: `${company} has new job listings for ${titleToLookFor} positions`,
              from: "+17044198270",
              to: `${notificationPhoneNumber}`,
            })
            .then(function (message) {
              numberOfJobs = jobsArr;
              res.json(message.sid);
            });
          break;
        default:
          numberOfJobs = jobsArr;
          break;
      }
    })
    .catch((err) => console.log(err));
    let today = new Date()
    var T = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(T)
}, interval);
};

module.exports = runner
