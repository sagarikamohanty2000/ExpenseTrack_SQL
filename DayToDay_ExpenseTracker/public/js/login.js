

async function myFunction(event)    
{
    event.preventDefault();
            alert("The form is submited");
            var femail = document.getElementById('femail').value;
            var fpassword = document.getElementById('fpassword').value;

            var obj ={
                femail,
                fpassword
            }
            try {         
             const response = await axios.post("http://localhost:3000/user/login", obj);
             alert("You have successully logged in");
             window.location.href="../view/expense.html"
           
            }
             catch(err)  {
                this.errorMessage = err.message;
                alert("Username or Password is invalid")};
}
