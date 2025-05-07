var loginForm = document.getElementById('loginForm')
var API_URL='http://127.0.0.1:5050/api/login'
loginForm.addEventListener('submit',async function (e) {
    e.preventDefault()
    var email=document.getElementById('form3Example3').value
    var password=document.getElementById('form3Example4').value
    var user={email,password}
    console.log(user)

    var response= await fetch(API_URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user),
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.message=='User logged in successfully'){
            alert('User logged in successfully')
            sessionStorage.setItem('authToken',data.token)
             window.location.href='project.html'
        }
        else{
            alert('User not found')
        }
    })
    console.log(response)
    
})



 