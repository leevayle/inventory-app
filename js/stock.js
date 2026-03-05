/* =========================================================
    STOCK.JS - Fixed & Optimized
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initDashboardNavigation();
    initTabs();
    initRestockModal();
    initSettingsModal();
    initProductCreationModal();
    initUserModals();
});

/* --- 3. DASHBOARD NAVIGATION --- */
function initDashboardNavigation() {
    const search = document.getElementById('search');
    if (search) search.focus();

    // define pages mapping based on nav title text
    const mapping = {
        'home': 'dashboard.html',
        'sell': 'sell.html',
        'stock control': 'stock.html',
        'bills': 'bills.html',
        'orders': 'orders.html'
    };

    // attach click listeners to all roundnav items
    // compute base path (directory containing current file)
    const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    document.querySelectorAll('.roundnav').forEach(el => {
        const title = el.querySelector('.navtitle')?.textContent.trim().toLowerCase();
        if (title && mapping[title]) {
            el.addEventListener('click', () => {
                // use basePath so links resolve correctly from any page depth
                window.location.href = basePath + mapping[title];
            });
        }
    });

    // mobile dropdown navigation
    const mobile = document.getElementById('mobile-navigation');
    if (mobile) {
        mobile.addEventListener('change', () => {
            const val = mobile.value.toLowerCase();
            if (mapping[val]) window.location.href = mapping[val];
        });
    }

    // mark active nav item based on current file name
    const current = window.location.pathname.split('/').pop();
    document.querySelectorAll('.roundnav').forEach(el => {
        const title = el.querySelector('.navtitle')?.textContent.trim().toLowerCase();
        if (title && mapping[title] && mapping[title].endsWith(current)) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
    if (mobile) {
        for (let opt of mobile.options) {
            const val = opt.value.toLowerCase();
            if (mapping[val] && mapping[val].endsWith(current)) {
                mobile.value = opt.value;
                break;
            }
        }
    }
}

/* --- 4. TAB SWITCHING --- */
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
            btn.classList.add('active');
            document.getElementById(`tab-${btn.dataset.tab}`)?.classList.remove('hidden');
        });
    });
}

/* =========================================================
   5. QUANTITY + / - CONTROLS & QUICK UPDATE
   ========================================================= */
document.addEventListener('click', (e) => {
    
    // PART A: PLUS / MINUS BUTTONS
    const qtyBtn = e.target.closest('.qty-btn');
    if (qtyBtn) {
        const control = qtyBtn.closest('.qty-control');
        const input = control.querySelector('.qty-input');
        let value = parseInt(input.value, 10) || 0;
        
        if (qtyBtn.classList.contains('plus')) value++;
        if (qtyBtn.classList.contains('minus')) value--;

        if (value < 0) value = 0; 
        input.value = value;
        return; 
    }

    // PART B: THE "UPDATE" BUTTON
    // We target buttons with .btn-save that specifically say "Update"
    const updateBtn = e.target.closest('.btn-save');
    if (updateBtn && updateBtn.textContent.trim() === 'Update') {
        e.preventDefault();
        
        const row = updateBtn.closest('.cart-item-row');
        if (!row) return;

        // Extracting data from the row
        const productCode = row.querySelector('.item-code')?.textContent.trim();
        const newQty = row.querySelector('.qty-input')?.value;

        if (!productCode) {
            notify('error', 'Error', 'Product code not found', 3000);
            return;
        }

        // Loading State
        const originalHTML = updateBtn.innerHTML;
        updateBtn.disabled = true;
        updateBtn.textContent = '...';

        const formData = new FormData();
        formData.append('code', productCode);
        formData.append('qty', newQty);

        fetch('../scripts/update-quantity.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                // 3-second notification as requested
                notify('success', 'Saved', `Stock updated to ${newQty}`, 3000);
            } else {
                notify('error', 'Update Failed', data.message, 3000);
            }
        })
        .catch(err => {
            console.error('Fetch Error:', err);
            notify('error', 'Error', 'Server connection failed', 3000);
        })
        .finally(() => {
            updateBtn.disabled = false;
            updateBtn.innerHTML = originalHTML;
        });
    }
});

// Manual typing validation
document.addEventListener('input', (e) => {
    if (!e.target.classList.contains('qty-input')) return;
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 0) e.target.value = 0;
});

/* --- 6. RESTOCK MODAL --- */
function initRestockModal() {
    const restockBtn = document.getElementById('restockbtn');
    const restockModal = document.getElementById('restockModal');
    const closeBtn = document.getElementById('closeRestockModal');
    const restockForm = document.getElementById('restockForm');
    const overlay = document.getElementById('restockFormLoadingOverlay');

    if (!restockBtn || !restockModal) return;
    restockBtn.addEventListener('click', () => restockModal.classList.add('active'));
    closeBtn?.addEventListener('click', () => restockModal.classList.remove('active'));
    
    restockForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        overlay.style.display = 'flex';
        setTimeout(() => { 
            restockModal.classList.remove('active'); 
            overlay.style.display = 'none';
            restockForm.reset();
        }, 2000);
    });
}

