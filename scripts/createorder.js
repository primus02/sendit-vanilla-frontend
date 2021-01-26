// Selectors
const inputPrice = document.querySelector(".input-price");
const inputWeight = document.querySelector(".input-wt");
const inputLocation = document.querySelector(".input-location");

const signOutButton = document.querySelector(".sign-out");

const inputDestination = document.querySelector(".input-dest");

const inputMobile = document.querySelector(".input-mobile");

const submitButton = document.querySelector(".submit-order");

const myForm = document.querySelector("#form");

const token = localStorage.getItem("token");
const userName = localStorage.getItem("username");

document.querySelector(".username").innerHTML= userName;

const url = "https://sendit.herokuapp.com";

// Event Listeners
inputWeight.addEventListener("keyup", calculatePrice);

signOutButton.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.href = "index.html";
});

myForm.addEventListener("submit", submitOrder);

// Functions
function calculatePrice(){
    inputPrice.value = Number.parseFloat(inputWeight.value) * 10;
}

function submitOrder(e){
    e.preventDefault();
	
      const regex= /^[0-9]+$/;
	
	if(!inputWeight.value.match(regex)){
		toastr.info("Please enter a valid figure in the weight field (do not include any letter)");
		inputWeight.focus();
		return;
	}
	
    else{
        fetch(`${url}/create-order`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                username: userName,
                location: inputLocation.value,
                destination: inputDestination.value,
				recmobile: inputMobile.value,
                weight: inputWeight.value,
                price: inputPrice.value
            })
        })
        .then(res=> res.json())
        .then(res=>{
		
	 if(res.message ==="jwt expired"){
			  alert("Session expired, kidnly re-login to access this page");
			  
			  localStorage.clear();
			  window.location.href = "index.html";
	   }	
	
            if(res.message=== "Order created successfully"){
				
                toastr.success("Order created successfully!");
				
				setTimeout(()=>{ window.location.href ="getallorders.html";}, 2000);
				
            }
        })
        .catch(err=>{
            console.log("Error", err);
        });
    }
}
