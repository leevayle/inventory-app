document.addEventListener('DOMContentLoaded', () => {
    startInstall();
});

const bar = document.querySelector('.bar');

let installing = false;

async function startInstall() {
    if (installing) return;
    installing = true;

    try {
        updateBar(5);
        await runStep(1);
    } catch (err) {
        console.error('Installation error:', err);
        console.log('Installation failed. Check server logs.');
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runStep(step) {
    const res = await fetch('/inventory-app/scripts/setup.php', {
        method: 'POST',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ step })
    });

    if (!res.ok) {
        const text = await res.text();
        console.error('Server error:', text);
        throw new Error('Server returned ' + res.status);
    }

    const data = await res.json();
    console.log('Installer:', data);

    if (data.status === 'error') {
        throw new Error(data.message);
    }

    switch (data.step) {
        case 1:
            updateBar(30);
            await delay(1500);     // 1.5 seconds pause
            return runStep(2);

        case 2:
            updateBar(70);
            await delay(1500);     // 1.5 seconds pause
            return runStep(3);

        case 3:
            await delay(1500);     // 1.5 seconds pause before finalize
            return finalizeInstall();

        default:
            throw new Error('Unknown installer state');
    }
}

function finalizeInstall() {
    updateBar(80);

    setTimeout(() => {
        updateBar(100);

        // Redirect after 1 second
        setTimeout(() => {
            window.location.href = '/inventory-app/welcome.html';
        }, 1000);

    }, 3000);
}

function updateBar(percent) {
    bar.style.width = percent + '%';
}
