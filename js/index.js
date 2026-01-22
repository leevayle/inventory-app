document.addEventListener('DOMContentLoaded', () => {
    bootstrap();
});

async function bootstrap() {
    // 1️⃣ Splash delay
    await sleep(2000);

    try {
        const res = await fetch('/inventory-app/scripts/check.php', {
            headers: { 'Accept': 'application/json' }
        });

        let data = null;

        // 2️⃣ Handle expected responses
        if (res.status === 200 || res.status === 404) {
            data = await res.json();
            // console.log('DB check:', data);
            console.log('Check 1 passed');
        } else {
            throw new Error(`Unexpected server response ${res.status}`);
        }

        // 3️⃣ Pause after logging
        await sleep(3500);

        // 4️⃣ Fade out before redirect
        const main = document.querySelector('.main');
        main.style.transition = 'opacity 0.5s ease-in-out';
        main.style.opacity = '0';
        
        // Wait for fade out to complete, then redirect
        await sleep(500);

        // 5️⃣ Redirect logic
        if (data.status === 'installed') {
            // console.log('Database exists → welcome');
            console.log('Check 1.1 passed');
            window.location.href = '/inventory-app/welcome.html';
        } else {
            // console.log('Database missing → installer');
            console.warn('Check 1.1 failed');
            window.location.href = '/inventory-app/install/start.html';
        }

    } catch (err) {
        console.error('Bootstrap fatal error:', err);

        // Hard fail only on REAL errors
        document.body.innerHTML = `
            <div style="color:red; padding:20px; font-family:sans-serif">
                <h3>System Error</h3>
                <p>Unable to initialize system.</p>
                <small>${err.message}</small>
            </div>
        `;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
