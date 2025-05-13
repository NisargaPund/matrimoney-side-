document.addEventListener('DOMContentLoaded', function() {
    // Profile Preview Modal
    const profileCards = document.querySelectorAll('.profile-card');
    const profilePreviewModal = document.getElementById('profilePreviewModal');
    const closeProfilePreview = document.getElementById('closeProfilePreview');
    const previewPhoto = document.getElementById('previewPhoto');
    const previewName = document.getElementById('previewName');
    const previewDetails = document.getElementById('previewDetails');

    // Profile data (in real app, this would come from a database)
    const profileData = {
        priya: {
            name: 'Priya Desai',
            age: 27,
            city: 'Mumbai',
            photo: 'https://randomuser.me/api/portraits/women/44.jpg',
            about: 'Looking for a sincere life partner who values family and personal growth.',
            education: 'Bachelor\'s Degree',
            occupation: 'Software Engineer'
        },
        amit: {
            name: 'Amit Sharma',
            age: 29,
            city: 'Pune',
            photo: 'https://randomuser.me/api/portraits/men/32.jpg',
            about: 'Seeking a partner who shares my passion for technology and adventure.',
            education: 'Master\'s in Computer Science',
            occupation: 'Tech Lead'
        },
        sneha: {
            name: 'Sneha Kulkarni',
            age: 26,
            city: 'Nagpur',
            photo: 'https://randomuser.me/api/portraits/women/68.jpg',
            about: 'A creative soul looking for someone who appreciates art and culture.',
            education: 'Bachelor\'s in Fine Arts',
            occupation: 'Graphic Designer'
        },
        rahul: {
            name: 'Rahul Patil',
            age: 31,
            city: 'Nashik',
            photo: 'https://randomuser.me/api/portraits/men/45.jpg',
            about: 'Entrepreneur seeking a partner who shares my vision for growth.',
            education: 'MBA',
            occupation: 'Business Owner'
        }
    };

    // Handle profile card clicks
    profileCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the message button
            if (e.target.classList.contains('message-btn')) return;
            
            const profileId = this.dataset.profile;
            const profile = profileData[profileId];
            
            if (profile) {
                previewPhoto.src = profile.photo;
                previewName.textContent = profile.name;
                previewDetails.textContent = `${profile.age} • ${profile.city}`;
                
                // Update preview sections
                document.querySelector('.preview-section:nth-child(1) p').textContent = profile.about;
                document.querySelector('.preview-section:nth-child(2) p').textContent = profile.education;
                document.querySelector('.preview-section:nth-child(3) p').textContent = profile.occupation;
                
                profilePreviewModal.classList.add('active');
            }
        });
    });

    // Close profile preview modal
    if (closeProfilePreview) {
        closeProfilePreview.addEventListener('click', () => {
            profilePreviewModal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    if (profilePreviewModal) {
        profilePreviewModal.addEventListener('click', (e) => {
            if (e.target === profilePreviewModal) {
                profilePreviewModal.classList.remove('active');
            }
        });
    }

    // Handle unlock profile button click
    const unlockProfileBtn = document.querySelector('.unlock-profile-btn');
    if (unlockProfileBtn) {
        unlockProfileBtn.addEventListener('click', () => {
            window.location.href = 'pricing.html';
        });
    }

    // Message button functionality (existing code)
    const messageBtns = document.querySelectorAll('.message-btn');
    const messagePremiumModal = document.getElementById('messagePremiumModal');
    const closeMessageModal = document.getElementById('closeMessageModal');

    if (messageBtns && messagePremiumModal && closeMessageModal) {
        messageBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent profile card click
                messagePremiumModal.classList.add('active');
            });
        });
        closeMessageModal.addEventListener('click', () => {
            messagePremiumModal.classList.remove('active');
        });
        messagePremiumModal.addEventListener('click', (e) => {
            if (e.target === messagePremiumModal) {
                messagePremiumModal.classList.remove('active');
            }
        });
    }
}); 