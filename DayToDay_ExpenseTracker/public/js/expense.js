
var ulTag = document.getElementById('expense-list');

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
            category
        }
        try {   
        const response = await axios.post("http://localhost:3000/expense/add-expense",obj);
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
                const response = await axios.delete(`http://localhost:3000/expense/delete/${obj.id}`);
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



//Populate the Data from Local Storage onto The screen on Screen Refresh
window.onload = (async () => {
   try {
   const response = await axios.get("http://localhost:3000/expense/get-expense");
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
    