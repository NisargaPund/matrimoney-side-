document.addEventListener('DOMContentLoaded', function() {
    // Header functionality
    const profileBtn = document.getElementById('profileBtn');
    const notificationBtn = document.getElementById('notificationBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');

    // Profile dropdown toggle
    profileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = document.querySelector('.dropdown-menu');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        const dropdown = document.querySelector('.dropdown-menu');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    });

    // Notification button click
    notificationBtn.addEventListener('click', function() {
        // TODO: Implement notification panel
        alert('Notifications feature coming soon!');
    });

    // Logout functionality
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            // Clear user session
            localStorage.removeItem('currentUser');
            // Redirect to login page
            window.location.href = 'index.html';
        }
    });

    // Next page button functionality
    nextPageBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            renderUsersPage(currentPage);
            renderPagination();
            // Scroll to top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    const usersGrid = document.getElementById('usersGrid');
    const mainContainer = document.querySelector('.main-container');
    let users = JSON.parse(localStorage.getItem('usersList')) || [];

    // Identify the current user as the last submitted
    const currentUser = users.length > 0 ? users[users.length - 1] : null;

    // Demo/fake profiles
    const fakeProfiles = [
        { photo: 'https://randomuser.me/api/portraits/men/32.jpg', profileFor: 'Rohit Sharma', profession: 'Software Engineer', gender: 'Male', age: 29, location: 'Mumbai' },
        { photo: 'https://randomuser.me/api/portraits/women/44.jpg', profileFor: 'Priya Mehta', profession: 'Doctor', gender: 'Female', age: 27, location: 'Delhi' },
        { photo: 'https://randomuser.me/api/portraits/men/65.jpg', profileFor: 'Amit Verma', profession: 'Architect', gender: 'Male', age: 32, location: 'Pune' },
        { photo: 'https://randomuser.me/api/portraits/women/68.jpg', profileFor: 'Sneha Patil', profession: 'Marketing Manager', gender: 'Female', age: 26, location: 'Bangalore' },
        { photo: 'https://randomuser.me/api/portraits/men/12.jpg', profileFor: 'Suresh Kumar', profession: 'Banker', gender: 'Male', age: 35, location: 'Chennai' },
        { photo: 'https://randomuser.me/api/portraits/women/22.jpg', profileFor: 'Anjali Singh', profession: 'Lawyer', gender: 'Female', age: 30, location: 'Hyderabad' },
        { photo: 'https://randomuser.me/api/portraits/men/45.jpg', profileFor: 'Vikas Gupta', profession: 'Teacher', gender: 'Male', age: 28, location: 'Ahmedabad' },
        { photo: 'https://randomuser.me/api/portraits/women/55.jpg', profileFor: 'Ritu Desai', profession: 'Fashion Designer', gender: 'Female', age: 31, location: 'Kolkata' },
        { photo: 'https://randomuser.me/api/portraits/men/77.jpg', profileFor: 'Manoj Joshi', profession: 'Chef', gender: 'Male', age: 34, location: 'Surat' },
        { photo: 'https://randomuser.me/api/portraits/women/88.jpg', profileFor: 'Kavita Rao', profession: 'HR Manager', gender: 'Female', age: 29, location: 'Pune' },
        { photo: 'https://randomuser.me/api/portraits/men/99.jpg', profileFor: 'Deepak Shah', profession: 'Business Analyst', gender: 'Male', age: 33, location: 'Nagpur' },
        { photo: 'https://randomuser.me/api/portraits/women/11.jpg', profileFor: 'Meena Kumari', profession: 'Artist', gender: 'Female', age: 28, location: 'Lucknow' }
    ];

    // Remove the current user from the list (compare by mobile or email if available)
    function isSameUser(a, b) {
        if (!a || !b) return false;
        if (a.mobile && b.mobile) return a.mobile === b.mobile;
        if (a.email && b.email) return a.email === b.email;
        if (a.profileFor && b.profileFor) return a.profileFor === b.profileFor;
        return false;
    }
    users = users.filter(user => !isSameUser(user, currentUser));

    // Filter profiles based on current user's gender
    if (currentUser && currentUser.gender) {
        const oppositeGender = currentUser.gender === 'Male' ? 'Female' : 'Male';
        users = users.filter(user => user.gender === oppositeGender);
        fakeProfiles.forEach(profile => {
            if (profile.gender === oppositeGender) {
                users.push(profile);
            }
        });
    }

    // Always show at least 9 profiles
    if (users.length < 9) {
        const remainingProfiles = fakeProfiles.filter(profile => 
            !users.some(user => user.profileFor === profile.profileFor) && 
            (!currentUser || profile.gender === (currentUser.gender === 'Male' ? 'Female' : 'Male'))
        );
        users = users.concat(remainingProfiles.slice(0, 9 - users.length));
    }

    // Collect unique professions for filters
    const allProfessions = Array.from(new Set(users.map(u => u.profession))).sort();

    // Get min and max ages for age range filter
    const ages = users.map(u => u.age).filter(age => age);
    const minAge = Math.min(...ages);
    const maxAge = Math.max(...ages);

    // Pagination
    const profilesPerPage = 9;
    let currentPage = 1;
    let filteredUsers = users.slice();
    let totalPages = Math.ceil(filteredUsers.length / profilesPerPage);

    // Render filter bar
    function renderFilterBar() {
        let filterBar = document.getElementById('filterBar');
        if (filterBar) filterBar.remove();
        filterBar = document.createElement('div');
        filterBar.id = 'filterBar';
        filterBar.className = 'filter-bar';
        mainContainer.insertBefore(filterBar, usersGrid);
        filterBar.innerHTML = `
            <select class="filter-select" id="filterProfession">
                <option value="">All Professions</option>
                ${allProfessions.map(p => `<option value="${p}">${p}</option>`).join('')}
            </select>
            <div class="age-range-filter">
                <input type="number" id="minAge" min="${minAge}" max="${maxAge}" placeholder="Min Age" class="age-input">
                <span>to</span>
                <input type="number" id="maxAge" min="${minAge}" max="${maxAge}" placeholder="Max Age" class="age-input">
            </div>
            <button class="filter-btn" id="applyFilterBtn">Search</button>
        `;
        document.getElementById('applyFilterBtn').onclick = applyFilters;
    }

    function getProfilePhoto(user) {
        return user.photo || 'https://via.placeholder.com/120x120?text=Photo';
    }

    function createUserCard(user) {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.dataset.profile = user.profileFor.toLowerCase().replace(/\s+/g, '_');
        card.innerHTML = `
            <div class="user-image">
                <img src="${getProfilePhoto(user)}" alt="Profile Photo">
            </div>
            <div class="user-info">
                <h3 class="user-name">${user.profileFor || 'Name not set'}</h3>
                <p class="user-profession">${user.profession || 'Profession not set'}</p>
                <p class="user-details">${user.age ? user.age + ' years' : 'Age not set'} • ${user.location || 'Location not set'}</p>
            </div>
            <div class="user-actions">
                <button class="view-profile-btn">
                    <i class="fas fa-user"></i>
                    View Profile
                </button>
                <button class="message-btn">
                    <i class="fas fa-envelope"></i>
                    Message
                </button>
            </div>
        `;

        // Add click event for profile preview
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.message-btn') && !e.target.closest('.view-profile-btn')) {
                const profileData = {
                    name: user.profileFor,
                    age: user.age,
                    city: user.location,
                    photo: getProfilePhoto(user),
                    about: `Looking for a life partner who shares similar values and interests.`,
                    education: user.profession,
                    occupation: user.profession
                };
                showProfilePreview(profileData);
            }
        });

        // Add click event for message button
        const messageBtn = card.querySelector('.message-btn');
        messageBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent profile card click
            messagePremiumModal.classList.add('active');
        });

        // Add click event for view profile button
        const viewProfileBtn = card.querySelector('.view-profile-btn');
        viewProfileBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent profile card click
            const profileData = {
                name: user.profileFor,
                age: user.age,
                city: user.location,
                photo: getProfilePhoto(user),
                about: `Looking for a life partner who shares similar values and interests.`,
                education: user.profession,
                occupation: user.profession
            };
            showProfilePreview(profileData);
        });

        return card;
    }

    function applyFilters() {
        const profVal = document.getElementById('filterProfession').value;
        const minAgeVal = parseInt(document.getElementById('minAge').value) || minAge;
        const maxAgeVal = parseInt(document.getElementById('maxAge').value) || maxAge;

        filteredUsers = users.filter(u => {
            let match = true;
            if (profVal && u.profession !== profVal) match = false;
            if (u.age) {
                if (u.age < minAgeVal || u.age > maxAgeVal) match = false;
            }
            return match;
        });
        currentPage = 1;
        totalPages = Math.ceil(filteredUsers.length / profilesPerPage) || 1;
        renderUsersPage(currentPage);
        renderPagination();
    }

    function renderUsersPage(page) {
        usersGrid.innerHTML = '';
        const start = (page - 1) * profilesPerPage;
        const end = start + profilesPerPage;
        filteredUsers.slice(start, end).forEach(user => {
            usersGrid.appendChild(createUserCard(user));
        });
    }

    function renderPagination() {
        let pagination = document.getElementById('paginationBar');
        if (pagination) pagination.remove();
        if (totalPages <= 1) return; // No pagination if only one page
        pagination = document.createElement('div');
        pagination.id = 'paginationBar';
        pagination.className = 'pagination-bar';
        mainContainer.appendChild(pagination);
        let pagesHtml = '';
        if (currentPage > 1) {
            pagesHtml += `<button class="page-btn prev-btn" data-page="prev">Previous</button>`;
        }
        for (let i = 1; i <= totalPages; i++) {
            pagesHtml += `<button class="page-btn${i === currentPage ? ' active' : ''}" data-page="${i}">${i}</button>`;
        }
        if (currentPage < totalPages) {
            pagesHtml += `<button class="page-btn next-btn" data-page="next">Next</button>`;
        }
        pagination.innerHTML = pagesHtml;
        // Add event listeners
        pagination.querySelectorAll('.page-btn').forEach(btn => {
            btn.onclick = function() {
                const page = this.getAttribute('data-page');
                if (page === 'prev' && currentPage > 1) {
                    currentPage--;
                } else if (page === 'next' && currentPage < totalPages) {
                    currentPage++;
                } else if (!isNaN(parseInt(page))) {
                    currentPage = parseInt(page);
                }
                renderUsersPage(currentPage);
                renderPagination();
            };
        });
    }

    renderFilterBar();
    applyFilters();
    renderPagination();

    // Profile Preview Modal
    const profilePreviewModal = document.getElementById('profilePreviewModal');
    const closeProfilePreview = document.getElementById('closeProfilePreview');
    const previewPhoto = document.getElementById('previewPhoto');
    const previewName = document.getElementById('previewName');
    const previewDetails = document.getElementById('previewDetails');

    // Message Premium Modal
    const messagePremiumModal = document.getElementById('messagePremiumModal');
    const closeMessageModal = document.getElementById('closeMessageModal');

    // Close profile preview modal
    if (closeProfilePreview) {
        closeProfilePreview.addEventListener('click', () => {
            profilePreviewModal.classList.remove('active');
        });
    }

    // Close message premium modal
    if (closeMessageModal) {
        closeMessageModal.addEventListener('click', () => {
            messagePremiumModal.classList.remove('active');
        });
    }

    // Close modals when clicking outside
    [profilePreviewModal, messagePremiumModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    });

    // Handle unlock profile button click
    const unlockProfileBtn = document.querySelector('.unlock-profile-btn');
    if (unlockProfileBtn) {
        unlockProfileBtn.addEventListener('click', () => {
            window.location.href = 'pricing.html';
        });
    }

    // Function to show profile preview
    function showProfilePreview(profile) {
        if (!profile) return;
        
        previewPhoto.src = profile.photo;
        previewName.textContent = profile.name;
        previewDetails.textContent = `${profile.age} • ${profile.city}`;
        
        // Update preview sections
        const sections = document.querySelectorAll('.preview-section p');
        sections[0].textContent = profile.about;
        sections[1].textContent = profile.education;
        sections[2].textContent = profile.occupation;
        
        profilePreviewModal.classList.add('active');
    }

    // Function to get profile data (mock data for now)
    function getProfileData(profileId) {
        // In a real app, this would be an API call to your backend
        const mockProfiles = {
            'priya': {
                name: 'Priya Desai',
                age: 27,
                city: 'Mumbai',
                photo: 'https://randomuser.me/api/portraits/women/44.jpg',
                about: 'Looking for a sincere life partner who values family and personal growth.',
                education: 'Bachelor\'s Degree',
                occupation: 'Software Engineer'
            },
            'amit': {
                name: 'Amit Sharma',
                age: 29,
                city: 'Pune',
                photo: 'https://randomuser.me/api/portraits/men/32.jpg',
                about: 'Seeking a partner who shares my passion for technology and adventure.',
                education: 'Master\'s in Computer Science',
                occupation: 'Tech Lead'
            },
            'sneha': {
                name: 'Sneha Kulkarni',
                age: 26,
                city: 'Nagpur',
                photo: 'https://randomuser.me/api/portraits/women/68.jpg',
                about: 'A creative soul looking for someone who appreciates art and culture.',
                education: 'Bachelor\'s in Fine Arts',
                occupation: 'Graphic Designer'
            },
            'rahul': {
                name: 'Rahul Patil',
                age: 31,
                city: 'Nashik',
                photo: 'https://randomuser.me/api/portraits/men/45.jpg',
                about: 'Entrepreneur seeking a partner who shares my vision for growth.',
                education: 'MBA',
                occupation: 'Business Owner'
            }
        };
        return mockProfiles[profileId];
    }

    // Your existing code for populating user cards
    function populateUserCards(users) {
        const template = document.getElementById('userCardTemplate');
        const container = document.getElementById('usersGrid');
        
        users.forEach(user => {
            const card = template.content.cloneNode(true);
            const userCard = card.querySelector('.user-card');
            
            // Set profile data
            userCard.dataset.profile = user.id;
            card.querySelector('img').src = user.photo;
            card.querySelector('.user-name').textContent = user.name;
            card.querySelector('.user-details').textContent = `${user.age} • ${user.city}`;
            
            container.appendChild(card);
        });
    }

    // Example usage (replace with your actual data)
    const mockUsers = [
        { id: 'priya', name: 'Priya Desai', age: 27, city: 'Mumbai', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { id: 'amit', name: 'Amit Sharma', age: 29, city: 'Pune', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { id: 'sneha', name: 'Sneha Kulkarni', age: 26, city: 'Nagpur', photo: 'https://randomuser.me/api/portraits/women/68.jpg' },
        { id: 'rahul', name: 'Rahul Patil', age: 31, city: 'Nashik', photo: 'https://randomuser.me/api/portraits/men/45.jpg' }
    ];

    populateUserCards(mockUsers);

    // Function to add premium tag to user profile
    function addPremiumTag(element) {
        if (window.isPremiumUser()) {
            const subscription = JSON.parse(localStorage.getItem('subscriptionDetails'));
            const premiumBadge = document.createElement('div');
            premiumBadge.className = 'premium-badge';
            premiumBadge.innerHTML = `
                <i class="fas fa-crown"></i>
                <span>${subscription.planType.charAt(0).toUpperCase() + subscription.planType.slice(1)}</span>
            `;
            element.appendChild(premiumBadge);
        }
    }

    // Function to check and display premium features
    function checkPremiumFeatures() {
        if (window.isPremiumUser()) {
            // Enable premium features
            const premiumElements = document.querySelectorAll('.premium-feature');
            premiumElements.forEach(element => {
                element.classList.remove('premium-locked');
                element.classList.add('premium-unlocked');
            });
        }
    }

    // Add premium tag to user profile when page loads
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        addPremiumTag(userProfile);
    }
    checkPremiumFeatures();
}); 