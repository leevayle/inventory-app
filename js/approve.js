document.addEventListener('DOMContentLoaded', async () => {
    const counterEl = document.getElementById('approval-request-counter');
    const tableBody = document.querySelector('.signup-table tbody');

    if (!counterEl || !tableBody) {
        console.warn('Approval elements missing');
        return;
    }

    try {
        const res = await fetch('../scripts/approve.php', {
            credentials: 'same-origin'
        });

        if (!res.ok) {
            notify('error', 'Fetch Failed', 'Could not reach server', 2000);
            return;
        }

        const data = await res.json();

        // 🔢 Pending counter
        const count = Number(data.pendingCount) || 0;
        counterEl.textContent = count;
        counterEl.classList.toggle('hidden', count === 0);

        // 📋 Pending users table
        tableBody.innerHTML = '';

        if (!Array.isArray(data.pendingUsers)) return;

        data.pendingUsers.forEach(u => {
            const row = document.createElement('tr');
            row.dataset.userId = u.id;

            row.innerHTML = `
                <td class="username">${u.username}</td>
                <td class="phone">${u.phone}</td>

                <td>
                    <select class="role">
                        <option value="">Select role</option>
                        <option value="cashier">Cashier</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">S.Admin</option>
                    </select>
                </td>

                <td>
                    <select class="branch">
                        <option value="">Select branch</option>
                        <option value="1">Main Branch</option>
                        <option value="2">Westlands</option>
                        <option value="3">Kisii</option>
                    </select>
                </td>

                <td>
                    <select class="status">
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </td>

                <td class="row-actions">
                    <button type="button" class="btn success approve-btn">Approve</button>
                    <button type="button" class="btn danger reject-btn">Reject</button>
                </td>
            `;

            tableBody.appendChild(row);
        });

    } catch (err) {
        console.error(err);
        notify('error', 'Server Error', 'Failed to load approvals', 2000);
    }

    // 🔥 Event delegation for approve / reject
    tableBody.addEventListener('click', async (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        const row = button.closest('tr');
        if (!row) return;

        const userId   = row.dataset.userId;
        const username = row.querySelector('.username')?.textContent.trim();
        const phone    = row.querySelector('.phone')?.textContent.trim();
        const role     = row.querySelector('.role')?.value;
        const status   = row.querySelector('.status')?.value;
        const branchId = row.querySelector('.branch')?.value;

        let action = null;
        if (button.classList.contains('approve-btn')) action = 'approve';
        if (button.classList.contains('reject-btn'))  action = 'reject';
        if (!action) return;

        if (!userId || !username || !phone) {
            notify('error', 'Invalid Row', 'User data missing', 2000);
            return;
        }

        if (action === 'approve' && (!role || !status)) {
            notify('error', 'Missing Data', 'Select role and status first', 2000);
            return;
        }

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('action', action);
        formData.append('username', username);
        formData.append('phone', phone);

        if (action === 'approve') {
            formData.append('role', role);
            formData.append('status', status);
            formData.append('branch_id', branchId);
        }

        try {
            const res = await fetch('../scripts/approve_user.php', {
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            });

            const result = await res.json();

            if (!result.success) {
                notify('error', 'Action Failed', result.message, 2000);
                return;
            }

            notify('success', 'Success', result.message, 2000);

            row.remove();
            const newCount = Math.max(0, Number(counterEl.textContent) - 1);
            counterEl.textContent = newCount;
            counterEl.classList.toggle('hidden', newCount === 0);

        } catch {
            notify('error', 'Server Error', 'Action failed', 2000);
        }
    });
});
