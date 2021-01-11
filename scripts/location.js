// Selectors
const username = localStorage.getItem("username");
const userName = document.querySelector(".username");
userName.innerHTML = username;

const url = "http://localhost:3000";

const token = localStorage.getItem("token");

const orderId = localStorage.getItem("orderId");

const inputLocation = document.querySelector(".input-location");

const submitButton = document.querySelector("button");

const signOutButton = document.querySelector(".sign-out");




// Event Listeners

signOutButton.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.href = "index.html";
});

submitButton.addEventListener("click", submitNewLocation);

// Functions

function submitNewLocation(){
    if(inputLocation.value === ""){
        toastr.warning("Location field cannot be empty!");
        return;
    }
    else{
        fetch(`${url}/change-location/${orderId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json", 
         Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
        preslocation: inputLocation.value
    })
})
.then(res=> res.json())
.then(res=>{
    if(res.message=== `Order ${orderId} updated successfully`){
       toastr.success("Success, order's present location updated!");
        
		setTimeout(()=>{  window.location.href ="getallapporders.html";}, 2000);
       
    }
    
})
.catch(err=>{
    console.log("Error", err);
});
    }
}