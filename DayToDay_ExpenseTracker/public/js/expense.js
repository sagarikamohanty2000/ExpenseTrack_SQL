
//const User = require('../model/Users');
//const Razorpay = require('razorpay');

var ulTag = document.getElementById('expense-list');
var ldTag = document.getElementById('leaderboard-user');
var premiumTag = document.getElementById('premium-user');
var fileHistoryTag = document.getElementById('file-history');
var premiumBtn = document.getElementById('rzp-btn');
var leaderBoardBtn = document.createElement('button');
var addExpenseBtn = document.getElementById('submit');
var downloadFileBtn = document.getElementById('download-btn');
var downloadFileHistoryBtn = document.getElementById('download-file-history');

const token = localStorage.getItem('token');

//Submit Function
addExpenseBtn.onclick = async function (event){
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

premiumBtn.onclick = async function (event)
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

   disablePremiumBtnOnwindowLoad(token);
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

async function disablePremiumBtnOnwindowLoad(token) {
   try {
      const response = await axios.get('http://localhost:3000/user/UserByToken/', {headers: {"Authorization" : token}});
      console.log("PREMIUM >>>>>>>>>>>>>>>>>>>>>> "+ response.data);
      if(response.data.isPremium === true){
         var buyPremiumBtn = document.getElementById('rzp-btn');
         buyPremiumBtn.className="btn-right-display";  
         var para = document.createElement('p');
         para.className = 'premium-class';
         para.innerHTML= 'Premium User';
         premiumTag.appendChild(para);
         
       
         leaderBoardBtn.id="leaderBoard-btn";
         leaderBoardBtn.className="btn2-right";
         leaderBoardBtn.appendChild(document.createTextNode('Leaderboard'));
         document.getElementById('premium-feature').appendChild(leaderBoardBtn)
      }
   }
   catch (error)
   {
      console.log(error);
   }
}

leaderBoardBtn.onclick = async function (event){
                     
      try{
       const response = await axios.get('http://localhost:3000/premium/leaderBoard', {headers: {"Authorization" : token}});
       console.log(response);
       ldTag.innerHTML += '<h3>Leader Board</h3>'
       response.data.forEach((userInfro) => {
         ldTag.innerHTML += `<li>Name : ${userInfro.name} -  Total Expense : ${userInfro.totalExpense}`
      })
      }
      catch(error) {
         console.log(error)
      }
}

downloadFileBtn.onclick = async function(event){

   try
   {
      const response = await axios.get('http://localhost:3000/expense/downloadFile',{headers :{"Authorization " : token}})
       if(response.status === 200)
       {
         var a = document.createElement('a');
         a.href = response.data.fileUrl;
         a.download = 'myexpense.csv';
         a.click();
       }
       else
       throw new Error(response.data.message);
   }

   catch(err)
   {

   }
}   

downloadFileHistoryBtn.onclick = async function(event){

   try{
      const response = await axios.get('http://localhost:3000/expense/fileHistory',{headers: {"Authorization": token}});
      console.log(response);
      fileHistoryTag.innerHTML += '<h3>List of Downloaded Files : </h3>'
      var j = 1; 
      for(let i = 0 ; i<response.data.fileData.length; i++)
       {
         fileHistoryTag.innerHTML += `<li><a  href = "${response.data.fileData[i].fileUrl}">File ${j}</a>`
         j++;
       }
   }
   catch(err){
console.log(err)
   }
}
  
