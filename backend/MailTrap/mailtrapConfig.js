const { MailtrapClient } = require("mailtrap");
const dotenv = require("dotenv").config();




  const mailTrapClient = new MailtrapClient({
    endpoint: process.env.MAILTRAP_ENDPOINT,
    token: process.env.MAILTRAP_TOKEN,
  });

 const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};


module.exports = {
  mailTrapClient,
  sender
  }