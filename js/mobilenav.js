    // MOBILE NAV
    document.getElementById('mobile-navigation').addEventListener('change', function() {
        const selectedValue = this.value;

        // Map values → actual page URLs
        const pages = {
            'home':         './dashboard.html',       // or '/' or 'home.html' — change as needed
            'sell':         'sell.html',
            'bills':        'bills.html',
            'stock control': 'stock.html',      // ← your requested redirect
            'orders':       'orders.html'
        };

        const targetUrl = pages[selectedValue];

        if (targetUrl) {
            window.location.href = targetUrl;
        } else {
            console.warn('No page mapped for:', selectedValue);
            // Optionally stay on current page or show alert
        }
    });