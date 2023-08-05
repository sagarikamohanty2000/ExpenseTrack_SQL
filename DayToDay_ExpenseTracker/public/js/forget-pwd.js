
async function myFunction(event)    
{
    event.preventDefault();
            alert("The form is submited");
            var femail = document.getElementById('femail').value;

            var obj ={
                femail
            }
            try {         
             const response = await axios.post("http://3.16.95.158/password/forgotpassword", obj,);
             console.log(response)
           
            }
             catch(err)  {
             console.log(err)};
}
