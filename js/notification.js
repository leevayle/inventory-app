// SVG icons
const NOTIFY_ICONS = {
    success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>`,

    error: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`,

    warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18h20.36L13.71 3.86z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>`,

    info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>`
};

let notifyTimeout = null;

function notify(type = 'success', title = 'Success', message = '', duration = 3000) {
    const container = document.getElementById('notification');
    if (!container) return;

    // Clear existing notification
    container.innerHTML = '';
    if (notifyTimeout) clearTimeout(notifyTimeout);

    // Build HTML
    const el = document.createElement('div');
    el.className = `notify ${type}`;
    el.innerHTML = `
        <div class="notify-icon">${NOTIFY_ICONS[type]}</div>
        <div class="notify-body">
            <div class="notify-title">${title}</div>
            <div class="notify-msg">${message}</div>
        </div>
        <button class="notify-close">&times;</button>
    `;

    container.appendChild(el);

    // Force reflow → show
    requestAnimationFrame(() => el.classList.add('show'));

    // Close click
    el.querySelector('.notify-close').onclick = () => hide();

    // Auto-hide
    notifyTimeout = setTimeout(hide, duration);

    function hide() {
        el.classList.remove('show');
        setTimeout(() => {
            if (el.parentNode) el.remove();
        }, 250);
    }
}
