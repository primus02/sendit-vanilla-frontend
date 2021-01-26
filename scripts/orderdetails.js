// Selectors
const username = localStorage.getItem("username");
const userName = document.querySelector(".username");
userName.innerHTML = username;

const editButton = document.querySelector(".edit");

const cancelButton = document.querySelector(".cancel");

const weight = document.querySelector(".weight");

const price = document.querySelector(".price");

const recNumber = document.querySelector(".mobile");

const createdDate = document.querySelector(".date");

const pickLocation = document.querySelector(".pick-location");

const destination = document.querySelector(".destination");
  
const signOutButton = document.querySelector(".sign-out");

const destinationModal = document.querySelector(".dest-modal");

const destinationForm = document.querySelector(".dest-form");

const newDestination = document.querySelector(".new-destination");

const newPickLocation = document.querySelector(".new-picklocation");

const newWeight = document.querySelector(".new-weight");

const newPrice = document.querySelector(".new-price");

const newMobile = document.querySelector(".new-mobile");

const newDestButton = document.querySelector(".dest-modal button");

const orderInfo = document.querySelector(".order-info p");

const url = "https://sendit.herokuapp.com";

const token = localStorage.getItem("token");

const orderId = localStorage.getItem("orderId");

const status = localStorage.getItem("status");

const regex= /^[0-9]+$/;


// Event Listeners
signOutButton.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.href = "index.html";
});


function hideButtons(){
	if(status === "delivered"){
		orderInfo.innerHTML ="Status: Delivered";
		orderInfo.style.color = "green";
		orderInfo.style.fontWeight= "900";
	}
}hideButtons();


editButton.addEventListener("click", ()=>{

		destinationModal.classList.remove("d-none");
		
			editButton.setAttribute("disabled", "");
			cancelButton.setAttribute("disabled", "");
			
			newWeight.addEventListener("keyup", ()=>{
				newPrice.value = Number.parseFloat(newWeight.value) * 10;
			})			
		
		destinationForm.addEventListener("submit", (e)=>{
			e.preventDefault();
			

		if(!newWeight.value.match(regex)){
		toastr.info("Please enter a valid figure in the weight field (do not include any letter)");
			
		newWeight.focus();

		return;
	   }
		else{
							
		fetch(`${url}/edit-order/search?username=${username}&id=${orderId}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json", 
         Authorization: `Bearer ${token}`
       },
       body: JSON.stringify({
		username,
		location: newPickLocation.value,
		price: newPrice.value,
		weight: newWeight.value,
        destination: newDestination.value,
		recmobile: newMobile.value,
		date: Date.now()
      })
})
.then(res=> res.json())
.then(res=>{
			
	 if(res.message.message ==="jwt expired"){
		alert("Session expired, kidnly re-login to access this page");
			
		 localStorage.clear();
		 window.location.href = "index.html";
		  }		
			
    if(res.message=== `Order ${orderId} updated successfully`){
		
       toastr.success("Success, your order's new information updated");
        
		setTimeout(()=>{ window.location.reload()}, 2000);
        
    }
    
})
.catch(err=>{
    console.log("Error", err);
});
}
		
});

});

cancelButton.addEventListener("click", ()=>{
  
     let decision= confirm("Are you sure you want to cancel this order? This cannot be reversed! Click 'OK' to continue");
		if(decision){
			fetch(`${url}/cancel-order/search?username=${username}&id=${orderId}`, {
            method: "DELETE",
            headers: {
		   "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
    }
})
.then(res=> res.json())
.then(res=> {
				
  	if(res.message.message ==="jwt expired"){
	  alert("Session expired, kidnly re-login to access this page");
	
	localStorage.clear();
	 window.location.href = "index.html";
		  }
				
    if(res.success){
		
       toastr.success("Success, your order has been cancelled");
        
		setTimeout(()=>{ window.location.href = "getallorders.html";}, 2000);
        
    }
})
.catch(err=> {
		console.log("Error", err);
	});
		}
		else{
			return;
		}
});

// Functions

fetch(`${url}/get-order/search?username=${username}&id=${orderId}`, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(res=> res.json())
.then(res=>{
	
	 if(res.message.message ==="jwt expired"){
	   alert("Session expired, kidnly re-login to access this page");
		
		localStorage.clear();
		window.location.href = "index.html";
		  }
	
    if(res.message=== "Order found successfully"){
		weight.innerHTML= res.order[0].weight;
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
