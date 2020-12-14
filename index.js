const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require('dotenv').config();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));

app.post("/form", async function(req,res){
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        },
      });
    
      let mailOptions = {
        from: process.env.FROM,
        to: process.env.TO,
        subject: "New Inquiry",
        text: `Name: ${name} \n email: ${email} \n phone-number: ${phoneNumber}`,
      };
    
      transporter.sendMail(mailOptions,function(err,info){
        res.redirect("/");
      });
});
app.listen(2000 || process.env.PORT,function(){
  console.log("serever started on port 3000")
});