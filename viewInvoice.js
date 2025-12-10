/*
Romario Porteous
2305778
UE3
Web Programming
Individual Assignment #2
*/

// Elements
const invoiceContainer = document.getElementById("invoiceContainer");
const searchBtn = document.getElementById("searchInvoiceBtn");
const invoiceCodeInput = document.getElementById("invoiceCode");
const seeAllBtn = document.getElementById("seeAllInvoicesBtn"); // optional button in HTML
const errorEl = document.getElementById("invoiceError");

// Get current logged-in TRN
const currentTRN = localStorage.getItem("currentUserTRN");

// Helper to render a single invoice
function renderInvoice(inv) {
    return `
        <div class="invoice">
            <h2>Invoice #: ${inv.invoiceNumber}</h2>
            <p>Date: ${inv.date}</p>
            <p>Customer: ${inv.customerName || "Guest"}</p>
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
            <p>Total Cost: $${inv.total.toFixed(2)}</p>
            <hr>
        </div>
    `;
}

// Display invoices for current logged-in user
function displayUserInvoices() {
    invoiceContainer.innerHTML = "";
    errorEl.textContent = "";

    const regData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    const user = regData.find(u => u.trn === currentTRN);

    if (!user || !user.invoices || user.invoices.length === 0) {
        invoiceContainer.innerHTML = "<p>No invoices found for your account.</p>";
        return;
    }

    user.invoices.forEach(inv => {
        invoiceContainer.innerHTML += renderInvoice(inv);
    });
}

// Search invoice by code (can be used as admin)
function searchInvoiceByCode(code) {
    const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    const invoice = allInvoices.find(inv => inv.invoiceNumber === code);

    invoiceContainer.innerHTML = "";
    errorEl.textContent = "";

    if (!invoice) {
        errorEl.textContent = "Invoice not found.";
        return;
    }

    invoiceContainer.innerHTML = renderInvoice(invoice);
}

// Display all invoices (admin feature placeholder)
function displayAllInvoices() {
    const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    invoiceContainer.innerHTML = "";
    errorEl.textContent = "";

    if (allInvoices.length === 0) {
        invoiceContainer.innerHTML = "<p>No invoices found.</p>";
        return;
    }

    allInvoices.forEach(inv => {
        invoiceContainer.innerHTML += renderInvoice(inv);
    });
}

// Event listeners
if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        const code = invoiceCodeInput.value.trim();
        if (!code) {
            errorEl.textContent = "Please enter an invoice number.";
            return;
        }
        searchInvoiceByCode(code);
    });
}

if (seeAllBtn) {
    seeAllBtn.addEventListener("click", displayAllInvoices);
}

// On page load, show invoices for logged-in user
displayUserInvoices();
