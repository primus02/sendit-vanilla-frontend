// Selectors
const username= document.querySelector(".username");

let savedUsername = localStorage.getItem("username");
username.innerHTML = savedUsername;

const signOutButton = document.querySelector(".sign-out");


// Event Listeners
signOutButton.addEventListener("click", ()=>{
    localStorage.clear();
    window.location.href = "index.html";
});