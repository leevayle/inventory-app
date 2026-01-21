document.addEventListener('DOMContentLoaded', () => {

    const codeInput   = document.getElementById('code');
    const numberInput = document.getElementById('number');
    const signupBtn   = document.querySelector('.ba');


    
    // Enforce digits-only input + max 10 digits
    numberInput.addEventListener('input', () => {
        numberInput.value = numberInput.value
            .replace(/\D/g, '') 
            
            .slice(0, 10);
            
    });

    // notify user if non-digit input attempted
    numberInput.addEventListener('keydown', (e) => {
        // allow shift, ctrl, alt combinations
        if (e.shiftKey || e.ctrlKey || e.altKey) return;
        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];    

        if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
            notify('warning', 'Invalid Input', 'Please enter digits only', 2000);
        }
    });

    if (!codeInput || !numberInput || !signupBtn) {
        console.warn('Phone page: required elements missing');
        return;
    }


    numberInput.focus();

    //also allow enter key to click signup
    numberInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            signupBtn.click();
        }
    });

    signupBtn.addEventListener('click', () => {
        const countryCode = codeInput.value.trim();
        const rawNumber   = numberInput.value.trim();

        if (!countryCode || !rawNumber) {
            console.warn('Phone signup: missing country code or number');
            notify('error', 'Incomplete', 'Please enter country code and number', 3000);
            return;
        }

        // Final hard validation (anti-tamper)
        if (!/^\d+$/.test(rawNumber)) {
            console.warn('Invalid phone number: digits only allowed');
            notify('error', 'Invalid Number', 'Please enter digits only', 3000);
            return;
        }

        // Length sanity check
        if (rawNumber.length < 9 || rawNumber.length > 10) {
            console.warn('Invalid phone number length');
            notify('error', 'Invalid Length', 'Phone number too short or too long', 3000);
            return;
        }

        let number = rawNumber;

        // Leading zero rules
        if (number.startsWith('0') && number.length === 10) {
            number = number.substring(1);
        }

        const fullPhone = `${countryCode}${number}`;
        const hexPhone  = toHex(fullPhone);

        localStorage.setItem('001', hexPhone);
        localStorage.setItem('signedup', 'false');
        localStorage.setItem('signeduplevel', 'primary');

        console.log('Phone obtained');
        notify('success', 'Number saved!', 'You\'re awesome!', 3000);

        // Redirect after 0.5 seconds
        setTimeout(() => {
            window.location.href = 'email.html';
        }, 3500);
    });
});

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
