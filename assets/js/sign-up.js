let name = document.querySelector(".sign-up-name");
let email = document.querySelector(".sign-up-email");
let password = document.querySelector(".sign-up-password");
let confirmedPassword = document.querySelector(".sign-up-confirm-password");
let signupbtn = document.querySelector(".sign-up-btn");

signupbtn.addEventListener("click", function(){
    if(name.value == "" || email.value == "" || password.value == "" || confirmedPassword.value == ""){
        alert("All fields are mandatory!");
    }
    else if(!validateEmail(email.value)){
        alert("Please Enter a Valid Email Address");
    }
    else if(password.value !== confirmedPassword.value){
        alert("Password does not match");
    }
    else{
        
    }
});

function validateEmail(email){
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}