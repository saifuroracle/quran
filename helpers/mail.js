const { sqlResult } = require('./sqlhelpers');
const jwt = require('jsonwebtoken');
const { unique } = require('./datahelpers');
const nodemailer = require("nodemailer");
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs')

const NodeMailer = exports.NodeMailer = async(req) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    
    // Open template file
    var source = fs.readFileSync('./app/views/mail/'+(req?.fileName || 'mail')+'.handlebars', 'utf8');
    // Create email generator
    var template = handlebars.compile(source);



    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: req.from, // sender address
        to: req.to, // list of receivers
        subject: req.subject || '', // Subject line
        text: "Hello world text?", // plain text body
        html: template(req), // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return info;
}
