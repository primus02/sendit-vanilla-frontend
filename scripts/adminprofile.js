
// Selectors
const url = "https://sendit.herokuapp.com";

const username = localStorage.getItem("username");

const token = localStorage.getItem("token");

let userName = document.querySelector(".username");
      userName.innerHTML = username;

const signOutButton = document.querySelector(".sign-out");


//Event Listeners
signOutButton.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.href = "index.html";
});

// Functions
fetch(`${url}/get-all-orders`, {
    
    method: "GET",
    headers: {
        Authorization: `Authorization ${token}` 
    }
})
.then(res=>res.json())
.then(res=>{
      
      if(res.message ==="jwt expired"){
		alert("Session expired, kidnly re-login to access this page");
		
		 localStorage.clear();
		window.location.href = "adminsignin.html";
		 }
      
    if(res.message === "No order found"){
       document.querySelector(".total-num").innerHTML ="No order yet";
    }
    else{
         document.querySelector(".total-num").innerHTML = res.OrdersCount;
        
        let completedCount = res.orders.filter(order => order.status === "delivered").length;
        
         document.querySelector(".total-completed").innerHTML = completedCount;
        
          let inTransitCount = res.orders.filter(order=> order.status === "pending").length;
        
         document.querySelector(".total-transit").innerHTML = inTransitCount;
    }
})
.catch(err=>{
    console.log("Error", err);
});
