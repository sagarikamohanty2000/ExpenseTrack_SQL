const nodemailer = require("nodemailer");
const {v4: uuid} = require('uuid');
const sequelize = require('../util/database');
//const resetPasswordForm = require('../view/resetPassword');

const bcrypt = require('bcrypt');

const FP = require('../model/forgetPassword');
const User = require('../model/Users');

const forgotPwdEmail = async (req,res,next) => {

    const t = await sequelize.transaction();
    const email = req.body.femail;
    const uniqueId =  uuid();
         User.findOne({where: {email : email}}).then((user) => {
            
      
        FP.create({
            uuid:uniqueId,
            isActive: true,
            userId: user.id,
            transaction: t
        },)
         })

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
         <a href="http://localhost:3000/password/resetpassword/${uniqueId}">Reset Password</a>
        `
      });
      console.log('Email SENT >>>>>>>>>>>')
      return res.send(info.messageId);
    }
    

const resetPassword = async (req,res,next) => {

        try {
        const forgetPwdId = req.params.uniqueId;
        FP.findOne({where : {uuid: forgetPwdId}}).then((request) =>{
            if(request.isActive === true)
            {
                FP.update({isActive: false}, {where: {uuid: forgetPwdId}})
                .then((result)=>{ 
                res.send(`<html>
                               <script>
                                  function myFunction(event){
                                    e.prevenyDefault();
                                    console.log('called')
                                    window.location.href="../view/login.html"
                                  }
                                  </script>
                                  <form action="/password/updateNewPassword/${forgetPwdId}" onsubmit="myFunction(event)" method="get">
                                  <label for="fpassword">Enter new Password</label>
                                  <input name="fpassword" type="password" required></input>
                                  <button>Reset Password</button>
                                  </form>
                                  </html>
                                  `);

                                  res.end()
                                })
            }
            else{
                res.status(403).json({
                    error: {
                        message:"The link has expired"
                    }
                })
            }
        } )
        }

        catch(err){
        console.log(err)
        }
    }

const updateNewPassword = async(req,res,next) => {
       
    const t = await sequelize.transaction();
            try {
                const newpassword = req.query.fpassword;
         
               await FP.findOne({ where : { uuid: req.params.uniqueId }}).then(resetpassword => {
               
                    User.findOne({where: { id : resetpassword.userId}}).then(async (user) => {
                        if(user){
                            const saltRounds = 10;
                        bcrypt.hash(newpassword, saltRounds, (err, hash) => {
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({
                                    success: true,
                                    message: 'Successfuly update the new password'})
                            })
                        });
                        }
                        })
                    })       
            }
            catch(err)
            {
                await t.rollback();
                console.log(err);
            }
    }
module.exports = {
    forgotPwdEmail,
    resetPassword,
    updateNewPassword
}