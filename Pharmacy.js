document.addEventListener("DOMContentLoaded", () => {
    const cartBody = document.getElementById("cart-body");
    const cartTotal = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-button");
    const saveFavoritesButton = document.getElementById("save-favorites");
    const loadFavoritesButton = document.getElementById("load-favorites");
    let favorites = {};
    let cartItems = []; // Global array for cart items

    // Function to update the cart
    function updateCart() {
        let total = 0;
        cartItems = []; // Clear cart items before updating

        // Select all dynamically rendered medicine inputs
        const medicineInputs = document.querySelectorAll(".medicine-item input[type='number']");

        medicineInputs.forEach((input) => {
            const quantity = parseInt(input.value);
            if (quantity > 0) {
                const name = input.parentElement.querySelector("h3").textContent;
                const price = parseFloat(input.dataset.price);
                const itemTotal = price * quantity;

                // Add to cart items array
                cartItems.push({
                    name,
                    quantity,
                    price,
                    itemTotal,
                });

                
                total += itemTotal;
            }
        });

        // Update Cart Table in Batch
        const cartRows = cartItems.map(
            (item) => `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.itemTotal.toFixed(2)}</td>
            </tr>
        `
        );
        cartBody.innerHTML = cartRows.join("");
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Save Cart to localStorage 
    checkoutButton.addEventListener("click", () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Save structured cart data to localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Redirect to the checkout page
        window.location.href = "checkout.html";
    });

    // Save Favorites
    saveFavoritesButton.addEventListener("click", () => {
        favorites = {};

        // Select all dynamically rendered medicine inputs
        const medicineInputs = document.querySelectorAll(".medicine-item input[type='number']");

        medicineInputs.forEach((input) => {
            const quantity = parseInt(input.value);
            if (quantity > 0) {
                favorites[input.id] = quantity;
            }
        });

        if (Object.keys(favorites).length > 0) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert("Favorites saved successfully!");
        } else {
            alert("No items to save as favorites!");
        }
    });

    // Load Favorites (Apply Favourites)
    loadFavoritesButton.addEventListener("click", () => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites"));

        if (savedFavorites && Object.keys(savedFavorites).length > 0) {
            Object.entries(savedFavorites).forEach(([id, quantity]) => {
                const input = document.getElementById(id);
                if (input) {
                    input.value = quantity;
                }
            });

            updateCart();
            alert("Favorites loaded successfully!");
        } else {
            alert("No favorites found!");
        }
    });

    // Event Delegation for "Add to Cart" Buttons
    document.getElementById("medicines-container").addEventListener("click", (event) => {
        if (
            event.target.tagName === "BUTTON" &&
            event.target.getAttribute("data-action") === "add-to-cart"
        ) {
            updateCart();
        }
    });

    // Initial Cart Update
    updateCart();
});
