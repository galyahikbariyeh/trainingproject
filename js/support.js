// JavaScript for the contact form submission
/*document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const problem = document.getElementById('problem').value;
            
            // Validate inputs
            if (!email || !subject || !problem) {
                alert('جميع الحقول مطلوبة');
                return;
            }
            
            try {
                // Send the data to the server
                const response = await fetch('http://localhost:5050/api/tickets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, subject, problem })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // Show success message
                    alert(data.message);
                    // Reset form
                    contactForm.reset();
                } else {
                    // Show error message
                    alert(data.message || 'حدث خطأ أثناء إرسال المشكلة');
                }
            } catch (error) {
               // console.error('Error:', error);
                alert('حدث خطأ في الاتصال بالخادم');
            }
        });
    }
});*/
//update 19/5/2025

var contactForm = document.getElementById('contactForm')
var API_URL='http://127.0.0.1:5050/api/createTicket'
contactForm.addEventListener('submit',async function (e) {
    e.preventDefault()
    var email=document.getElementById('email').value
    var subject=document.getElementById('subject').value
     var problem=document.getElementById('problem').value
    var ticket={email,subject,problem}
    console.log(ticket)

    var response= await fetch(API_URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(ticket),
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.message=='Ticket created successfully'){
            alert('Ticket created successfully')
            sessionStorage.setItem('authToken',data.token)
             window.location.href='project.html'
        }
        else{
            alert('User not found')
        }
    })
    console.log(response)
    
})




