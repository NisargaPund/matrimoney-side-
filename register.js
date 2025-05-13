document.addEventListener('DOMContentLoaded', function() {
    // Form navigation
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const submitButton = document.querySelector('.submit-btn');
    let currentStep = 0;

    // Initialize form
    showStep(currentStep);

    // Next button click handler
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    // Previous button click handler
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    // Submit button click handler
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            submitForm();
        }
    });

    // Show current step
    function showStep(step) {
        formSteps.forEach((formStep, index) => {
            formStep.classList.remove('active');
            progressSteps[index].classList.remove('active');
        });

        formSteps[step].classList.add('active');
        progressSteps[step].classList.add('active');

        // Show/hide navigation buttons
        document.querySelectorAll('.prev-btn').forEach(btn => {
            btn.style.display = step === 0 ? 'none' : 'block';
        });

        document.querySelectorAll('.next-btn').forEach(btn => {
            btn.style.display = step === formSteps.length - 1 ? 'none' : 'block';
        });

        submitButton.style.display = step === formSteps.length - 1 ? 'block' : 'none';
    }

    // Validate current step
    function validateStep(step) {
        const currentFormStep = formSteps[step];
        const inputs = currentFormStep.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showError(input, 'This field is required');
            } else {
                clearError(input);
            }

            // Email validation
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    showError(input, 'Please enter a valid email address');
                }
            }

            // Phone validation
            if (input.name === 'phone' && input.value) {
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(input.value)) {
                    isValid = false;
                    showError(input, 'Please enter a valid 10-digit phone number');
                }
            }

            // Password validation
            if (input.type === 'password' && input.value) {
                if (input.value.length < 8) {
                    isValid = false;
                    showError(input, 'Password must be at least 8 characters long');
                }
            }
        });

        return isValid;
    }

    // Show error message
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff4444';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';

        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }

        input.style.borderColor = '#ff4444';
    }

    // Clear error message
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = '#ddd';
    }

    // Photo upload functionality
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.querySelector('input[type="file"]');
    const previewArea = document.querySelector('.preview-area');
    const removePhotoBtn = document.querySelector('.remove-photo');

    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    previewArea.innerHTML = '';
                    previewArea.appendChild(img);
                    previewArea.appendChild(removePhotoBtn);
                    uploadArea.style.display = 'none';
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please upload an image file');
            }
        }
    });

    removePhotoBtn.addEventListener('click', () => {
        fileInput.value = '';
        previewArea.innerHTML = '';
        uploadArea.style.display = 'block';
    });

    // Form submission
    function submitForm() {
        const formData = new FormData();
        const inputs = document.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            if (input.type === 'file') {
                if (input.files[0]) {
                    formData.append(input.name, input.files[0]);
                }
            } else {
                formData.append(input.name, input.value);
            }
        });

        // Here you would typically send the formData to your server
        console.log('Form submitted:', Object.fromEntries(formData));
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.textAlign = 'center';
        successMessage.style.padding = '20px';
        successMessage.style.backgroundColor = '#4CAF50';
        successMessage.style.color = 'white';
        successMessage.style.borderRadius = '5px';
        successMessage.style.marginTop = '20px';
        successMessage.innerHTML = `
            <h3>Registration Successful!</h3>
            <p>Thank you for joining ReshimGathi. We'll review your profile and get back to you soon.</p>
            <div style="margin-top: 20px;">
                <a href="login.html" style="
                    display: inline-block;
                    padding: 12px 30px;
                    background-color: var(--white);
                    color: #4CAF50;
                    text-decoration: none;
                    border-radius: 25px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    margin-top: 15px;
                ">Sign In Now</a>
            </div>
        `;

        const form = document.querySelector('.registration-form');
        form.innerHTML = '';
        form.appendChild(successMessage);
    }

    const form = document.getElementById('registerForm');
    const successMessage = document.querySelector('.success-message');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default action
            e.stopPropagation(); // Stop event bubbling
            
            // Toggle password visibility
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // Show loading state
            const button = form.querySelector('.register-button');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            button.disabled = true;

            // Simulate API call (replace with actual API call)
            setTimeout(() => {
                // Redirect to register.html
                window.location.href = 'register.html';
            }, 1000);
        }
    });

    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');

        inputs.forEach(input => {
            if (!input.value) {
                showError(input, 'This field is required');
                isValid = false;
            } else {
                clearError(input);
            }

            // Additional validation for specific fields
            if (input.id === 'email' && !isValidEmail(input.value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            }

            if (input.id === 'mobile' && !isValidMobile(input.value)) {
                showError(input, 'Please enter a valid 10-digit mobile number');
                isValid = false;
            }

            if (input.id === 'password' && input.value.length < 8) {
                showError(input, 'Password must be at least 8 characters long');
                isValid = false;
            }
        });

        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidMobile(mobile) {
        return /^[0-9]{10}$/.test(mobile);
    }

    // Google Sign-in Button
    const googleLoginBtn = document.querySelector('.google-login');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function() {
            // Show loading state
            const originalContent = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            this.disabled = true;

            // Simulate Google sign-in process
            setTimeout(() => {
                // Here you would typically handle the Google OAuth flow
                console.log('Google sign-in clicked');
                
                // For demo purposes, show success message
                const form = document.getElementById('registerForm');
                const successMessage = document.querySelector('.success-message');
                if (form && successMessage) {
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                }
            }, 1500);
        });
    }
}); 