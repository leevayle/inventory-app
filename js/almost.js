document.addEventListener('DOMContentLoaded', () => {

    const usernameInput = document.getElementById('username');
    const pinInput      = document.getElementById('pin');
    const signupBtn     = document.querySelector('.ba');

    if (!usernameInput || !pinInput || !signupBtn) {
        console.warn('Signup page: required elements missing');
        notify('error', 'System Error', 'Required elements missing', 4000);
        return;
    }

    usernameInput.focus();

    // enter is click submit
    // listen for enter key and perform click on submit

    usernameInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            signupBtn.click();
        }
    });

    pinInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            signupBtn.click();
        }
    });

    // catch pin input to allow only digits
    // only notify when non digits attempted
    
    pinInput.addEventListener('input', () => {
        const originalValue = pinInput.value;
        pinInput.value = pinInput.value.replace(/\D/g, '').slice(0, 6);
        if (originalValue !== pinInput.value) {
            notify('info', 'PIN Input', 'Only 6 allowed for PIN (0-9)', 2000);
        }
    });

    signupBtn.addEventListener('click', () => {

        const usernameValue = usernameInput.value.trim();
        const pinValue      = pinInput.value.trim();

        if (!usernameValue) {
            console.warn('Username missing');
            notify('error', 'Username Missing', 'Please enter a username', 3000);
            usernameInput.focus();
            return;
        }

        if (!pinValue) {
            console.warn('PIN missing');
            notify('error', 'PIN Missing', 'Please enter a PIN', 3000);
            pinInput.focus();
            return;
        }

        localStorage.setItem('004', toHex(usernameValue.toLowerCase()));
        localStorage.setItem('005', toHex(pinValue));

        localStorage.setItem('signedup', 'false');
        localStorage.setItem('signeduplevel', 'tertiary');

        console.log('Username and PIN saved');
       

        registerUser();
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

/**
 * Register user
 */
function registerUser() {

    const payload = {
        '001': localStorage.getItem('001'),
        '002': localStorage.getItem('002'),
        '003': localStorage.getItem('003'),
        '004': localStorage.getItem('004'),
        '005': localStorage.getItem('005')
    };

    for (const key of ['001','002','003','004','005']) {
        if (!payload[key]) {
            console.warn(`Missing value for ${key}`);
            notify('error', 'Registration Error', 'Missing required information', 4000);
            return;
        }
    }

    fetch('/inventory-app/scripts/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {

        console.log('Registration response:', data);
        notify('info', 'Registration Response', data.message, 4000);

        if (data.status === 'success') {

            // ✅ Mark signed up
            localStorage.setItem('signedup', 'true');

            // 🧹 CLEANUP: remove setup keys
            localStorage.removeItem('002'); 
            localStorage.removeItem('003'); 
            localStorage.removeItem('004'); 
            localStorage.removeItem('005'); 
            localStorage.removeItem('signeduplevel');

            console.log('Local storage cleaned after signup');

            setTimeout(() => {
                window.location.href = 'done.html';
            }, 2000);

        } else {
            console.warn('Registration failed:', data.message);
            notify('error', 'Registration Failed', data.message, 4000);
        }
    })
    .catch(err => {
        console.error('Registration error:', err);
        notify('error', 'Network Error', 'Unable to register user', 4000);
    });
}
