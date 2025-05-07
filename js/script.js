document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.querySelector('.card');
    const payButton = paymentForm.querySelector('.btn-primary button');
    
    // Prevent the default anchor behavior
    payButton.addEventListener('click', function(e) {
        e.preventDefault();
        processPayment();
    });
    
    // Add input masking for card number
    const cardNumberInput = paymentForm.querySelector('input[placeholder="1234 5678 435678"]');
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, ''); // Remove all spaces
        if (/\D/.test(value)) { // If contains non-digits
            value = value.replace(/\D/g, ''); // Remove non-digits
        }
        
        // Add space after every 4 digits
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue.trim();
    });
    
    // Add input masking for expiry date
    const expiryInput = paymentForm.querySelector('input[placeholder="MM/YYYY"]');
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        
        if (value.length > 7) {
            value = value.substring(0, 7);
        }
        
        e.target.value = value;
    });
    
    function processPayment() {
        // Get form values
        const cardNumber = cardNumberInput.value.replace(/\s+/g, '');
        const cardName = paymentForm.querySelector('input[placeholder="Enter your name"]').value.trim();
        const expiry = expiryInput.value;
        const cvv = paymentForm.querySelector('input[placeholder="***"]').value;
        const amount = paymentForm.querySelector('input[placeholder="JOD"]').value;
        
        // Validate inputs
        if (!validateCardNumber(cardNumber)) {
            alert('Please enter a valid card number (16 digits)');
            return;
        }
        
        if (!cardName) {
            alert('Please enter the name on card');
            return;
        }
        
        if (!validateExpiry(expiry)) {
            alert('Please enter a valid expiry date (MM/YYYY)');
            return;
        }
        
        if (!validateCVV(cvv)) {
            alert('Please enter a valid CVV (3 or 4 digits)');
            return;
        }
        
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        
        // Simulate payment processing
        simulatePayment(cardNumber, cardName, expiry, cvv, amount);
    }
    
    function validateCardNumber(number) {
        // Simple validation - check if it's 16 digits
        return /^\d{16}$/.test(number);
    }
    
    function validateExpiry(expiry) {
        // Check format MM/YYYY
        if (!/^\d{2}\/\d{4}$/.test(expiry)) return false;
        
        const [month, year] = expiry.split('/').map(Number);
        if (month < 1 || month > 12) return false;
        
        // Check if date is in the future
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        
        if (year < currentYear) return false;
        if (year === currentYear && month < currentMonth) return false;
        
        return true;
    }
    
    function validateCVV(cvv) {
        // CVV can be 3 or 4 digits
        return /^\d{3,4}$/.test(cvv);
    }
    
    function simulatePayment(cardNumber, cardName, expiry, cvv, amount) {
        // Show loading state
        payButton.disabled = true;
        payButton.innerHTML = 'Processing... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
        
        // Simulate API call with timeout
        setTimeout(function() {
            // Randomly determine success (80% chance) for demo purposes
            const isSuccess = Math.random() < 0.8;
            
            if (isSuccess) {
                // Redirect to success page
                window.location.href = '/html/paysuss.html';
            } else {
                // Show error
                alert('Payment failed. Please check your details and try again.');
                payButton.disabled = false;
                payButton.innerHTML = 'Pay <span class="fas fa-arrow-right"></span>';
            }
        }, 2000);
    }
});