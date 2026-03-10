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



    /* =========================================================
   DASHBOARD: POPULATE RESTOCK TABLE
   ========================================================= */
function initLowStockCheck() {
    console.log("Low Stock Script Initialized"); // Check F12 console for this

    const tbody = document.querySelector('.dummy-inventory-table tbody');
    if (!tbody) {
        console.warn("Table body not found! Check your HTML class: .dummy-inventory-table tbody");
        return;
    }

    fetch('../scripts/check-low-stock.php')
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(res => {
            if (res.status === 'success') {
                // Keep the original table structure, just clear the old rows
                tbody.innerHTML = '';

                if (res.data.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding:15px; opacity:0.6;">All items are well stocked.</td></tr>';
                    return;
                }

                // Inject the real data
                res.data.forEach(item => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${item.code}</td>
                        <td>${item.name}</td>
                        <td style="font-weight:bold;">${item.stock}</td>
                    `;
                    tbody.appendChild(tr);
                });
            } else {
                console.error("PHP Error:", res.message);
            }
        })
        .catch(err => {
            console.error("Fetch Error:", err);
        });
}

// Ensure it runs after the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLowStockCheck);
} else {
    initLowStockCheck();
}
















});

