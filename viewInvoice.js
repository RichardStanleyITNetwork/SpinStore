/*
Romario Porteous
2305778
UE3
Web Programming
Individual Assignment #2
*/

const invoiceContainer = document.getElementById("invoiceContainer");
const searchBtn = document.getElementById("searchInvoiceBtn");
const invoiceCodeInput = document.getElementById("invoiceCode");
const errorEl = document.getElementById("invoiceError");

// Render a single invoice
function renderInvoice(inv) {
    return `
        <div class="invoice">
            <h2>Invoice #: ${inv.invoiceNumber}</h2>
            <p>Date: ${inv.date}</p>
            <p>Customer: ${inv.customerName}</p>
            <p>TRN: ${inv.trn}</p>
            <p>Shipping Address: ${inv.shippingAddress}</p>
            <h3>Items:</h3>
            <table border="1" cellspacing="0" cellpadding="5">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${inv.items.map(item => {
                        const itemTotal = (item.price * item.quantity) - (item.discount || 0);
                        return `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.price.toFixed(2)}</td>
                                <td>$${(item.discount || 0).toFixed(2)}</td>
                                <td>$${itemTotal.toFixed(2)}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
            <p>Subtotal: $${inv.subtotal.toFixed(2)}</p>
            <p>Taxes: $${inv.taxes.toFixed(2)}</p>
            <p>Total: $${inv.total.toFixed(2)}</p>
            <hr>
        </div>
    `;
}

// Display all invoices
function displayAllInvoices() {
    invoiceContainer.innerHTML = "";
    const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    if (allInvoices.length === 0) {
        invoiceContainer.innerHTML = "<p>No invoices found.</p>";
        return;
    }
    allInvoices.forEach(inv => {
        invoiceContainer.innerHTML += renderInvoice(inv);
    });
}

// Search invoice by code
function searchInvoiceByCode(code) {
    invoiceContainer.innerHTML = "";
    errorEl.textContent = "";
    const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    const invoice = allInvoices.find(inv => inv.invoiceNumber === code);
    if (!invoice) {
        errorEl.textContent = "Invoice not found.";
        return;
    }
    invoiceContainer.innerHTML = renderInvoice(invoice);
}

// Event: search button
searchBtn.addEventListener("click", () => {
    const code = invoiceCodeInput.value.trim();
    if (!code) {
        errorEl.textContent = "Please enter an invoice number.";
        return;
    }
    searchInvoiceByCode(code);
});

// Admin demo button to see all invoices (can be added in HTML)
const seeAllBtn = document.getElementById("seeAllInvoices");
if (seeAllBtn) {
    seeAllBtn.addEventListener("click", () => displayAllInvoices());
}

// On load: show logged-in user's invoices if TRN exists
const currentTRN = localStorage.getItem("currentUserTRN");
if (currentTRN) {
    const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    const userInvoices = allInvoices.filter(inv => inv.trn === currentTRN);
    if (userInvoices.length === 0) {
        invoiceContainer.innerHTML = "<p>No invoices found for you.</p>";
    } else {
        userInvoices.forEach(inv => {
            invoiceContainer.innerHTML += renderInvoice(inv);
        });
    }
}
