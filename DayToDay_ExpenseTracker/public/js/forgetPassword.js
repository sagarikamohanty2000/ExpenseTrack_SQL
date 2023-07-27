
const token = localStorage.getItem('token');
async function myFunction(event)    
{
    event.preventDefault();
            alert("The form is submited");
            var femail = document.getElementById('femail').value;

            var obj ={
                femail
            }
            try {         
             const response = await axios.post("http://localhost:3000/password/forgotpassword", obj,{headers: {"Authorization" : token}});
             console.log(response)
           
            }
             catch(err)  {
             console.log(err)};
}
