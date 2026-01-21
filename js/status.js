async function checkStatus() {
    const hexPhone = localStorage.getItem('001');

    if (!hexPhone) {
        console.warn('No phone in localStorage');
        return;
    }

    try {
        const res = await fetch('./scripts/status.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ '001': hexPhone })
        });

        const data = await res.json();
        console.log('Status payload:', data);

        // Defensive check
        if (!data.role) {
            notify('error', 'Error', 'Invalid server response', 3000);
            return;
        }

        // ROLE LOGIC
        if (data.role === 'pending') {
            notify(
                'error',
                'Not approved',
                'The admin has not set a role for you yet',
                3000
            );
            return;
        }

        // Approved roles (admin, cashier, manager, etc.)
        notify(
            'success',
            'Approved!',
            `Your role is ${data.role}`,
            3000
        );

        // Optional: store role for later use
        localStorage.setItem('role', data.role);

    } catch (err) {
        console.error('Status check failed:', err);
        notify('error', 'Network error', 'Unable to check status', 3000);
    }
}

document.addEventListener('DOMContentLoaded', checkStatus);
