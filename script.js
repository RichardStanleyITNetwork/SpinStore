// product list
let allProducts = [
    {
        name: "Vie",
        price: 7600,
        description: "Album: Vie<br>Artist: Doja Cat",
        image: "Assets/VIE by Doja.jpg",
        label: "newRelease"
    },
    {
        name: "Beauty Behind the Madness",
        price: 3500,
        description: "Album: Beauty Behind the Madness<br>Artist: The Weeknd",
        image: "Assets/BBTM by Abel.jpg",
        label: "saleRelease" 
    },
    {
        name: "Ctrl",
        price: 2500,
        description: "Album: CTRL<br>Artist: SZA",
        image: "Assets/Ctrl by SZA.jpg"
    },
    {
        name: "Freudian",
        price: 3500,
        description: "Album: Freudian<br>Artist: Daniel Caesar",
        image: "Assets/Freudian by Daniel Caesar.jpg"
    },
    {
        name: "good kid, m.a.a.d city",
        price: 1000,
        description: "Album: GKMC<br>Artist: Kendrick Lamar",
        image: "Assets/GKMC by Kenny.jpg",
        label: "newRelease" 
    },
    {
        name: "Mr & Mrs Morales",
        price: 3900,
        description: "Album: Mr & Mrs Morales<br>Artist: Kendrick Lamar",
        image: "Assets/Mr & mrs Morales by Kenny.jpg"
    },
    {
        name: "Scarlet",
        price: 4000,
        description: "Album: Scarlet<br>Artist: Doja Cat",
        image: "Assets/Scarlet by Doja.jpg",
        label: "newRelease" 
    },
    {
        name: "Utopia",
        price: 5000,
        description: "Album: Utopia<br>Artist: Travis Scott",
        image: "Assets/Utopia by Travis Scott.jpg"
    },
    {
        name: "Planet Her",
        price: 2900,
        description: "Album: Planet Her<br>Artist: Doja Cat",
        image: "Assets/Planet her by Doja.jpg"
    },
    {
        name: "Melodrama",
        price: 3400,
        description: "Album: Melodrama<br>Artist: Lorde",
        image: "Assets/melodrama by lorde.jpg",
        label: "saleRelease" 
    },
    {
        name: "Ruby",
        price: 6900,
        description: "Album: Ruby<br>Artist: Jennie",
        image: "Assets/Ruby by Jennie.jpg"
    },
    {
        name: "LUX",
        price: 8000,
        description: "Album: LUX<br>Artist: Rosalia",
        image: "Assets/Lux by Rosalia.jpg"
    }
];

// Save product list to localStorage
localStorage.setItem("AllProducts", JSON.stringify(allProducts));

// displaying products dynamically
function displayProducts() {
    const container = document.getElementById("productContainer");
    if (!container) return;

    allProducts.forEach(product => {
        let card = document.createElement("div");
        card.classList.add("child");
        
        //labels added dynamically
        let labelHTML = "";
        if (product.label === "saleRelease") {
            labelHTML = '<span class="saleRelease">* SALE *</span>';
        } else if (product.label === "newRelease") {
            labelHTML = '<span class="newRelease">* NEW RELEASE *</span>';
        }

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}<br><strong>$${product.price.toLocaleString()}</strong><br>${labelHTML}</p>
            <button class="AddToCartBtn" data-name="${product.name}" data-price="${product.price}">
                Add to Cart
            </button>
        `;


        container.appendChild(card);
    });
}

// run dynamic display on products page
displayProducts();


// Add items to cart using localStorage
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("AddToCartBtn")) {

        const name = event.target.dataset.name;
        const price = parseFloat(event.target.dataset.price);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
    }
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

