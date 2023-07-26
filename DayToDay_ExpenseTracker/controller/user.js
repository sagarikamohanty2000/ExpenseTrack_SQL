
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
                    success: "false",
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
                    res.status(200).json({
                        success: "true",
                        message : 'Successfully created new user'})
            } 
                    catch(err){
                        console.log(err)};
                    
                })      
            }
}

 function generateAccessToken(id){
    return jwt.sign({id : id},'secretKey');
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
                    success: "true",
                    message:"Successfully logged in",
                    token: generateAccessToken(user[0].id)
                   })
               }

               if(err){
                console.log("Something went wrong")
                res.status(500).json({
                    error:{
                        success: "false",
                        message:"Something went wrong"
                    }
                })
                }
                else{
                    console.log("User not authorised")
                    res.status(401).json({
                       error:{
                           success: "false",
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
                success: "false",
                message:"User not found"
            }
        })
       }
    }
       catch(err){ 
        console.log(err)};
}

exports.getUserById = async (req,res,next) => {
    try {
        const id = req.params.userId;
        const user = await User.findAll({where : {id : id}})
        console.log("GET CALL");
        console.log(user)
      return res.send(user);
    }
    catch(err) { console.log(err)}
};