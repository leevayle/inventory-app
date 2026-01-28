document.addEventListener('DOMContentLoaded', () => {

    const loginBtn = document.getElementById('loginbtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    let loggingIn = false;

    /* ------------------ helpers ------------------ */

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function stringToHex(str) {
        return Array.from(
            new TextEncoder().encode(str),
            byte => byte.toString(16).padStart(2, '0')
        ).join('');
    }

    function animate() {
        loginBtn.style.width = '50px';
        loginBtn.style.height = '50px';
        loginBtn.style.backgroundColor = 'white';
        loginBtn.innerHTML =
            '<img class="full mauto" src="assets/images/1.gif" alt="Loading...">';
    }

    function resetLoginBtn() {
        loginBtn.style.width = '';
        loginBtn.style.height = '';
        loginBtn.style.backgroundColor = '';
        loginBtn.innerHTML = `
            <div class="left flex mauto">
                <p class="mauto mt poppins">Log In</p>
            </div>
        `;
    }

    /* ------------------ core login ------------------ */

    async function handleLogin() {
        if (loggingIn) return;

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            notify('warning', 'Missing fields', 'Enter username and password', 3000);
            return;
        }

        loggingIn = true;
        animate();

        try {
            await sleep(1500);

            const payload = {
                username: stringToHex(username),
                password: stringToHex(password)
            };

            const res = await fetch('./scripts/auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            console.log('Auth response:', data);

            if (!res.ok || data.error) {
                throw new Error(data.error || 'Authentication failed');
            }

            // ────────────────────────────────────────────────
            //  Save the PREVIOUS last_login_at value to localStorage
            // ────────────────────────────────────────────────
            if (data.success) {
                localStorage.setItem('lastLoginAt', data.last_login_at);
                // value will be: "null" (string) or e.g. "2025-01-12 09:45:00"
            }

            if (data.phone) localStorage.setItem('phone', data.phone);
            if (data.role) localStorage.setItem('role', data.role);

            // reset UI
            resetLoginBtn();

            notify('success', 'Welcome', 'Login successful', 2500);

            setTimeout(() => {
                window.location.href = 'main/dashboard.html';
            }, 3000);

        } catch (err) {
            console.error(err);
            notify('error', 'Login failed', err.message, 3000);
            resetLoginBtn();
            loggingIn = false;
        }
    }

    /* ------------------ events ------------------ */

    usernameInput.focus();

    loginBtn.addEventListener('click', handleLogin);

    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleLogin();
            }
        });
    });

});