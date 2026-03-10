/* =========================================================
    SELL.JS - FULL CODE
    (PDO Integrated + notify() implemented)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const displayArea = document.querySelector('.sell-top-left');
    const receiptArea = document.querySelector('.payment'); 
    
    const discountInputField = document.querySelector('.discount-input');
    const applyDiscountBtn = document.querySelector('.discount-bottom button');

    let cart = [];
    let companyInfo = null;
    let appliedDiscount = 0;

    if (searchInput) searchInput.focus();

    fetch('../scripts/get-company.php')
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                companyInfo = data.data;
                renderReceipt();
            }
        });

    function loadProducts(searchTerm = '') {
        const url = `../scripts/search-products.php?limit=50&search=${encodeURIComponent(searchTerm)}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') renderProductTable(data.products);
            });
    }

    function renderProductTable(products) {
        if (!products || products.length === 0) {
            displayArea.innerHTML = `<p style="text-align:center; padding:50px; opacity:0.5;">No products found.</p>`;
            return;
        }

        let html = `<table class="cart-item-table">
            <thead><tr>
                <th width="80">Image</th><th style="text-align:left;">Details</th>
                <th>Stock</th><th>Price</th><th width="120">Qty</th><th width="140">Action</th>
            </tr></thead><tbody>`;

        products.forEach(item => {
            const img = item.picture_url ? item.picture_url.split('/').pop() : 'default.png';
            html += `
                <tr class="cart-item-row" data-item='${JSON.stringify(item).replace(/'/g, "&apos;")}'>
                    <td><div class="picture-placeholder"><img src="../assets/images/products/${img}" onerror="this.src='../assets/images/products/default.png'" style="width:100%; height:100%; object-fit:contain;"></div></td>
                    <td style="text-align:left;"><b>${item.name}</b><br><small>${item.code}</small></td>
                    <td>${item.stock}</td>
                    <td>${parseFloat(item.unit_price).toLocaleString()}</td>
                    <td>
                        <div class="qty-control">
                            <button class="qty-btn minus" onclick="stepQty(this, -1); return false;">-</button>
                            <input type="number" class="qty-input" value="1" min="1" style="width: 40px; text-align: center;">
                            <button class="qty-btn plus" onclick="stepQty(this, 1); return false;">+</button>
                        </div>
                    </td>
                    <td><button class="btn btn-save btn-add">Add</button></td>
                </tr>`;
        });
        displayArea.innerHTML = html + `</tbody></table>`;
    }

    window.stepQty = function(btn, change) {
        const input = btn.parentNode.querySelector('.qty-input');
        let val = parseInt(input.value) || 1;
        input.value = Math.max(1, val + change);
    };

    function renderReceipt() {
        if (cart.length === 0) {
            receiptArea.innerHTML = `<div style="display:flex; align-items:center; justify-content:center; height:100%; opacity:0.3; font-style:italic;">No items added to receipt.</div>`;
            return;
        }

        const name = companyInfo ? companyInfo.name : "Swift POS";
        const addr = companyInfo ? companyInfo.address : "";
        const tel  = companyInfo ? companyInfo.phone : "";
        const foot = companyInfo ? companyInfo.receipt_footer : "";

        let subtotal = 0;
        let itemsHtml = cart.map(item => {
            const line = item.unit_price * item.quantity;
            subtotal += line;
            return `<tr>
                <td style="padding:8px 0; border-bottom:1px dashed #ccc;">
                    <div style="font-weight:bold;">${item.name}</div>
                    <small style="color:#555;">${item.quantity} x ${parseFloat(item.unit_price).toLocaleString()}</small>
                </td>
                <td style="text-align:right; vertical-align:top; padding:8px 0; border-bottom:1px dashed #ccc;">
                    ${line.toLocaleString()}
                </td>
            </tr>`;
        }).join('');

        const totalAmount = Math.max(0, subtotal - appliedDiscount);

        receiptArea.innerHTML = `
            <div class="receipt-wrapper" style="display:flex; flex-direction:column; width:100%; height:100%; font-family:'Courier New', monospace; background:#fff; color:#000; box-sizing: border-box;">
                <div style="text-align:center; padding: 10px 5px; border-bottom: 2px solid #000;">
                    <h2 style="margin:0; text-transform:uppercase;">${name}</h2>
                    <div style="font-size: 13px;">${addr}</div>
                    <div style="font-size: 13px;">Tel: ${tel}</div>
                </div>

                <div class="receipt-content" style="flex-grow:1; overflow-y:auto; padding: 10px 5px;">
                    <table style="width:100%; border-collapse:collapse; font-size:14px;">
                        <thead>
                            <tr style="border-bottom:1px solid #000;">
                                <th style="text-align:left;">Description</th>
                                <th style="text-align:right;">Total</th>
                            </tr>
                        </thead>
                        <tbody>${itemsHtml}</tbody>
                    </table>
                </div>

                <div style="padding:15px 5px; border-top:2px solid #000; background:#fefefe;">
                    <div style="display:flex; justify-content:space-between; font-size:14px;">
                        <span>Subtotal</span>
                        <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div style="border-top: 1px dashed #000; margin: 8px 0;"></div>
                    <div style="display:flex; justify-content:space-between; font-size:14px; color:${appliedDiscount > 0 ? 'red' : 'inherit'};">
                        <span>Discount</span>
                        <span>-${appliedDiscount.toLocaleString()}</span>
                    </div>
                    <div style="border-top: 2px solid #000; margin: 10px 0;"></div>
                    <div style="display:flex; justify-content:space-between; font-weight:bold; font-size:1.2rem; margin-bottom:10px;">
                        <span>TOTAL</span>
                        <span>KES ${totalAmount.toLocaleString()}</span>
                    </div>
                    <div style="text-align:center; font-size:11px; padding: 5px 0; border-top:1px dashed #000; margin-bottom:10px;">${foot}</div>
                    <button class="btn btn-save" id="confirm-sale-btn" style="width:100%; padding:15px; background:#28a745; color:#fff; border:none; cursor:pointer; font-weight:bold; border-radius:4px;">CONFIRM SALE</button>
                    <button id="clear-receipt" style="display:block; margin:10px auto 0; background:none; border:none; color:red; cursor:pointer; text-decoration:underline; font-size:12px;">Void Sale</button>
                </div>
            </div>
        `;
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add')) {
            const row = e.target.closest('.cart-item-row');
            const data = JSON.parse(row.getAttribute('data-item'));
            const qty = parseInt(row.querySelector('.qty-input').value) || 1;
            const existing = cart.find(i => i.code === data.code);
            if (existing) existing.quantity += qty;
            else cart.push({ ...data, quantity: qty });
            renderReceipt();
        }

        if (e.target.id === 'clear-receipt') { 
            if(confirm("Clear sale?")) { cart = []; appliedDiscount = 0; renderReceipt(); } 
        }

        if (e.target.id === 'confirm-sale-btn') {
            if (cart.length === 0) return;
            const btn = e.target;
            btn.disabled = true;
            btn.innerText = "SAVING...";

            fetch('../scripts/save-sale.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cart: cart, discount: appliedDiscount })
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    cart = []; appliedDiscount = 0; renderReceipt(); loadProducts();
                    notify('success', 'Sale Saved', data.message);
                } else {
                    notify('error', 'Sale Failed', data.message);
                }
            }).finally(() => { btn.disabled = false; btn.innerText = "CONFIRM SALE"; });
        }
    });

    /**
     * 5. DISCOUNT LOGIC WITH notify()
     */
    if (applyDiscountBtn) {
        applyDiscountBtn.addEventListener('click', () => {
            const val = discountInputField.value.trim();
            if (val === "") {
                appliedDiscount = 0;
                renderReceipt();
                return;
            }

            if (!isNaN(val)) {
                appliedDiscount = parseFloat(val);
                notify('success', 'Manual Discount', `KES ${appliedDiscount} applied.`);
                renderReceipt();
            } 
            else {
                notify('info', 'Checking Code', 'Validating coupon...');
                fetch('../scripts/check-coupon.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `code=${encodeURIComponent(val)}`
                })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        appliedDiscount = parseFloat(data.discount);
                        notify('success', 'Coupon Applied', `Code ${val} accepted.`);
                    } else {
                        appliedDiscount = 0;
                        notify('error', 'Invalid Coupon', data.message);
                    }
                    renderReceipt();
                });
            }
        });
    }

    let timer;
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(timer);
            timer = setTimeout(() => loadProducts(searchInput.value), 300);
        });
    }

    loadProducts();
});