/*
Romario Porteous
2305778
UE3
Web Programming
Individual Assignment #2
*/

let grandTotal = 0;

// --- Load Order Summary ---
function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    grandTotal = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        const tax = subtotal * 0.15;
        const totalWithTax = subtotal + tax;
        grandTotal += totalWithTax;
    });

    document.getElementById("orderTotal").textContent =
        "Order Total: $" + grandTotal.toFixed(2);
}

loadOrderSummary();

// --- Form Validation ---
function validateForm() {
    let isValid = true;

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const card = document.getElementById("cardNumber").value.trim();
    const address = document.getElementById("address").value.trim();
    const amountPaid = parseFloat(document.getElementById("amount").value.trim());

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("cardError").textContent = "";
    document.getElementById("addressError").textContent = "";
    document.getElementById("amountError").textContent = "";

    // Name
    if (!name) {
        document.getElementById("nameError").textContent = "Name is required.";
        isValid = false;
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById("emailError").textContent = "Email is required.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Invalid email format.";
        isValid = false;
    }

    // Card
    if (card.length !== 16 || isNaN(card)) {
        document.getElementById("cardError").textContent = "Card number must be 16 digits.";
        isValid = false;
    }

    // Amount
    if (isNaN(amountPaid)) {
        document.getElementById("amountError").textContent =
            "Please enter the amount being paid.";
        isValid = false;
    } else if (amountPaid !== parseFloat(grandTotal.toFixed(2))) {
        document.getElementById("amountError").textContent =
            "Amount must exactly match Order Total: $" + grandTotal.toFixed(2);
        isValid = false;
    }

    // Address
    if (!address) {
        document.getElementById("addressError").textContent = "Address is required.";
        isValid = false;
    }

    return isValid;
}

// --- Place Order ---
document.getElementById("placeOrderBtn").addEventListener("click", function () {
    if (!validateForm()) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Cart is empty.");
        return;
    }

    const currentTRN = localStorage.getItem("currentUserTRN"); 
    const regData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    let customerName = document.getElementById("fullName").value.trim();
    let trnToUse = null;

    // If logged in, get customer info
    if (currentTRN) {
        const user = regData.find(u => u.trn === currentTRN);
        if (user) {
            customerName = `${user.firstName} ${user.lastName}`;
            trnToUse = user.trn;
        }
    }

    // Create invoice
    const invoice = {
        invoiceNumber: "INV-" + Date.now(),
        date: new Date().toLocaleDateString(),
        shippingAddress: document.getElementById("address").value.trim(),
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount || 0
        })),
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        taxes: cart.reduce((sum, item) => sum + (item.price * item.quantity * 0.15), 0),
        total: grandTotal,
        trn: trnToUse,
        customerName: customerName
    };

    // Append invoice to user's record if logged in
    if (trnToUse) {
        const userIndex = regData.findIndex(u => u.trn === trnToUse);
        regData[userIndex].invoices.push(invoice);
        localStorage.setItem("RegistrationData", JSON.stringify(regData));
    }

    // Append invoice to global invoices
    const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    allInvoices.push(invoice);
    localStorage.setItem("AllInvoices", JSON.stringify(allInvoices));

    // Clear cart
    localStorage.removeItem("cart");

    alert(`Order placed successfully! Invoice #${invoice.invoiceNumber} has been generated.`);
    window.location.href = "index.html";
});

// --- Card Number Input Sanitization ---
document.getElementById("cardNumber").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
});

// --- Cancel Button ---
document.getElementById("cancelBtn").addEventListener("click", () => {
    window.location.href = "cart.html";
});
