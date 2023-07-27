const resetBtn = document.getElementById('submit');

async function myFunction(event)    
{
    event.preventDefault();
            alert("The form is submited");
            var fpassword = document.getElementById('fpassword').value;

            var obj ={
                fpassword
            }
            try {         
             const response = await axios.put("http://localhost:3000/password/updateNewPassword", obj,{headers: {"Authorization" : token}});
             console.log(response)
           
            }
             catch(err)  {
             console.log(err)};
}
