

async function myFunction(event)    
{
    event.preventDefault();
            alert("The form is submited");
            var fname = document.getElementById('fname').value;
            var femail = document.getElementById('femail').value;
            var fpassword = document.getElementById('fpassword').value;

            var obj ={
                fname,
                femail,
                fpassword
            }
            try {         
             const response = await axios.post("http://localhost:3000/user/signIn", obj);
             console.log(response)
           
            }
             catch(err)  {
             console.log(err)};
}
