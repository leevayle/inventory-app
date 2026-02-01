/* =========================================================
   STOCK.JS
   Centralized frontend logic for stock & UI interactions
   ========================================================= */

/* =========================================================
   1. DOM READY BOOTSTRAP
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    // initPendingUsersModal();
    initDashboardNavigation();
    initTabs();
    initRestockModal();
});

/* =========================================================
   2. PENDING USERS MODAL
   ========================================================= */
// function initPendingUsersModal() {
//     const openBtn  = document.getElementById('pendingusers');
//     const modal    = document.getElementById('signup-requests-modal');
//     const closeBtn = document.getElementById('close-signup-requests');
//     const tbody    = modal?.querySelector('tbody');

//     if (!openBtn || !modal || !closeBtn || !tbody) return;

//     openBtn.addEventListener('click', async () => {
//         modal.style.display = 'flex';
//         document.body.style.overflow = 'hidden';

//         tbody.innerHTML = '<tr><td colspan="6">Loading…</td></tr>';

//         try {
//             const res = await fetch('../scripts/approve.php', {
//                 credentials: 'same-origin'
//             });

//             const data = await res.json();

//             if (!data.success) {
//                 tbody.innerHTML = '<tr><td colspan="6">Failed to load users</td></tr>';
//                 return;
//             }

//             if (!data.pendingUsers.length) {
//                 tbody.innerHTML = '<tr><td colspan="6">No pending users</td></tr>';
//                 return;
//             }

//             tbody.innerHTML = '';

//             data.pendingUsers.forEach(user => {
//                 const tr = document.createElement('tr');

//                 tr.innerHTML = `
//                     <td>${user.username}</td>
//                     <td>${user.phone}</td>

//                     <td>
//                         <select name="users[${user.id}][role]">
//                             <option value="">Select role</option>
//                             <option value="cashier">Cashier</option>
//                             <option value="manager">Manager</option>
//                             <option value="admin">Admin</option>
//                             <option value="superadmin">S.Admin</option>
//                         </select>
//                     </td>

//                     <td>
//                         <select name="users[${user.id}][branch]">
//                             <option value="1">Main Branch</option>
//                         </select>
//                     </td>

//                     <td>
//                         <select name="users[${user.id}][status]">
//                             <option value="active">Active</option>
//                             <option value="inactive">Inactive</option>
//                         </select>
//                     </td>

//                     <td class="row-actions">
//                         <button type="button" class="btn success" data-id="${user.id}">Approve</button>
//                         <button type="button" class="btn danger" data-id="${user.id}">Reject</button>
//                     </td>
//                 `;

//                 tbody.appendChild(tr);
//             });

//         } catch (err) {
//             tbody.innerHTML = '<tr><td colspan="6">Server error</td></tr>';
//         }
//     });

//     closeBtn.addEventListener('click', closeModal);
//     modal.addEventListener('click', (e) => {
//         if (e.target === modal) closeModal();
//     });

//     function closeModal() {
//         modal.style.display = 'none';
//         document.body.style.overflow = '';
//     }
// }


/* =========================================================
   3. DASHBOARD NAVIGATION + SEARCH FOCUS
   ========================================================= */
function initDashboardNavigation() {
    const search = document.getElementById('search');
    const dashbtn = document.getElementById('dashbtn');

    if (search) search.focus();

    if (dashbtn) {
        dashbtn.addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
    }
}

/* =========================================================
   4. TAB SWITCHING
   ========================================================= */
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
   5. QUANTITY + / - CONTROLS (EVENT DELEGATION)
   ========================================================= */
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.qty-btn');
    if (!btn) return;

    const control = btn.closest('.qty-control');
    const input = control.querySelector('.qty-input');

    let value = parseInt(input.value, 10) || 1;

    if (btn.classList.contains('plus')) value++;
    if (btn.classList.contains('minus')) value--;

    if (value < 1) value = 1;
    input.value = value;
});

document.addEventListener('input', (e) => {
    if (!e.target.classList.contains('qty-input')) return;

    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) e.target.value = 1;
});

/* =========================================================
   6. RESTOCK MODAL
   ========================================================= */
function initRestockModal() {
    const restockBtn = document.getElementById('restockbtn');
    const restockModal = document.getElementById('restockModal');
    const closeBtn = document.getElementById('closeRestockModal');
    const restockForm = document.getElementById('restockForm');
    const overlay = document.getElementById('restockFormLoadingOverlay');

    if (!restockBtn || !restockModal) return;

    restockBtn.addEventListener('click', () => {
        restockModal.classList.add('active');
    });

    closeBtn?.addEventListener('click', closeModal);
    restockModal.addEventListener('click', (e) => {
        if (e.target === restockModal) closeModal();
    });

    restockForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        overlay.style.display = 'flex';

        setTimeout(() => {
            closeModal();
        }, 2000);
    });

    function closeModal() {
        restockModal.classList.remove('active');
        overlay.style.display = 'none';
        restockForm.reset();
    }
}

