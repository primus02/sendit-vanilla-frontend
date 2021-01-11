// Selectors
const username = localStorage.getItem("username");
const userName = document.querySelector(".username");
userName.innerHTML = username;

const url = "https://sendit.herokuapp.com";

const token = localStorage.getItem("token");

const orderId = localStorage.getItem("orderId");

const status = localStorage.getItem("status");

const inputStatus = document.querySelector(".input-status");
    inputStatus.value = status;

const submitButton = document.querySelector("button");

const signOutButton = document.querySelector(".sign-out");




// Event Listeners

signOutButton.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.href = "index.html";
});

submitButton.addEventListener("click", submitNewStatus);
// Functions

function submitNewStatus(){
    if(inputStatus.value === ""){
        toastr.warning("Status field cannot be left empty!");
        return;
    }
    else{
        fetch(`${url}/change-status/${orderId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json", 
         Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
        status: inputStatus.value.toLowerCase()
    })
})
.then(res=> res.json())
.then(res=>{
    if(res.message=== `Order ${orderId} updated successfully`){
		
       toastr.success("Success, order's new status updated!");
        
		setTimeout(()=>{ window.location.href ="getallapporders.html";}, 2000);
        
    }
    
})
.catch(err=>{
    console.log("Error", err);
});
    }
}
