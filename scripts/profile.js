// Selectors
const url = "https://sendit.herokuapp.com";

const username = localStorage.getItem("username");

const name = localStorage.getItem("name");

const email = localStorage.getItem("email");

const token = localStorage.getItem("token");

const mobile = localStorage.getItem("mobile");

const address = localStorage.getItem("address");

let usernames = document.querySelectorAll(".username");
  usernames.forEach((user)=>{
      user.innerHTML = username;
  });

document.querySelector(".name").innerHTML = name;
document.querySelector(".email").innerHTML = email;
document.querySelector(".mobile").innerHTML = mobile;
document.querySelector(".address").innerHTML = address;

const signOutButton = document.querySelector(".sign-out");


// Event Listeners
signOutButton.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.href = "index.html";
});

// Functions
fetch(`${url}/get-orders/search?username=${username}`, {
    
    method: "GET",
    headers: {
        Authorization: `Authorization ${token}` 
    }
})
.then(res=>res.json())
.then(res=>{
  
  if(res.message.message ==="jwt expired"){
		 alert("Session expired, kidnly re-login to access this page");
			 
		    localStorage.clear();
			window.location.href = "index.html";
		  }
  
    if(res.message === "No order found"){
       document.querySelector(".total-num").innerHTML ="No order yet";
    }
    else{
         document.querySelector(".total-num").innerHTML = res.ordersCount;
        
        let completedCount = res.orders.filter(order => order.status === "delivered").length;
        
         document.querySelector(".total-completed").innerHTML = completedCount;
        
          let inTransitCount = res.orders.filter(order=> order.status === "pending").length;
        
         document.querySelector(".total-transit").innerHTML = inTransitCount;
    }
})
.catch(err=>{
    console.log("Error", err);
});
