// let signupbtn = document.querySelector(".sign-up-btn");
// signupbtn.addEventListener("click", function(e){

// });

let email = document.querySelector(".login-email");
let password = document.querySelector(".login-password");
let signinbtn = document.querySelector(".login-btn");
signinbtn.addEventListener("click", function(){
    if(email.value == "" && password.value == ""){
        alert("Please Enter a Valid Email and Password!");
    }
    else if(email.value == ""){
        alert("Please Enter a Valid Email!");
    }
    else if(password.value == ""){
        alert("Please Enter a Valid Password!");
    }
    else{
        if(!validateEmail(email.value)){
            alert("Please Enter a Valid Email Address");
        }
        else{
            
        }
    }
});

function validateEmail(email){
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}



