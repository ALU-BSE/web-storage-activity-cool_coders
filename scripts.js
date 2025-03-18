document.addEventListener("DOMContentLoaded", function () {
    function showModal(message) {
        const modalMessage = document.getElementById("modalMessage");
        const modal = document.getElementById("modal");
        const modalOverlay = document.getElementById("modalOverlay");

        if (modalMessage && modal && modalOverlay) {
            modalMessage.textContent = message;
            modal.style.display = "block";
            modalOverlay.style.display = "block";
        }
    }

    function closeModal() {
        document.getElementById("modal").style.display = "none";
        document.getElementById("modalOverlay").style.display = "none";
    }

    document.getElementById("themeToggle").addEventListener("click", function () {
        const currentTheme = document.body.classList.contains("light") ? "light" : "dark";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        document.body.classList.remove(currentTheme);
        document.body.classList.add(newTheme);
        localStorage.setItem("theme", newTheme);
    });

    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(savedTheme);

    document.getElementById("addToCartButton").addEventListener("click", function () {
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        cart.push({ product: "Book", quantity: 1 });
        sessionStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
    });

    function displayCartItems() {
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        const cartItemsDiv = document.getElementById("cartItems");
        cartItemsDiv.innerHTML = "";
        cart.forEach((item) => {
            const itemDiv = document.createElement("div");
            itemDiv.textContent = `${item.product} - Quantity: ${item.quantity}`;
            cartItemsDiv.appendChild(itemDiv);
        });
    }

    displayCartItems();

    document.getElementById("csrfToken").value = Math.random().toString(36).substr(2);

    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();
        showModal("Login attempt made. Secure authentication should be handled on the server.");
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("logoutButton").style.display = "block";
        document.getElementById("loginSuccess").style.display = "block";
    });

    document.getElementById("logoutButton").addEventListener("click", function () {
        showModal("Logout request made. Server should clear the authentication cookie.");
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("logoutButton").style.display = "none";
        document.getElementById("loginSuccess").style.display = "none";
    });

    document.getElementById("modalOverlay").addEventListener("click", closeModal);
});
