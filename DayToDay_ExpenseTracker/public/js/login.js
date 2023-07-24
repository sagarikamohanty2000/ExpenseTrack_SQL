const { response } = require("express");

async function myFunction(event)    
{
    event.preventDefault();
            alert("The form is submited");
            var fname = document.getElementById('fname').value;
            var fpassword = document.getElementById('fpassword').value;

            var obj ={
                fname,
                fpassword
            }
            try {         
             const response = await axios.post("http://localhost:3000/user/login", obj);
             console.log(response)
             alert("You have successully logged in");
           
            }
             catch(err)  {
                this.errorMessage = err.message;
                alert("Username or Password is invalid")};
}
