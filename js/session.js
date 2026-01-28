
// SESSION MANAGEMENT
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('../scripts/session.php', {
            credentials: 'same-origin'
        });

        // Not logged in → go to login
        if (!res.ok) {
            window.location.href = '../login.html';
            return;
        }

        const data = await res.json();

        if (!data.authenticated) {
            window.location.href = '../login.html';
            return;
        }

        // Logged in → show username
        const usernameEl = document.getElementById('username');

        if (usernameEl) {
            usernameEl.textContent = data.user.username;
        }

        console.log('Authenticated as:', data.user.username);

    } catch (err) {
        console.error('Session check failed:', err);
        window.location.href = '../login.html';
    }
});