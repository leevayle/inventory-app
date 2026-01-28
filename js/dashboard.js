// Auto-show skeleton on page load
document.addEventListener('DOMContentLoaded', function() {
    showSkeleton();

    setTimeout(() => {
        hideSkeleton();
    }, 1000);

     const skeleton = document.getElementById('skeleton-preview');
    
    if (skeleton) {
        skeleton.addEventListener('click', function() {
            notify('warning', 'Please wait', 'Waiting for server response, kindly wait. This might take a while', 500);
        });
    } else {
        console.error('Skeleton element not found!');
    }

















});

