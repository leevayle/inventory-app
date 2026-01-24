    
// Skeleton Loading Control Functions
function showSkeleton() {
    const skeleton = document.getElementById('skeleton-preview');
    if (skeleton) {
        // Reset styles first
        skeleton.style.display = 'block';
        skeleton.style.opacity = '1';
        skeleton.style.transition = 'none';
        skeleton.style.zIndex = '9999';
        
        // Force reflow to ensure styles are applied
        skeleton.offsetHeight;
        
        // Hide the dashboard content
        const dashboard = document.getElementById('dashboard-content');
        if (dashboard) {
            dashboard.style.display = 'none';
        }
    }
    notify('info','Preparing yor page','Waiting for server response, kindly wait. This might take a while',1000);
}

function hideSkeleton() {
    const skeleton = document.getElementById('skeleton-preview');
    if (skeleton) {
        // Add fade-out animation
        skeleton.style.opacity = '0';
        skeleton.style.transition = 'opacity 0.5s ease';
        
        // Hide after animation completes
        setTimeout(() => {
            skeleton.style.display = 'none';
            skeleton.style.zIndex = '-100';
            
            // Show the actual dashboard content
            const dashboard = document.getElementById('dashboard-content');
            if (dashboard) {
                dashboard.style.display = 'block';
            }
        }, 500);
    }
}