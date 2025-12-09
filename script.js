/*
Romario Porteous
2305778
UE3
Web Programming
Individual Assignment #2
*/

// Add items to cart using localStorage
document.querySelectorAll(".AddToCartBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // check if item already exists
        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} added to cart!`);
    });
});

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartBody = document.getElementById("cartItems");
    cartBody.innerHTML = "";

    cart.forEach((item, index) => {
        let subtotal = item.price * item.quantity;
        let tax = subtotal * 0.15; 
        let total = subtotal + tax;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toLocaleString()}</td>
            <td>
                <button onclick="updateQty(${index}, -1)">-</button>
                ${item.quantity}
                <button onclick="updateQty(${index}, 1)">+</button>
            </td>
            <td>$${subtotal.toLocaleString()}</td>
            <td>$${tax.toLocaleString()}</td>
            <td>$${total.toLocaleString()}</td>
        `;
        cartBody.appendChild(row);
    });
}

function updateQty(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Only run cart code if the cart page exists
if (document.getElementById("cartItems")) {

    if (document.getElementById("clearCartBtn")) {
        document.getElementById("clearCartBtn").addEventListener("click", () => {
            localStorage.removeItem("cart");
            loadCart();
        });
    }

    if (document.getElementById("checkoutBtn")) {
        document.getElementById("checkoutBtn").addEventListener("click", () => {
            window.location.href = "checkout.html";
        });
    }

    loadCart(); 
}
