let username =document.getElementById("username");
let pasword =document.getElementById("pasword");
let Signin =document.getElementById("Sign-In");

let getusername = localStorage.getItem("username");
let getpasword = localStorage.getItem("password")

Signin.addEventListener("click" ,function(e){
    e.preventDefault()
    if(username.value===""  ||Signin.value==="" ){
        alert("Please fill Data")
    }else{
        if(getusername=== username.value.trim()  && getpasword ===pasword.value ){
            setTimeout(() =>{
                window.location="index.html"
            },1500)
        }else(
            alert("username or pasword is wrong ")
                    )
    }

})