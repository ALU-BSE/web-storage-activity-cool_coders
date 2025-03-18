// Set cookie on login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.cookie = "authToken=user123; expires=Fri, 31 Dec 2024 12:00:00 UTC; Secure; HttpOnly; path=/";
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'block';
    document.getElementById('loginSuccess').style.display = 'block';
});


// Delete cookie on logout
document.getElementById('logoutButton').addEventListener('click', function() {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('loginSuccess').style.display = 'none';
});

// Theme toggle functionality
document.getElementById('themeToggle').addEventListener('click', function() {
    const currentTheme = document.body.classList.contains('light') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
});

// Apply saved theme on page load
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme);
});

// Add item to cart
document.getElementById('addToCartButton').addEventListener('click', function() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push({ product: 'Book', quantity: 1 });
    sessionStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
});

// Display cart items
function displayCartItems() {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${encodeURIComponent(item.product)} - Quantity: ${encodeURIComponent(item.quantity)}`;
        cartItemsDiv.appendChild(itemDiv);
    });
}

// Display cart items on page load
window.addEventListener('load', displayCartItems);

// Generate and add CSRF token to form
window.addEventListener('load', function() {
    const csrfToken = Math.random().toString(36).substr(2);
    document.getElementById('csrfToken').value = csrfToken;
});