// Selectors
const inputEmail= document.querySelector(".email");

const inputPassword= document.querySelector(".password");

const signinButton= document.querySelector(".sign-in-btn");

const image = document.querySelector("img");

const url = "https://sendit.herokuapp.com";


let counter = 0;
const images= ["./images/delivery1.jpg", "./images/delivery2.jpg", "./images/delivery-bus.jpg", "./images/delivery parcel.jpg", "./images/delivery3.jpg"];

setInterval(()=>{
	if(counter===images.length){
		counter=0;
	}
	
	image.src = images[counter];
	counter++
}, 5000);

// Event Listeners
signinButton.addEventListener("click", signUserIn);

//Functions
function signUserIn(e){
    e.preventDefault();
    if(inputEmail.value ==="" || inputPassword.value ===""){
         alert("Kindly provide the appropraite field(s)");
        return;
    }
    else{
    fetch(`${url}/signin`, {
        
        method: "POST",
        headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: inputEmail.value,
            password: inputPassword.value
        })
    })
        .then(res=>res.json())
        .then(res=>{
        
        if(res.message=== "Email does not exist" || res.message=== "Auth failed"){
            toastr.error("inavlid email / password!");
            return false;
        }
        else if(res.token){
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", res.data[0].username);
            localStorage.setItem("name", res.data[0].name);
            localStorage.setItem("email", res.data[0].email);
			localStorage.setItem("mobile", res.data[0].mobile);
			localStorage.setItem("address", res.data[0].address);
			
			toastr.success("Sign in successful!");
			
            setTimeout(()=>{
				window.location.href = "./user.html";
			},2000);  
        }
    })
        .catch(err=>{
        console.log("Error: ", err);
    });
    }
}

