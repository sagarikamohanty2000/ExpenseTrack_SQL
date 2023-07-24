const User = require('../model/Users');

exports.postUserSignin =(req, res, next) =>
{
    const name = req.body.fname;
    const email = req.body.femail;
    const password = req.body.fpassword;

    User.findAll()
    .then(users => {

        let flag = false;
        for(let i = 0 ; i<users.length; i++)
        {
            if(users[i].name == name)
            {
                flag = true;
               console.log('USER ALREADY EXISTS');
               res.status(401).json({
                    error: {
                      message: "User already exists"
                    }
                  })
            }
        }

        if(flag == false){
        User.create({
            name : name,
            email : email,
            password : password
        })
        .then(result => {
            console.log('USER CREATED');
        })
        .catch(err => 
            console.log(err));
        }
    })

}

exports.postUserLogin = (req,res,next) => {
    const name = req.body.fname;
    const password = req.body.fpassword;

    User.findAll()
    .then(users => {
        let flagName = false;
        let flagPassword = false;
        for(let i=0; i<users.length; i++)
        {
            if(name === users[i].name )
                { 
                flagName = true;
                 if(password === users[i].password)
                 {
                    flagPassword = true;  
                 }
                }

            if(password === users[i].password)
                {
                   flagPassword = true;  
                }    
            
        }

        if(!flagName || !flagPassword){
            if(!flagName){
            console.log("User not found")
            res.status(404).json({
            error:{
                message:"User not found"
            }
        })
       }

        else if(!flagPassword){
            console.log("User not authorised")
             res.status(401).json({
                    error:{
                        message:"User not authorised"
                    }
                })
            }
    }
    else
    res.status(200).json({
        message:"User login successful"
    })
    })
}