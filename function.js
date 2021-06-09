const axios = require("axios");
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE = process.env.TWILIO_PHONE
const client = require("twilio")(accountSid, authToken);


// ???????             string  integer   string
//    format =     run every ms
const runner = async function (
  url,
  company,
  titleToLookFor,
  notificationPhoneNumber,
  interval
) {
  let numberOfJobs;
  axios
    .get(url)
    .then(function (res) {
      numberOfJobs = res.data.split(titleToLookFor).length - 1;
      console.log("Start " + numberOfJobs + " " + titleToLookFor);
    })
    .catch((err) => console.log(err));

  setInterval(() => {
    axios
      .get(url)
      .then(function (res) {
        //  jobsArr = number of indexes in the returned split on the page
        let jobsArr = res.data.split(titleToLookFor).length - 1;
        console.log(jobsArr);
        console.log(numberOfJobs);
        if (jobsArr > numberOfJobs) {
          console.log("this should fire");
          client.messages
            .create({
              body: `${company} has new job listings for ${titleToLookFor} positions`,
              from: `${TWILIO_PHONE}`,
              to: `${notificationPhoneNumber}`,
            })
            .then(function (message) {
              numberOfJobs = jobsArr;
            })
            .catch((err) => console.log(err));
        } else {
          numberOfJobs = jobsArr;
        }
        console.log(numberOfJobs + " " + titleToLookFor);
      })
      .catch((err) => console.log(err));
    let today = new Date();
    var T =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(T);
  }, interval);
};

module.exports = runner;
