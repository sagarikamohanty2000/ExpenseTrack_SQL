
//const User = require('../model/Users');
//const Razorpay = require('razorpay');

var ulTag = document.getElementById('expense-list');
const token = localStorage.getItem('token');
//Submit Function
async function myFunction(event) {
   event.preventDefault();
    alert("This Form is submited");

    var amt = document.getElementById('expenseAmt').value;
    var description = document.getElementById('chooseDescription').value;
    var category = document.getElementById('chooseCategory').value;
   
        var obj =
        {
            amt,
            description,
            category,
        }
        try {   
        const response = await axios.post("http://localhost:3000/expense/add-expense",obj,{headers: {"Authorization" : token}});
        console.log(response);    
        }

        catch (error) {
            console.log(error);
        }
     showExpenseItemsOnScreen(obj);
}

function showExpenseItemsOnScreen(obj)
{
   var list = document.createElement('li');
   list.className="list-group-item";
   list.id=`${obj.id}`;
   
    //Delete Button
    var deleteBtn = document.createElement('button');
    deleteBtn.className="btn btn-sm delete ml-10 mr-10 float-right";
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.onclick = (async () => {

      if(confirm('Do you want to delete ? '))
            {
               
               try{
                const response = await axios.delete(`http://localhost:3000/expense/delete/${obj.id}`, {headers: {"Authorization" : token}});
                console.log(response);
                var deleteli = document.getElementById(`${obj.id}`);
                ulTag.removeChild(deleteli);
               }
               catch(error) {
                  console.log(error)
               }
            }
       })

    //Data ShowCased on the screen
    list.textContent = obj.amount+" "+obj.description+" "+obj.category+" ";
    list.appendChild(deleteBtn);

    ulTag.appendChild(list);
}

document.getElementById('rzp-btn').onclick = async function (event)
{
   const response = await axios.get('http://localhost:3000/purchase/premium',{headers: {"Authorization" : token}});
   var options = {
      "key": response.data.key_id,
      "order_id": response.data.order.id,
      "handler" : async function (response) {
         await axios.post('http://localhost:3000/purchase/updateTransaction',{
         order_id: options.order_id,
         payment_id: response.razorpay_payment_id,
         }, {headers : {"Authorization" : token}});

         alert('You are a Premium User now');
         
         disableThePremiumBtn();
      }
   };

   const rzp1 = new Razorpay(options);
   rzp1.open();
   e.preventDefault();


   rzp1.on('payment.failed', function (response){
      console.log(response)
      alert('Something went wrong');
   });
}

//Populate the Data from Local Storage onto The screen on Screen Refresh
window.onload = (async () => {
   
   try {
   const response = await axios.get("http://localhost:3000/expense/get-expense" , {headers: {"Authorization" : token}});
   console.log(token);
   disablePremiumBtnOnwindowLoad(response.data[0].userId);
   for(let i = 0 ; i<response.data.length; i++)
   {
      showExpenseItemsOnScreen(response.data[i]);
   }
}
catch (error)
{
   console.log(error);
}
   
})
    
function disableThePremiumBtn() {
   var buyPremiumBtn = document.getElementById('rzp-btn');
   buyPremiumBtn.className="btn-right-display";
}

async function disablePremiumBtnOnwindowLoad(userId) {
   try {
      const response = await axios.get(`http://localhost:3000/user/UserById/${userId}`, {headers: {"Authorization" : token}});
      
      if(response.data[0].isPremium === true){
         var buyPremiumBtn = document.getElementById('rzp-btn');
         buyPremiumBtn.className="btn-right-display";  
     }
   }
   catch (error)
   {
      console.log(error);
   }

   // const user = User.findByPk({where : {userId :userId}} )
   // if(user.isPremium === true){
   // var buyPremiumBtn = document.getElementById('rzp-btn');
   // buyPremiumBtn.className="btn-right-display";
  // }
}