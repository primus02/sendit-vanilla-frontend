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

const url = "https://sendit.herokuapp.com";

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
    let newDestination =prompt("Kindly provide the new destination for this order");
		
		if(newDestination){
			
		fetch(`${url}/change-destination/search?username=${username}&id=${orderId}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json", 
         Authorization: `Bearer ${token}`
       },
       body: JSON.stringify({
        destination: newDestination
      })
})
.then(res=> res.json())
.then(res=>{
    if(res.message=== `Order ${orderId} updated successfully`){
		
       toastr.success("Success, your order's new destination updated");
        
		setTimeout(()=>{ window.location.href ="getallorders.html";}, 2000);
        
    }
    
})
.catch(err=>{
    console.log("Error", err);
});
		}
		else{
			return;
		}
	}
    else{
        toastr.info("Sorry! This order has already been delivered, else, you can no longer change its destination");
        return;
    }
});

cancelButton.addEventListener("click", ()=>{
    if(status === "pending"){
     let decision= confirm("Are you sure you want to cancel this order?");
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
    }
    else{
        toastr.info("Sorry! This order has already been delivered");
        return;
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
