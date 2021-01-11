// Selectors
const username = localStorage.getItem("username");
const userName = document.querySelector(".username");
userName.innerHTML = username;

const ordersHolder = document.querySelector(".orders-holder");

const signOutButton = document.querySelector(".sign-out");

const url = "https://sendit.herokuapp.com/";

const token = localStorage.getItem("token");

//Event Listeners
signOutButton.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.href = "index.html";
});



// Functions
fetch(`${url}/get-orders/search?username=${username}`, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(res=> res.json())
.then(res=>{
    if(res.message=== "No order found"){
        ordersContainer.innerHTML = "You have no order yet";
    }
    else{
        
        res.orders.forEach(order=> {
            
       let text =`
                 <div class="orders">  
                    <p class="order">Order<button class="details-btn" id=${order._id} status=${order.status}>Details</button><button class="status">Status: <span class="status-state">${order.status}</span></button><button class="location">Pres-Location: <span class="present-location">${order.preslocation}</span></button></p> 
                 </div>
                 `; 
             ordersHolder.insertAdjacentHTML("afterBegin", text);
        });
        
        const statusState = document.querySelectorAll(".status-state");
        
        statusState.forEach(status=>{
        if(status.innerHTML === "pending"){
        status.style.color = "red";
    }
        });
        
        
       const detailsButton = document.querySelectorAll(".details-btn");
        
        detailsButton.forEach((button)=>{ button.addEventListener("click", ()=>{
            const orderId = button.getAttribute("id");
            localStorage.setItem("orderId", orderId);
            
            const status = button.getAttribute("status");
            localStorage.setItem("status", status);
            
            window.location.href = "orderdetails.html";
        });
    });
    }
})
.catch(err=>{
    console.log("Error", err);
});

