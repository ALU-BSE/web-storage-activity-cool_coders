 // Generate CSRF token and add it to the form
 const csrfToken = Math.random().toString(36).substr(2);
 document.getElementById('login-form').innerHTML += `<input type="hidden" name="csrfToken" value="${csrfToken}">`;

 // Apply the saved theme when the page loads
 function applyTheme() {
     const savedTheme = localStorage.getItem('theme') || 'light';
     const themeToggleButton = document.getElementById('themeToggle');
     const sunIcon = document.getElementById('sunIcon');
     const moonIcon = document.getElementById('moonIcon');
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

 // Change theme based on toggle
 document.getElementById('themeToggle').addEventListener('change', function () {
     document.body.classList.toggle('dark-mode');
     const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
     localStorage.setItem('theme', currentTheme);
     const sunIcon = document.getElementById('sunIcon');
     const moonIcon = document.getElementById('moonIcon');
     if (currentTheme === 'dark') {
         sunIcon.style.display = 'none';
         moonIcon.style.display = 'block';
     } else {
         sunIcon.style.display = 'block';
         moonIcon.style.display = 'none';
     }
 });