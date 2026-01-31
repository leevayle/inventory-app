document.addEventListener('DOMContentLoaded', async () => {
    const counterEl = document.getElementById('approval-request-counter');
    const profileImg = document.getElementById('profile-pic');
    const tableBody = document.querySelector('.signup-table tbody');

    if (!counterEl || !profileImg || !tableBody) {
        console.warn('Required elements missing');
        return;
    }

    function getProfileUrl(dbPath) {
        if (!dbPath || dbPath === 'NULL') {
            dbPath = '/inventory-app/assets/images/profiles/default.jpg';
        } else if (!dbPath.startsWith('/') && !dbPath.startsWith('http')) {
            dbPath = '/inventory-app/' + dbPath.replace(/^(\.\/|\.\.\/)+/, '');
        }
        return dbPath + '?v=' + new Date().getTime();
    }

    try {
        const res = await fetch('../scripts/approve.php', { credentials: 'same-origin' });

        if (!res.ok) {
            notify('error', 'Fetch Failed', 'Could not reach server', 2000);
            return;
        }

        const data = await res.json();

        // Profile image
        if (data.user && data.user.profile_url) {
            profileImg.src = getProfileUrl(data.user.profile_url);
        }

        // Counter
        if (typeof data.pendingCount === 'number') {
            counterEl.textContent = data.pendingCount;
            counterEl.classList.toggle('hidden', data.pendingCount === 0);
        }

        // 🔥 Populate pending users table
        tableBody.innerHTML = ''; // clear dummy rows

        if (Array.isArray(data.pendingUsers)) {
            data.pendingUsers.forEach((u, index) => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${u.username}</td>
                    <td>${u.phone}</td>

                    <td>
                        <select name="users[${u.id}][role]">
                            <option value="cashier">Cashier</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">S.Admin</option>
                        </select>
                    </td>

                    <td>
                        <select name="users[${u.id}][branch]">
                            <option value="">Select branch</option>
                            <option value="1">Main Branch</option>
                            <option value="2">Westlands</option>
                            <option value="3">Kisii</option>
                        </select>
                    </td>

                    <td>
                        <select name="users[${u.id}][status]">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </td>

                    <td class="row-actions">
                        <button type="button" class="btn success approve-btn" data-id="${u.id}">Approve</button>
                        <button type="button" class="btn danger reject-btn" data-id="${u.id}">Reject</button>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        }

    } catch (err) {
        console.error('Error fetching approve.php:', err);
        counterEl.classList.add('hidden');
        notify('error', 'Server Error', 'Failed to load data', 2000);
    }
});









//approve user
// approve / reject pending users
document.addEventListener('DOMContentLoaded', async () => {
    const counterEl = document.getElementById('approval-request-counter');
    const profileImg = document.getElementById('profile-pic');
    const tableBody = document.querySelector('.signup-table tbody');

    if (!counterEl || !profileImg || !tableBody) {
        console.warn('Required elements missing');
        return;
    }

    function getProfileUrl(dbPath) {
        if (!dbPath || dbPath === 'NULL') {
            dbPath = '/inventory-app/assets/images/profiles/default.jpg';
        } else if (!dbPath.startsWith('/') && !dbPath.startsWith('http')) {
            dbPath = '/inventory-app/' + dbPath.replace(/^(\.\/|\.\.\/)+/, '');
        }
        return dbPath + '?v=' + Date.now();
    }

    try {
        const res = await fetch('../scripts/approve.php', { credentials: 'same-origin' });
        const data = await res.json();

        if (data.user?.profile_url) {
            profileImg.src = getProfileUrl(data.user.profile_url);
        }

        counterEl.textContent = data.pendingCount || 0;
        counterEl.classList.toggle('hidden', !data.pendingCount);

        tableBody.innerHTML = '';

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

    } catch {
        notify('error', 'Server Error', 'Failed to load data', 2000);
    }

    // 🔥 SOLID EVENT DELEGATION
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

        if (action === 'approve') {
            if (!role || !status) {
                notify('error', 'Missing Data', 'Select role and status first', 2000);
                return;
            }
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
            counterEl.textContent = Math.max(0, Number(counterEl.textContent) - 1);
            counterEl.classList.toggle('hidden', counterEl.textContent == 0);

        } catch {
            notify('error', 'Server Error', 'Action failed', 2000);
        }
    });
});
