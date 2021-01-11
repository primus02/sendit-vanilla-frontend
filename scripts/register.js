// Selectors

const myForm = document.getElementById("myform")
const name = document.getElementsByClassName("input-name")[0];
const userName = document.getElementsByClassName("input-username")[0];
const email = document.getElementsByClassName("input-email")[0];
const password = document.getElementsByClassName("input-password")[0];

const url = "https://sendit.herokuapp.com";

const image = document.querySelector("img");

let counter = 0;
const images= ["./images/delivery1.jpg", "./images/delivery2.jpg", "./images/delivery-bus.jpg", "./images/delivery parcel.jpg", "./images/delivery3.jpg"];

setInterval(()=>{
	if(counter===images.length){
		counter=0;
	}
	else if(counter === 0){
		counter = images.length-1
	}
	image.src = images[counter];
	counter++
}, 5000);

// Functions

  const submitForm = (event)=> {
      event.preventDefault()

  fetch(`${url}/signup`, {
    // mode: "no-cors",
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    // credentials: "include",
    body: JSON.stringify({
    name: name.value,
      username: userName.value.toLowerCase(),
      email: email.value,
      password: password.value,
      
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if(res.message == "Mail exists"){
        toastr.error('Mail exists!')

       email.focus()
       return false
      }
	  else if(res.message == "Username already exists"){
        toastr.error('Username exists!')

       userName.focus()
       return false
      }
      else if (res.data) {
              localStorage.setItem("name", res.data.name);
              localStorage.setItem("userId", res.data._id);
		  
		  toastr.success('Account successfully created!');
		  
		  setTimeout(()=>{window.location.href = "index.html";},2000);
              
		  
            } else if (res.error) {
              console.log("error", res.err);
             toastr.error(res.err)
            }
          })
    .catch((err) => console.log("err occured", err));
};


myForm.addEventListener("submit", submitForm)
