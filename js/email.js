document.addEventListener('DOMContentLoaded', () => {

    const emailInput    = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signupBtn     = document.querySelector('.ba');

    if (!emailInput || !passwordInput || !signupBtn) {
        console.warn('Email page: required elements missing');
        notify('error', 'System Error', 'Required elements missing', 4000);
        return;
    }

    // Focus email on page load
    emailInput.focus();

    signupBtn.addEventListener('click', () => {

        const email    = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email) {
            console.warn('Email missing');
            notify('error', 'Email Missing', 'Please enter your email address', 3000);
            emailInput.focus();
            return;
        }

        if (!isValidEmail(email)) {
            console.warn('Invalid email format');
            notify('warning', 'Invalid Email', 'Please enter a valid email address', 3000);
            emailInput.focus();
            return;
        }

        if (!password) {
            console.warn('Password missing');
            notify('warning', 'Password Missing', 'Please enter your password', 3000);
            passwordInput.focus();
            return;
        }

        // check password length live while typing and only allow submission when above 8 chars else notifyuser
        // listen for typing in password field

        passwordInput.addEventListener('input', () => {
            if (passwordInput.value.length < 8) {
                console.warn('Password too short');
                notify('warning', 'Weak Password', 'Password must be at least 8 characters', 3000);
                
                passwordInput.focus();
                return;
            }
        });

       // check final length on submission
        if (password.length < 8) {
            console.warn('Password too short on submission');   
            notify('warning', 'Weak Password', 'Password must be at least 8 characters', 3000);
            passwordInput.focus();
            return;
        }else {


            // Convert to HEX before saving
        const hexEmail    = toHex(email.toLowerCase());
        const hexPassword = toHex(password);

        localStorage.setItem('002', hexEmail);
        localStorage.setItem('003', hexPassword);
        localStorage.setItem('signeduplevel', 'secondary');

        console.log('Email and password saved');
        notify('success', 'Email and password saved!', 'You\'re phenomenal!', 3000);

        // Redirect after 0.5 seconds
        setTimeout(() => {
            window.location.href = 'almost.html';
        }, 500);
            
        }



        
    });
});

/**
 * Email validation if not notify
 */
function isValidEmail(email) {    
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);


}



/**
 * Convert string to HEX
 */
function toHex(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16);
    }
    return hex;
}