/* --- 7. EDIT PRODUCT MODAL --- */
const editProductModal = document.getElementById('editProductModal');
const editProductForm = document.getElementById('editProductForm');
const editOverlay = document.getElementById('editProductFormLoadingOverlay');

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-edit');
    if (!btn || !editProductForm) return;

    const row = btn.closest('.cart-item-row');
    if (!row) return;

    editProductModal.classList.add('active');
    editProductForm.code.value = row.querySelector('.item-code')?.textContent.trim() || '';
    editProductForm.name.value = row.querySelector('.item-name')?.textContent.trim() || '';
    editProductForm.qty.value = row.querySelector('.qty-input')?.value || 0;
    editProductForm.batch.value = row.dataset.batch || '';
    editProductForm.supplier.value = row.dataset.supplier || '';
    editProductForm.unit_price.value = row.dataset.unitPrice || '';
    editProductForm.expiry_date.value = row.dataset.expiry || '';
});

document.getElementById('closeEditProductModal')?.addEventListener('click', () => editProductModal.classList.remove('active'));

editProductForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    editOverlay.style.display = 'flex';
    const cleanData = new FormData();
    new FormData(this).forEach((value, key) => {
        if (value instanceof File) { if (value.size > 0) cleanData.append(key, value); }
        else if (value.toString().trim() !== "") cleanData.append(key, value);
    });

    fetch('../scripts/edit.php', { method: 'POST', body: cleanData })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'success') {
            notify('success', 'Saved', data.message, 2000);
            setTimeout(() => location.reload(), 1500);
        } else {
            notify('error', 'Error', data.message, 3000);
            editOverlay.style.display = 'none';
        }
    }).catch(() => editOverlay.style.display = 'none');
});

/* --- 8. DELETE PRODUCT MODAL --- */
const deleteModal = document.getElementById('deleteConfirmModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
let rowToDelete = null;

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-delete');
    if (!btn || btn.closest('.modal')) return;
    rowToDelete = btn.closest('.cart-item-row');
    if (rowToDelete) deleteModal.classList.add('active');
});

document.getElementById('cancelDeleteBtn')?.addEventListener('click', () => deleteModal.classList.remove('active'));
document.getElementById('closeDeleteModal')?.addEventListener('click', () => deleteModal.classList.remove('active'));

confirmDeleteBtn?.addEventListener('click', () => {
    if (!rowToDelete) return;
    const code = rowToDelete.querySelector('.item-code')?.textContent.trim();
    const fd = new FormData(); fd.append('code', code);
    fetch('../scripts/delete-product.php', { method: 'POST', body: fd })
    .then(res => res.json()).then(data => {
        if(data.status==='success') { 
            notify('success', 'Deleted', data.message, 2000);
            rowToDelete.remove(); 
            deleteModal.classList.remove('active');
        }
    });
});

/* --- 9. ADDITIONAL INITIALIZERS (SAFE WRAPPERS) --- */
function initSettingsModal() {
    const modal = document.getElementById('settings-modal');
    const openBtn = document.getElementById('settings');
    openBtn?.addEventListener('click', () => modal.style.display = 'flex');
    document.getElementById('close-settings')?.addEventListener('click', () => modal.style.display = 'none');
    document.getElementById('cancel-settings')?.addEventListener('click', () => modal.style.display = 'none');
}

function initProductCreationModal() {
    const modal = document.getElementById('productModal');
    const openBtn = document.getElementById('openProductModal');
    openBtn?.addEventListener('click', () => modal.classList.add('active'));
    document.getElementById('closeProductModal')?.addEventListener('click', () => modal.classList.remove('active'));
    
    // Save Product Fetch logic
    document.getElementById('saveProductBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        const f = document.getElementById('productForm');
        fetch('../scripts/save_product.php', { method: 'POST', body: new FormData(f) })
        .then(res => res.json()).then(data => {
            if(data.status==='success') {
                notify('success', 'Saved', data.message, 2000);
                modal.classList.remove('active');
                f.reset();
            }
        });
    });
}

function initUserModals() {
    const openBtn = document.getElementById('pendingusers');
    const modal = document.getElementById('signup-requests-modal');
    openBtn?.addEventListener('click', () => modal.style.display = 'flex');
    document.getElementById('close-signup-requests')?.addEventListener('click', () => modal.style.display = 'none');
}