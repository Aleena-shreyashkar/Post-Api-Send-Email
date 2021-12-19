
const express = require('express')
const app = express()

"use strict";
const nodemailer = require("nodemailer");
const port = 3000
app.use(express.json())    // <==== parse request body as JSON

//Post request
app.post('/', function (req, res) {
  let emailto = req.body.to;
  let emailbody = req.body.email_body;

  sendEmail(emailto, emailbody).
    then(res.json({ success: true, message: "Email sent successfully" })).
    catch(res.json({ succes: false, message: "Error message" }))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(emailto, emailbody) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'singhanshu4476@gmail.com', // sender address
    to: emailto, // list of receivers
    subject: "Test Email", // Subject line
    text: emailbody, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

