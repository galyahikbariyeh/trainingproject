var registerForm = document.getElementById('registerForm')
var API_URL='http://127.0.0.1:5050/api/createUser'
registerForm.addEventListener('submit',async function (e) {
    e.preventDefault()
    var name=document.getElementById('form3Example1cg').value
    var email=document.getElementById('form3Example3cg').value
    var password=document.getElementById('form3Example4cg').value
    var user={name,email,password}
    console.log(user)

    var response= await fetch(API_URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user),
    }).then(res=>res.json())
    .then(data=>{
        console.log(data.message)
        if(data.message=='User register in successfully'){
            alert('User register in successfully')
           // 
            window.location.href='login.html'
        }
      
    })
    console.log(response)
    
})


