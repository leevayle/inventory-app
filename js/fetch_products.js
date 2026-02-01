document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('.cart-item-container .cart-item-table tbody');
    const pageLimitSelect = document.getElementById('pageLimit');
    const searchInput = document.getElementById('search');

    const firstBtn = document.getElementById('firstPage');
    const prevBtn  = document.getElementById('prevPage');
    const nextBtn  = document.getElementById('nextPage');
    const lastBtn  = document.getElementById('lastPage');
    const pageInfo = document.getElementById('pageInfo');

    if (!tbody || !pageLimitSelect || !searchInput) return;

    let currentPage = 1;
    let totalPages  = 1;
    let searchTerm  = '';
    let debounceTimer = null;

    function fetchProducts() {
        const limit = pageLimitSelect.value;

        const params = new URLSearchParams({
            limit,
            page: currentPage,
            search: searchTerm
        });

        fetch(`../scripts/fetch_products.php?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                if (data.status !== 'success') {
                    console.warn('Fetch failed:', data.message);
                    return;
                }

                tbody.innerHTML = '';

                data.products.forEach(prod => {
                    const tr = document.createElement('tr');
                    tr.classList.add('cart-item-row');

                    tr.innerHTML = `
                        <td class="item-code">${prod.code}</td>
                        <td class="item-name poppins" style="text-align:left;">${prod.name}</td>
                        <td>
                            <div class="qty-control">
                                <button type="button" class="qty-btn minus">-</button>
                                <input type="number" class="qty-input" value="${prod.stock}" min="1">
                                <button type="button" class="qty-btn plus">+</button>
                            </div>
                        </td>
                        <td class="item-amount">${Number(prod.unit_price).toFixed(2)}</td>
                        <td>
                            <div class="picture-placeholder">
                                <img class="full" src="../${prod.picture_url || 'assets/images/products/placeholder.png'}">
                            </div>
                        </td>
                        <td>
                            <div class="action-buttons">
                                <button class="btn btn-save">Update</button>
                                <button class="btn btn-edit">Edit</button>
                                <button class="btn btn-delete">Delete</button>
                            </div>
                        </td>
                    `;

                    tbody.appendChild(tr);
                });

                totalPages = Math.max(1, Math.ceil(data.total / limit));
                pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

                firstBtn.disabled = currentPage === 1;
                prevBtn.disabled  = currentPage === 1;
                nextBtn.disabled  = currentPage === totalPages;
                lastBtn.disabled  = currentPage === totalPages;
            })
            .catch(console.error);
    }

    // initial load
    fetchProducts();

    // page size change
    pageLimitSelect.addEventListener('change', () => {
        currentPage = 1;
        fetchProducts();
    });

    // live search (debounced)
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            searchTerm = searchInput.value.trim();
            currentPage = 1;
            fetchProducts();
        }, 300);
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            fetchProducts();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchProducts();
        }
    });

    firstBtn.addEventListener('click', () => {
        currentPage = 1;
        fetchProducts();
    });

    lastBtn.addEventListener('click', () => {
        currentPage = totalPages;
        fetchProducts();
    });
});
