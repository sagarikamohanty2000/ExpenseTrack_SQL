const nodemailer = require("nodemailer");

const forgotPwdEmail = async (req,res,next) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'charlene.brekke32@ethereal.email',
            pass: 'crq5nYg3gBhnju3TMQ'
        }
    });
      
        const info = await transporter.sendMail({
        from: '"Sagarika" <foo@example.com>', 
        to: req.body.femail, 
        subject: 'Reset Password Link',
        textContent:"",
        text: "", 
        html: `<p>Click on the link to reset your password</p>
         <a href="#">Reset Password</a>
        `
      });
      console.log('Email SENT >>>>>>>>>>>')
      return res.send(info.messageId);
    }
    
module.exports = {
    forgotPwdEmail
}