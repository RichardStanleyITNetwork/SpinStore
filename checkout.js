let grandTotal = 0;

function loadOrderSummary() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    grandTotal = 0;

    /*logic??????*/
    cart.forEach(item => {
        let subtotal = item.price * item.quantity;
        let tax = subtotal * 0.15;
        let totalWithTax = subtotal + tax;

        grandTotal += totalWithTax;
    });
    /* usage of DOM Manipulators*/
    document.getElementById("orderTotal").textContent =
        "Order Total: $" + grandTotal.toLocaleString();
}


loadOrderSummary();

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

    if (name === "") {
        document.getElementById("nameError").textContent = "Name is required.";
        isValid = false;
    }

    /*usage of form validation*/
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        document.getElementById("emailError").textContent = "Email is required.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Invalid email format.";
        isValid = false;
    }

    /*usage of form validation*/
    if (card.length !== 16 || isNaN(card)) {
        document.getElementById("cardError").textContent = "Card number must be 16 digits.";
        isValid = false;
    }

    if (isNaN(amountPaid)) {
       document.getElementById("amountError").textContent =
            "Please enter the amount being paid.";
        isValid = false;
    } else if (amountPaid !== parseFloat(grandTotal.toFixed(2))) {
        document.getElementById("amountError").textContent =
            "Amount must exactly match Order Total: $" + grandTotal.toFixed(2);
        isValid = false; 
    }

    if (address === "") {
        document.getElementById("addressError").textContent = "Address is required.";
        isValid = false;
    }

    

    return isValid;
}

/* usage of Event Handler*/
document.getElementById("placeOrderBtn").addEventListener("click", function () {
    if (validateForm()) {
        alert("Order placed successfully!");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    }
});

/* usage of Event handler*/
document.getElementById("cardNumber").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, ""); 
});
