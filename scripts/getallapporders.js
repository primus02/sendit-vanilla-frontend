// Selectors
const username = localStorage.getItem("username");
const userName = document.querySelector(".username");
userName.innerHTML = username;

const searchName = document.querySelector(".search");

const ordersContainer = document.querySelector(".body");

const ordersHolder = document.querySelector(".orders-holder");

const signOutButton = document.querySelector(".sign-out");


// Event Listeners
signOutButton.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.href = "index.html";
});

ordersContainer.addEventListener("keyup",(e)=>{
			let filter = e.target.value;
			
			filterByUsername(filter);
});


const url = "https://sendit.herokuapp.com";

const token = localStorage.getItem("token");


fetch(`${url}/get-all-orders`, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(res=> res.json())
.then(res=>{
    if(res.message=== "No order found"){
        ordersContainer.innerHTML = "No order yet";
    }
    else{
        
        res.orders.forEach(order=> {
            
       let text =`
                 <div class="orders">  
                    <p class="order"><span class="order-username">${order.username}</span><button class="details-btn" id=${order._id} status=${order.status}>Details</button><button class="status" id=${order._id} status=${order.status}>Status: <span class="status-state" >${order.status}</span></button><button class="location" id=${order._id}>Pres-Location: <span class="present-location" >${order.preslocation}</span></button></p> 
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
            
            window.location.href = "apporderdetails.html";
        });
    });
		
       const statusButtons = document.querySelectorAll(".status");
        
        statusButtons.forEach((button)=>{ button.addEventListener("click", ()=>{
            const orderId = button.getAttribute("id");
            localStorage.setItem("orderId", orderId);
            
            const status = button.getAttribute("status");
            localStorage.setItem("status", status);
            
            window.location.href = "changestatus.html";
        });
    });
		
		const locationButtons = document.querySelectorAll(".location");
        
        locationButtons.forEach((button)=>{ button.addEventListener("click", ()=>{
            const orderId = button.getAttribute("id");
            localStorage.setItem("orderId", orderId);
            
            window.location.href = "changelocation.html";
        });
    });

    }
})
.catch(err=>{
    console.log("Error", err);
});



function filterByUsername(filter){
	const orderUsernames = document.querySelectorAll(".order-username");

	orderUsernames.forEach((order)=>{
		let searchInfo = order.innerHTML;
		
		if(searchInfo.includes(filter)){
		 console.log(searchInfo);
			order.parentElement.style.display ="block";
		}
		else{
			order.parentElement.style.display = "none";
		}
	});
	     
}
	
