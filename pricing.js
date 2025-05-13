document.addEventListener('DOMContentLoaded', function() {
    // Handle plan selection
    const planButtons = document.querySelectorAll('.select-plan-btn');
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planCard = this.closest('.plan-card');
            const planName = planCard.querySelector('h2').textContent;
            const planPrice = planCard.querySelector('.amount').textContent;
            const planPeriod = planCard.querySelector('.period').textContent;
            
            // Store selected plan in localStorage
            const selectedPlan = {
                name: planName,
                price: planPrice,
                period: planPeriod,
                features: Array.from(planCard.querySelectorAll('.plan-features li')).map(li => li.textContent.trim())
            };
            localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
            
            // Redirect to payment page (you can implement this later)
            alert(`You selected the ${planName} for ${planPrice}${planPeriod}`);
        });
    });

    // Handle add-on selection
    const addOnButtons = document.querySelectorAll('.add-on-btn');
    addOnButtons.forEach(button => {
        button.addEventListener('click', function() {
            const addOnCard = this.closest('.add-on-card');
            const addOnName = addOnCard.querySelector('h3').textContent;
            const addOnPrice = addOnCard.querySelector('.add-on-price').textContent;
            const addOnDuration = addOnCard.querySelector('.add-on-duration').textContent;
            
            // Store selected add-on in localStorage
            const selectedAddOn = {
                name: addOnName,
                price: addOnPrice,
                duration: addOnDuration
            };
            localStorage.setItem('selectedAddOn', JSON.stringify(selectedAddOn));
            
            // Toggle button state
            this.classList.toggle('selected');
            if (this.classList.contains('selected')) {
                this.textContent = 'Added to Plan';
                this.style.background = '#8B0000';
                this.style.color = 'white';
            } else {
                this.textContent = 'Add to Plan';
                this.style.background = '#fff';
                this.style.color = '#8B0000';
            }
        });
    });

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 