/* =========================================================
   7. EDIT PRODUCT MODAL (FIXED — EVENT DELEGATION)
   ========================================================= */
const editProductModal = document.getElementById('editProductModal');
const editProductForm = document.getElementById('editProductForm');
const editOverlay = document.getElementById('editProductFormLoadingOverlay');

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-edit');
    if (!btn) return;

    const row = btn.closest('.cart-item-row');
    if (!row) return;

    editProductModal.classList.add('active');

    editProductForm.code.value = row.querySelector('.item-code')?.textContent.trim() || '';
    editProductForm.name.value = row.querySelector('.item-name')?.textContent.trim() || '';
    editProductForm.qty.value = row.querySelector('.qty-input')?.value || 1;

    editProductForm.batch.value = row.dataset.batch || '';
    editProductForm.supplier.value = row.dataset.supplier || '';
    editProductForm.unit_price.value = row.dataset.unitPrice || '';
    editProductForm.expiry_date.value = row.dataset.expiry || '';
});

document.getElementById('closeEditProductModal')?.addEventListener('click', closeEditModal);
editProductModal?.addEventListener('click', (e) => {
    if (e.target === editProductModal) closeEditModal();
});

editProductForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    editOverlay.style.display = 'flex';

    setTimeout(() => {
        closeEditModal();
    }, 2000);
});

function closeEditModal() {
    editProductModal.classList.remove('active');
    editOverlay.style.display = 'none';
    editProductForm.reset();
}

/* =========================================================
   8. DELETE PRODUCT MODAL (FIXED — EVENT DELEGATION)
   ========================================================= */
const deleteModal = document.getElementById('deleteConfirmModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

let rowToDelete = null;

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-delete');
    if (!btn) return;

    rowToDelete = btn.closest('.cart-item-row');
    deleteModal.classList.add('active');
});

document.getElementById('closeDeleteModal')?.addEventListener('click', closeDeleteModal);
document.getElementById('cancelDeleteBtn')?.addEventListener('click', closeDeleteModal);
deleteModal?.addEventListener('click', (e) => {
    if (e.target === deleteModal) closeDeleteModal();
});

confirmDeleteBtn?.addEventListener('click', () => {
    if (rowToDelete) rowToDelete.remove();
    closeDeleteModal();
});

function closeDeleteModal() {
    deleteModal.classList.remove('active');
    rowToDelete = null;
}




// document.addEventListener('DOMContentLoaded', () => {

//     const openBtn  = document.getElementById('pendingusers');
//     const modal    = document.getElementById('signup-requests-modal');
//     const closeBtn = document.getElementById('close-signup-requests');

//     // Open modal
//     openBtn.addEventListener('click', () => {
//         modal.style.display = 'flex';
//         document.body.style.overflow = 'hidden'; // prevent background scroll
//     });

//     // Close modal via X
//     closeBtn.addEventListener('click', () => {
//         closeModal();
//     });

//     // Close modal by clicking backdrop
//     modal.addEventListener('click', (e) => {
//         if (e.target === modal) {
//             closeModal();
//         }
//     });

//     function closeModal() {
//         modal.style.display = 'none';
//         document.body.style.overflow = '';
//     }

// });


// ====================================
//      SETTINGS
//  =================================

        document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById('settings-modal');
        const openBtn = document.getElementById('settings');
        const closeBtn = document.getElementById('close-settings');
        const cancelBtn = document.getElementById('cancel-settings');

        const tabs = document.querySelectorAll('.settings-section');
        const contents = document.querySelectorAll('.tab-content');

        // Open modal
        openBtn?.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        // Close modal
        [closeBtn, cancelBtn].forEach(btn => {
            btn?.addEventListener('click', () => {
            modal.style.display = 'none';
            });
        });

        // Close on backdrop click
        modal.addEventListener('click', e => {
            if (e.target === modal) {
            modal.style.display = 'none';
            }
        });

        // Tabs logic
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.add('hidden'));

            tab.classList.add('active');
            document
                .getElementById(`tab-${tab.dataset.tab}`)
                .classList.remove('hidden');
            });
        });
        });



        const modal = document.getElementById('productModal');
const openBtn = document.getElementById('openProductModal');
const closeBtn = document.getElementById('closeProductModal');
const cancelBtn = document.getElementById('cancelProductModal');
const form = document.getElementById('productForm');

openBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.classList.remove('active');
    form.reset();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const product = {
        code: data.get('code'),
        name: data.get('name'),
        price: data.get('price'),
        qty: data.get('qty')
    };

    console.log('New Product:', product);

    // backend hook goes here
    closeModal();
});




document.addEventListener('DOMContentLoaded', () => {

    const openBtn  = document.getElementById('pendingusers');
    const modal    = document.getElementById('signup-requests-modal');
    const closeBtn = document.getElementById('close-signup-requests');

    // Open modal
    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // prevent background scroll
    });

    // Close modal via X
    closeBtn.addEventListener('click', () => {
        closeModal();
    });

    // Close modal by clicking backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

});