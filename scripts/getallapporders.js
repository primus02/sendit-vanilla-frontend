// Selectors
const username = localStorage.getItem("username");
const userName = document.querySelector(".username");
userName.innerHTML = username;

const searchName = document.querySelector(".search");

const ordersContainer = document.querySelector(".body");

const ordersHolder = document.querySelector(".orders-holder");

const locationModal = document.querySelector(".location-modal");

const statusModal = document.querySelector(".status-modal");

const newLocation = document.querySelector(".new-location");

const selectStatus = document.querySelector(".select");

const newLocationButton = document.querySelector(".location-modal button");

const submitStatusButton = document.querySelector(".status-modal button");


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
	
	 if(res.message ==="jwt expired"){
		alert("Session expired, kidnly re-login to access this page");
		
		localStorage.clear();
		window.location.href = "adminsignin.html";
		  }
	
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
            
            window.location.href = "apporderdetails.html";
        });
    });
		
       const statusButtons = document.querySelectorAll(".status");
        
        statusButtons.forEach((button)=>{ button.addEventListener("click", ()=>{
            const orderId = button.getAttribute("id");
			
			statusModal.classList.remove("d-none");
			
			document.querySelectorAll(".body button").forEach((button)=>{
				button.setAttribute("disabled", "");
			});
			
			submitStatusButton.addEventListener("click",()=>{
				
			if(selectStatus.value ===""){
			toastr.info("You have not selected a new status for this order");
				return;
			}
			else{
            
			 fetch(`${url}/change-status/${orderId}`, {
             method: "PATCH",
             headers: {
             "Content-Type": "application/json", 
             Authorization: `Bearer ${token}`
            },
           body: JSON.stringify({
           status: selectStatus.value
          })
})
.then(res=> res.json())
.then(res=>{
				 
	if(res.message ==="jwt expired"){
		alert("Session expired, kidnly re-login to access this page");
		
		localStorage.clear();
		window.location.href = "adminsignin.html";
		  }			 
				 
    if(res.message=== `Order ${orderId} updated successfully`){
		
       toastr.success("Success, order's new status updated!");
        
		setTimeout(()=>{ window.location.reload();}, 2000);
        
    }
    
})
.catch(err=>{
    console.log("Error", err);
});
	}     			
			});
			

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
				
			if(newLocation.value !==""){
					
			fetch(`${url}/change-location/${orderId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json", 
         Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
        preslocation: newLocation.value
    })
})
.then(res=> res.json())
.then(res=>{
				
	if(res.message ==="jwt expired"){
		alert("Session expired, kidnly re-login to access this page");
		
		localStorage.clear();
		window.location.href = "adminsignin.html";
		  }
				
    if(res.message=== `Order ${orderId} updated successfully`){
       toastr.success("Success, order's present location updated!");
        
		setTimeout(()=>{  window.location.reload();}, 2000);
       
    }
    
})
.catch(err=>{
    console.log("Error", err);
});
			}
				else{
				    toastr.info("You have not entered any new location!");
					
					return;
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
	
