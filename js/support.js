// JavaScript for the contact form submission
document.addEventListener('DOMContentLoaded', function() {
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
});






