// Handle login process
function login(event) {
    event.preventDefault();
    // Get CSRF token from the form
    const csrfToken = document.querySelector('input[name="csrfToken"]').value;
    // Validate CSRF token (for demonstration purposes, we'll just log it)
    console.log('CSRF Token:', csrfToken);

    // Sanitize user input
    const username = encodeURIComponent(document.getElementById('username').value);
    const password = encodeURIComponent(document.getElementById('password').value);

    // Set cookie on login
    const d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
    const expires = "expires=" + d.toUTCString();
    document.cookie = "authToken=user123; " + expires + "; path=/";
    window.location.href = 'dashboard.html';  // Redirect to the dashboard page
}

// Delete cookie on logout
document.getElementById('logoutButton').addEventListener('click', function() {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    window.location.href = 'index.html';  // Redirect to the login page
});

// Add item to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = this.getAttribute('data-price');
        const image = this.parentElement.querySelector('img').getAttribute('src'); // Get the image URL
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;  // Increase quantity if item already exists
        } else {
            cart.push({ name, price, image, quantity: 1 });  // Add new item to the cart
        }
        sessionStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    });
});

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    document.getElementById('cartCount').textContent = cart.length;  // Update the cart item count
}

// Display cart items
function displayCartItems() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cartItems');
    if (cartItemsDiv) {
        cartItemsDiv.innerHTML = '';  // Clear current cart items
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <p>${encodeURIComponent(item.name)} - $${encodeURIComponent(item.price)} x ${encodeURIComponent(item.quantity)}</p>
                </div>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
    }
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.style.display = cart.length > 0 ? 'block' : 'none';  // Show checkout button if cart is not empty
    }
}

// Display cart items on page load
window.addEventListener('load', function() {
    updateCartCount();
    displayCartItems();
    applyTheme();  // Apply saved theme on page load
});

// Modal functionality
const modal = document.getElementById('cartModal');
const cartLink = document.getElementById('cartLink');
const closeModal = document.getElementsByClassName('close')[0];

// Open cart modal
cartLink.onclick = function() {
    modal.style.display = 'block';
    displayCartItems();
}

// Close cart modal
closeModal.onclick = function() {
    modal.style.display = 'none';
}

// Close modal if clicked outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Checkout button functionality
document.getElementById('checkoutButton').addEventListener('click', function() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '<p>Checkout successful!</p>';
    sessionStorage.removeItem('cart');  // Clear cart after checkout
    updateCartCount();
    displayCartItems();
});

// Theme toggle functionality
const themeToggleButton = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Change theme based on toggle
themeToggleButton.addEventListener('change', function () {
    // Toggle dark mode class on the body
    document.body.classList.toggle('dark-mode');
    
    // Save the theme in localStorage
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);

    applyTheme(); 
    
    // Toggle visibility of the icons
    if (currentTheme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
});

// Apply the saved theme when the page loads
function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleButton.checked = true; // Keep the checkbox checked
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggleButton.checked = false; // Uncheck if light theme
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

// Call applyTheme on page load to set the theme based on user preference
window.addEventListener('load', applyTheme);