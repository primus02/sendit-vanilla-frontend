// Selectors
const username = localStorage.getItem("username");
const userName = document.querySelector(".username");
userName.innerHTML = username;

const searchName = document.querySelector(".search");

const ordersContainer = document.querySelector(".body");

const ordersHolder = document.querySelector(".orders-holder");

const locationModal = document.querySelector(".location-modal");

const newLocation = document.querySelector(".new-location");

const newLocationButton = document.querySelector(".location-modal button");


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


const url = "http://localhost:3000";

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
			
	   let newStatus = prompt("Kindly enter the new status of this order");
			
	  if(newStatus){
            
   fetch(`${url}/change-status/${orderId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json", 
         Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
        status: newStatus.toLowerCase()
    })
})
.then(res=> res.json())
.then(res=>{
    if(res.message=== `Order ${orderId} updated successfully`){
		
       toastr.success("Success, order's new status updated!");
        
       setTimeout(()=>{ window.location.href ="getallapporders.html";}, 2000);
        
    }
    
})
.catch(err=>{
    console.log("Error", err);
});
	}
     else{
		 return;
	 }       
        });
    });
		
		const locationButtons = document.querySelectorAll(".location");
        
        locationButtons.forEach((button)=>{ button.addEventListener("click", ()=>{
            const orderId = button.getAttribute("id");
			
			locationModal.classList.remove("d-none");
			
			document.querySelectorAll(".body button").forEach((button)=>{
				button.setAttribute("disabled", "");
			});
			
           
			newLocationButton.addEventListener("click", ()=>{
				
			const newLocationValue = newLocation.value;
				
			if(newLocationValue){
		      locationModal.classList.add("d-none");
					
		   fetch(`${url}/change-location/${orderId}`, {
                      method: "PATCH",
                      headers: {
                     "Content-Type": "application/json", 
                      Authorization: `Bearer ${token}`
                     },
                      body: JSON.stringify({
                      preslocation: newLocationValue
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
				else{
					locationModal.classList.add("d-none");
					
					window.location.reload();
				}
		
			});
				
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
			order.parentElement.style.display ="block";
		}
		else{
			order.parentElement.style.display = "none";
		}
	});
	     
}
	
