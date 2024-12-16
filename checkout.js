document.addEventListener("DOMContentLoaded", () => {
    const cartBody = document.getElementById("cart-body");
    const cartTotal = document.getElementById("cart-total");
    const successMessage = document.getElementById("success-message");
    const orderForm = document.getElementById("order-form");
    const paymentMethodSelect = document.getElementById("payment-method");
    const paymentDetails = document.querySelector(".payment-details");
    const cardNumber = document.getElementById("card-number");
    const expiryDate = document.getElementById("expiry-date");
    const cvv = document.getElementById("cvv");

    // Load Cart Data from Local Storage
    function loadCart() {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        let total = 0;
        const rows = cartItems.map((item) => {
            total += item.price * item.quantity;
            return `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
            `;
        });

        cartBody.innerHTML = rows.join("");
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Handle Payment Method Change
    paymentMethodSelect.addEventListener("change", () => {
        const paymentMethod = paymentMethodSelect.value;

        if (paymentMethod === "cash") {
            // Hid payment details and remove required attributes
            paymentDetails.style.display = "none";
            cardNumber.required = false;
            expiryDate.required = false;
            cvv.required = false;
        } else {
            // Show payment details and add required attributes
            paymentDetails.style.display = "block";
            cardNumber.required = true;
            expiryDate.required = true;
            cvv.required = true;
        }
    });

    // Order Submission
    orderForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Validate Inputs
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const address = document.getElementById("address").value.trim();
        const paymentMethod = paymentMethodSelect.value;

        if (!name || !email || !address || !paymentMethod) {
            alert("Please fill in all required fields.");
            return;
        }

        // Success Message
        successMessage.style.display = "block";

        // Clear Local Storage and Form
        localStorage.removeItem("cartItems");
        orderForm.reset();
        paymentDetails.style.display = "block"; // Reset payment details visibility

        // Optionally redirect after a delay
        setTimeout(() => {
            window.location.href = "index.html"; // Redirect to homepage or another page
        }, 5000);
    });

    // Initialize Page
    loadCart();
});
