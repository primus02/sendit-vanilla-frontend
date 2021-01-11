// Selectors
const username = localStorage.getItem("username");
const userName = document.querySelector(".username");
userName.innerHTML = username;

const editButton = document.querySelector(".edit");

const cancelButton = document.querySelector(".cancel");

const price = document.querySelector(".price");

const recNumber = document.querySelector(".mobile");

const createdDate = document.querySelector(".date");

const pickLocation = document.querySelector(".location");

const destination = document.querySelector(".destination");
  
const signOutButton = document.querySelector(".sign-out");

const url = "http://localhost:3000";

const token = localStorage.getItem("token");

const orderId = localStorage.getItem("orderId");

const status = localStorage.getItem("status");

cancelButton.setAttribute("id", `${orderId}`);

editButton.setAttribute("id", `${orderId}`);


// Event Listeners
signOutButton.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.href = "index.html";
});

editButton.addEventListener("click", ()=>{
    if(status === "pending"){
    window.location.href ="changedestination.html";
    }
    else{
        toastr.info("Sorry! This order has already been delivered, else, you can no longer change its destination");
        return;
		editButton.classList.add("d-none");
    }
})

cancelButton.addEventListener("click", ()=>{
    if(status === "pending"){
    window.location.href ="cancelorder.html";
    }
    else{
        toastr.info("Sorry! This order has already been delivered");
        return;
		cancelButton.classList.add("d-none");
    }
})

// Functions

fetch(`${url}/get-order/search?username=${username}&id=${orderId}`, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(res=> res.json())
.then(res=>{
    if(res.message=== "Order found successfully"){
        price.innerHTML = res.order[0].price;
        pickLocation.innerHTML = res.order[0].location;
        destination.innerHTML = res.order[0].destination;
        recNumber.innerHTML = res.order[0].recmobile;
		createdDate.innerHTML = res.order[0].date;
    }
    
})
.catch(err=>{
    console.log("Error", err);
});