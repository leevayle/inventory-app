document.addEventListener('DOMContentLoaded', async () => {
    const profileImg = document.getElementById('profile-pic');

    if (!profileImg) {
        console.warn('Profile image element missing');
        return;
    }

    // Show skeleton immediately
    if (typeof showSkeleton === 'function') showSkeleton();

    function getProfileUrl(dbPath) {
        if (!dbPath || dbPath === 'NULL') {
            return '/inventory-app/assets/images/profiles/default.jpg';
        }

        if (!dbPath.startsWith('/') && !dbPath.startsWith('http')) {
            dbPath = '/inventory-app/' + dbPath.replace(/^(\.\/|\.\.\/)+/, '');
        }

        return dbPath + '?v=' + Date.now();
    }

    try {
        const res = await fetch('../scripts/approve.php', {
            credentials: 'same-origin'
        });

        if (!res.ok) {
            console.error('Failed to fetch profile data');
            if (typeof hideSkeleton === 'function') hideSkeleton();
            return;
        }

        const data = await res.json();

        // Update the profile image
        profileImg.src = getProfileUrl(data.user?.profile_url);

        // Hide skeleton after image loads
        profileImg.onload = () => {
            if (typeof hideSkeleton === 'function') hideSkeleton();
        };

        // Fallback: hide skeleton if image already cached
        if (profileImg.complete) {
            if (typeof hideSkeleton === 'function') hideSkeleton();
        }

    } catch (err) {
        console.error('Profile fetch error:', err);
        if (typeof hideSkeleton === 'function') hideSkeleton();
    }
});
