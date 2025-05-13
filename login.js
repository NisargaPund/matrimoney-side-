document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.querySelector('input[name="remember"]').checked;

        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Password validation
        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        // Show loading state
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Signing in...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Here you would typically make an API call to your backend
            console.log('Login attempt:', { email, password, remember });
            
            // Check if this is first login (you would typically get this from your backend)
            const isFirstLogin = true; // This should come from your backend
            
            // Redirect based on login status
            if (isFirstLogin) {
                window.location.href = 'welcome.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        }, 1500);
    });

    // Google login
    const googleLoginBtn = document.querySelector('.google-login');
    googleLoginBtn.addEventListener('click', function() {
        // Here you would implement Google OAuth login
        console.log('Google login clicked');
        alert('Google login functionality will be implemented soon');
    });
});