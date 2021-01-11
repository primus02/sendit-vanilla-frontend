// Selectors
const inputPrice = document.querySelector(".input-price");
const inputWeight = document.querySelector(".input-wt");
const inputLocation = document.querySelector(".input-location");

const signOutButton = document.querySelector(".sign-out");

const inputDestination = document.querySelector(".input-dest");

const inputMobile = document.querySelector(".input-mobile");

const submitButton = document.querySelector(".submit-order");

const token = localStorage.getItem("token");
const userName = localStorage.getItem("username");

document.querySelector(".username").innerHTML= userName;

const url = "https://sendit.herokuapp.com/";

// Event Listeners
inputWeight.addEventListener("keyup", calculatePrice);

signOutButton.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.href = "index.html";
});

submitButton.addEventListener("click", submitOrder);

// Functions
function calculatePrice(){
    inputPrice.value = Number.parseFloat(inputWeight.value) * 10;
}

function submitOrder(e){
    e.preventDefault();
	
    if(inputLocation.value ==="" || inputDestination.value ==="" || inputPrice.value ==="" || inputWeight.value ==="" || inputMobile.value===""){
		
        toastr.warning("Kindly provide all necessary fields");
        return;
    }
   if(inputMobile.value.length < 11 || inputMobile.value.length >11){
		
		toastr.error("Mobile must be 11 digits");
		inputMobile.focus();
		return false;
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
