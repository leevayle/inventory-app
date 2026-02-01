//fetch products
document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('.cart-item-container .cart-item-table tbody');

    if (!tbody) return;

    fetch('../scripts/fetch_products.php')
        .then(res => res.json())
        .then(data => {
            if (data.status !== 'success') {
                console.warn('Failed to fetch products:', data.message);
                return;
            }

            tbody.innerHTML = ''; // clear existing rows

            data.products.forEach(prod => {
                const tr = document.createElement('tr');
                tr.classList.add('cart-item-row');

                tr.innerHTML = `
                    <td class="item-code">${prod.code}</td>
                    <td class="item-name poppins" style="text-align:left;">${prod.name}</td>
                    <td>
                        <div class="qty-control">
                            <button type="button" class="qty-btn minus">-</button>
                            <input type="number" class="qty-input" value="${prod.stock}" min="1" step="1">
                            <button type="button" class="qty-btn plus">+</button>
                        </div>
                    </td>
                    <td class="item-amount">${Number(prod.unit_price).toFixed(2)}</td>
                    <td>
                        <div class="picture-placeholder">
                            <img class="full" src="../${prod.picture_url || 'assets/images/products/placeholder.png'}" alt="${prod.name}">
                        </div>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button type="button" class="btn btn-save">Update</button>
                            <button type="button" class="btn btn-edit">Edit</button>
                            <button type="button" class="btn btn-delete">Delete</button>
                        </div>
                    </td>
                `;

                tbody.appendChild(tr);
            });
        })
        .catch(err => {
            console.error('Error fetching products:', err);
        });
});