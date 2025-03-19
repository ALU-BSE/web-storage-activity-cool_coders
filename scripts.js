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

    // Form validation functions
    function validateUsername(username) {
        const regex = /^[a-zA-Z0-9_]{3,20}$/;
        if (!username.trim()) {
            return "Username is required";
        } else if (!regex.test(username)) {
            return "Username must be 3-20 characters and can only contain letters, numbers, and underscores";
        }
        return "";
    }
    
    function validatePassword(password) {
        if (!password) {
            return "Password is required";
        } else if (password.length < 8) {
            return "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])/.test(password)) {
            return "Password must contain at least one lowercase letter";
        } else if (!/(?=.*[A-Z])/.test(password)) {
            return "Password must contain at least one uppercase letter";
        } else if (!/(?=.*\d)/.test(password)) {
            return "Password must contain at least one number";
        }
        return "";
    }
    
    // Input validation listeners
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");
    
    usernameInput.addEventListener("input", function() {
        usernameError.textContent = validateUsername(this.value);
    });
    
    passwordInput.addEventListener("input", function() {
        passwordError.textContent = validatePassword(this.value);
    });

    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();
        
        // Validate on submit
        const usernameValue = usernameInput.value;
        const passwordValue = passwordInput.value;
        
        const usernameErrorMsg = validateUsername(usernameValue);
        const passwordErrorMsg = validatePassword(passwordValue);
        
        usernameError.textContent = usernameErrorMsg;
        passwordError.textContent = passwordErrorMsg;
        
        // If no validation errors, proceed with login
        if (!usernameErrorMsg && !passwordErrorMsg) {
            showModal("Login successful. Welcome, " + usernameValue + "!");
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("logoutButton").style.display = "block";
            document.getElementById("loginSuccess").style.display = "block";
            
            // Store login info in localStorage
            localStorage.setItem("loggedInUser", usernameValue);
        }
    });

    document.getElementById("logoutButton").addEventListener("click", function () {
        showModal("Logout successful. See you again soon!");
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("logoutButton").style.display = "none";
        document.getElementById("loginSuccess").style.display = "none";
        
        // Clear user data from localStorage
        localStorage.removeItem("loggedInUser");
    });

    document.getElementById("modalOverlay").addEventListener("click", closeModal);
    
    // Check if user is already logged in
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("logoutButton").style.display = "block";
        document.getElementById("loginSuccess").style.display = "block";
    }
});

// Add to your scripts.js file
document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    
    inputs.forEach(input => {
        // Mark as touched after user interaction
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.add('touched');
            }
        });
        
        // Remove touched class when input is cleared
        input.addEventListener('input', function() {
            if (this.value.trim() === '') {
                this.classList.remove('touched');
            }
        });
    });
});