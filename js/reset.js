document.addEventListener('DOMContentLoaded', () => {
    // redirect to login page on click
    const loginLink = document.querySelector('.bb.mauto.poppins');
    if (loginLink) {
        loginLink.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // get form elements
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const newPasswordInput = document.getElementById('n-password');
    const confirmNewPasswordInput = document.getElementById('n-password2');
    const resetBtn = document.getElementById('resetbtn');

    // Add click event listener to reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', handleReset);
    }

    // Also allow form submission on Enter key in any input field
    const inputFields = [usernameInput, emailInput, newPasswordInput, confirmNewPasswordInput];
    inputFields.forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleReset();
                }
            });
        }
    });
});

async function handleReset() {
    // Get current values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('n-password').value;
    const confirmPassword = document.getElementById('n-password2').value;

    // Validate all fields are filled
    if (!username || !email || !password || !confirmPassword) {
        notify('error', 'Missing Fields', 'Please fill in all fields', 3000);
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        notify('error', 'Invalid Email', 'Please enter a valid email address', 3000);
        return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
        notify('error', 'Password Mismatch', 'Passwords do not match', 3000);
        return;
    }

    // Validate password strength
    if (password.length < 8) {
        notify('error', 'Weak Password', 'Password must be at least 8 characters long', 3000);
        return;
    }

    // Prepare data for sending
    const formData = {
        username: username,
        email: email,
        new_password: password,
        confirm_password: confirmPassword
    };

    try {
        // Send data to PHP script
        const response = await fetch('scripts/reset.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Parse response
        const result = await response.json();

        if (response.ok && result.status === 'success') {
            // Success
            notify('success', 'Password Reset', result.message, 3000);
            
            // Clear form fields
            document.getElementById('username').value = '';
            document.getElementById('email').value = '';
            document.getElementById('n-password').value = '';
            document.getElementById('n-password2').value = '';
            
            // Optional: Redirect to login page after successful reset
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        } else {
            // Error from server
            if (result.error === 'mismatch') {
                notify('error', 'Mismatch', 'Your email and username are not matching with our records', 3000);
            } else {
                notify('error', 'Error', result.message || 'Password reset failed', 3000);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        notify('error', 'Connection Error', 'Unable to connect to server. Please try again later.', 3000);
    }
}