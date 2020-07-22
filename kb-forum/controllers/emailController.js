let profileModel = require('../models/profileData')
var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'knowledgebase4711@gmail.com',
      pass: 'Password1$'
    }
  });
  
exports.sendEmail = async (req,res) => {
    senderID = req.session.profileID;
    receiverID = req.session.receiverID;
    sender = await profileModel.email(senderID);
    receiver = await profileModel.email(receiverID);
    fromEmail = sender[0][0].email;
    toEmail = receiver[0][0].email;

    var mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: req.body.subject,
        text: `Message recieved from ${req.session.fullName}:\n${req.body.message}`
        };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
