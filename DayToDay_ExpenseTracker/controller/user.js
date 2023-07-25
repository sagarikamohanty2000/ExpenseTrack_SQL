
const bcrypt = require('bcrypt');

const User = require('../model/Users');

 exports.postUserSignin = async (req, res, next) =>
{
    const name = req.body.fname;
    const email = req.body.femail;
    const password = req.body.fpassword;

   const user = await User.findAll({where : {email}})
        if(user.length > 0)
        {
            console.log('USER ALREADY EXISTS');
            res.status(401).json({
                error: {
                    message: "User already exists"
                }
            })
        }
        else {
            bcrypt.hash(password,10,async(err, hash) => {
               try{
                await User.create({
                    name : name,
                    email : email,
                    password : hash
                })
                    console.log('USER CREATED');
                    res.status(200).json({message : 'Successfully created new user'})
            } 
                    catch(err){
                        console.log(err)};
                    
                })      
            }
}

exports.postUserLogin = async (req,res,next) => {
    const email = req.body.femail;
    const password = req.body.fpassword;
 
    try {
    const user = await User.findAll({where : {email}})
        if(user.length > 0){
            bcrypt.compare(password, user[0].password, (err, response) => {
                if(response === true)
                {
                   return res.status(200).json({
                    message:"Successfully logged in"
                   })
               }

               if(err){
                console.log("Something went wrong")
                res.status(500).json({
                    error:{
                        message:"Something went wrong"
                    }
                })
                }
                else{
                    console.log("User not authorised")
                    res.status(401).json({
                       error:{
                           message:"User not authorised"
                       }
                   }) 
                }
            })
        }

        else {
            console.log("User not found")
            res.status(404).json({
            error:{
                message:"User not found"
            }
        })
       }
    }
       catch(err){ 
        console.log(err)};
}