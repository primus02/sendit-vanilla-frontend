// Selectors
const username = localStorage.getItem("username");
const userName = document.querySelector(".username");
userName.innerHTML = username;

const price = document.querySelector(".price");

const createdDate1 = document.querySelector(".date");

const pickLocation1 = document.querySelector(".pick-location");

const recNumber1 = document.querySelector(".mobile");

const destination1 = document.querySelector(".destination");
  

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
        pickLocation1.innerHTML = res.order.location;
        destination1.innerHTML = res.order.destination;
	recNumber1.innerHTML = res.order.recmobile;
        createdDate1.innerHTML = res.order.date;
    }
    
})
.catch(err=>{
    console.log("Error", err);
});
