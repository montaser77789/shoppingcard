let username =document.getElementById("username");
let email =document.getElementById("email");
let pasword =document.getElementById("pasword");
let Signup =document.getElementById("Sign-Up");

Signup.addEventListener("click",function(e){
    e.preventDefault()
    if(username.value==="" || email.value==="" ||pasword.value==="" ){
        alert("Please fill Data")
    }else{
        localStorage.setItem("username",username.value)
        localStorage.setItem("email",email.value)
        localStorage.setItem("password",pasword.value)
        setTimeout(() => {
            window.location="login.html"
            
        }, 1500);


    }

})


