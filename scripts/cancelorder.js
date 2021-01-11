// Selectors
const username = localStorage.getItem("username");
const userName = document.querySelector(".username");
userName.innerHTML = username;

const url = "http://localhost:3000";

const token = localStorage.getItem("token");

const orderId = localStorage.getItem("orderId");

const confirmButton = document.querySelector(".confirm");

const signOutButton = document.querySelector(".sign-out");


// Event Listeners

signOutButton.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.href = "index.html";
});

confirmButton.addEventListener("click", cancelOrder);

// Functions

function cancelOrder(){
   
    fetch(`${url}/cancel-order/search?username=${username}&id=${orderId}`, {
    method: "DELETE",
    headers: {
		"Content-Type": "application/json",
         Authorization: `Bearer ${token}`
    }
})
.then(res=> res.json())
.then(res=> {
    if(res.success){
		
       toastr.success("Success, your order has been cancelled");
        
		setTimeout(()=>{ window.location.href = "getallorders.html";}, 2000);
        
    }
})
.catch(err=> {
		console.log("Error", err);
	});
}
