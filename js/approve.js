document.addEventListener('DOMContentLoaded', async () => {
    const counterEl = document.getElementById('approval-request-counter');
    const profileImg = document.getElementById('profile-pic');
    if (!counterEl || !profileImg) {
        console.warn('Counter or profile image element missing');
        return;
    }

    function getProfileUrl(dbPath) {
        if (!dbPath || dbPath === 'NULL') {
            dbPath = '/inventory-app/assets/images/profiles/default.jpg';
        } else if (!dbPath.startsWith('/') && !dbPath.startsWith('http')) {
            dbPath = '/inventory-app/' + dbPath.replace(/^(\.\/|\.\.\/)+/, '');
        }
        return dbPath + '?v=' + new Date().getTime(); // cache-buster
    }

    try {
        console.log('Fetching approve.php...');
        const res = await fetch('../scripts/approve.php', { credentials: 'same-origin' });
        console.log('Fetch response OK?', res.ok);
        if (!res.ok) {
            console.error('Server returned non-OK status');
            notify('error', 'Fetch Failed', 'Could not reach server to get profile info', 2000);
            return;
        }

        const data = await res.json();
        console.log('Data from approve.php:', data);

        // Update current user's profile image
        if (data.user && data.user.profile_url) {
            console.log('Setting profile image for current user:', data.user.profile_url);
            profileImg.src = getProfileUrl(data.user.profile_url);

            // Success notification
            // notify('success', 'Profile Loaded', 'Your profile image has been updated', 2000);
        }

        // Update pending count
        if (typeof data.pendingCount === 'number') {
            counterEl.textContent = data.pendingCount;
            counterEl.classList.toggle('hidden', data.pendingCount === 0);
            console.log('Pending users count:', data.pendingCount);
        }

    } catch (err) {
        console.error('Error fetching approve.php:', err);
        counterEl.classList.add('hidden');
        notify('error', 'Server Error', 'Failed to load profile info', 2000);
    }
});
