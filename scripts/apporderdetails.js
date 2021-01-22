// Selectors
const username = localStorage.getItem("username");
const userName = document.querySelector(".username");
userName.innerHTML = username;

const price = document.querySelector(".price");

const createdDate = document.querySelector(".date");

const pickLocation = document.querySelector(".pick-location");

const recNumber = document.querySelector(".mobile");

const destination = document.querySelector(".destination");
  

const signOutButton = document.querySelector(".sign-out");

signOutButton.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.href = "index.html";
});

const url = "https://sendit.herokuapp.com";

const token = localStorage.getItem("token");

const orderId = localStorage.getItem("orderId");

// Functions

fetch(`${url}/get-an-order/${orderId}`, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(res=> res.json())
.then(res=>{
    if(res.message=== "Order found successfully"){
        price.innerHTML = res.order.price;
        pickLocation.innerHTML = res.order.location;
        destination.innerHTML = res.order.destination;
	recNumber.innerHTML = res.order.recmobile;
        createdDate.innerHTML = res.order.date;
    }
    
})
.catch(err=>{
    console.log("Error", err);
});
