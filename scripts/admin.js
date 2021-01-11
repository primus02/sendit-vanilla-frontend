// Selectors
const inputUsername= document.querySelector(".admin-user");

const inputPassword= document.querySelector(".password");

const signinButton= document.querySelector(".admin-signin");

const url = "https://sendit.herokuapp.com/";

// Event Listeners
signinButton.addEventListener("click", signAdminIn);

//Functions
function signAdminIn(){
    if(inputUsername.value ==="" || inputPassword.value ===""){
         toastr.warning("Kindly provide the appropriate field(s)");
        return;
    }
    else{
    fetch(`${url}/admin/signin`, {
        
        method: "POST",
        headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: inputUsername.value,
            password: inputPassword.value
        })
    })
        .then(res=>res.json())
        .then(res=>{
        
        if(res.message=== "Username invalid"){
            toastr.error("Kindly provide a valid username!");
			inputUsername.focus();
            return;
        }
        else if(res.message=== "Password invalid" || res.message=== "Auth failed"){
            toastr.error("Kindly provide a valid password!");
            inputPassword.focus();
            return;
        }
        else if(res.token){
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", res.data[0].username);
			
			toastr.success("Successfully signed in");
           
			setTimeout(()=>{ window.location.href = "./admin.html"; }, 2000);
            
        }
    })
        .catch(err=>{
        console.log("Error", err);
    });
    }
}

