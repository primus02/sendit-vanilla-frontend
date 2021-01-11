// Selectors
const username = localStorage.getItem("username");
const userName = document.querySelector(".username");
userName.innerHTML = username;

const url = "http://localhost:3000";

const token = localStorage.getItem("token");

const orderId = localStorage.getItem("orderId");

const inputDestination = document.querySelector(".input-dest");

const submitDest = document.querySelector("button");

const signOutButton = document.querySelector(".sign-out");




// Event Listeners

signOutButton.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.href = "index.html";
});

submitDest.addEventListener("click", submitNewDestination);

// Functions

function submitNewDestination(){
    if(inputDestination.value === ""){
        toastr.warning("Kindly provide your preferred new destination for this order");
        return;
    }
    else{
        fetch(`${url}/change-destination/search?username=${username}&id=${orderId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json", 
         Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
        destination: inputDestination.value
    })
})
.then(res=> res.json())
.then(res=>{
    if(res.message=== `Order ${orderId} updated successfully`){
		
       toastr.success("Success, your order's new destination updated");
        
		setTimeout(()=>{ window.location.href ="getallorders.html";}, 2000);
        
    }
    
})
.catch(err=>{
    console.log("Error", err);
});
    }
}