// Sample mock data for matches
const matches = [
  {
    name: 'Amit Sharma',
    age: 29,
    city: 'Pune',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    tags: ['Engineer', 'Hindu', 'Never Married']
  },
  {
    name: 'Priya Desai',
    age: 27,
    city: 'Mumbai',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    tags: ['Doctor', 'Marathi', 'Vegetarian']
  },
  {
    name: 'Rahul Patil',
    age: 31,
    city: 'Nashik',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    tags: ['MBA', 'Open-minded', 'Never Married']
  },
  {
    name: 'Sneha Kulkarni',
    age: 26,
    city: 'Nagpur',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    tags: ['IT Professional', 'Hindu', 'Fitness Enthusiast']
  }
];

const matchesGrid = document.getElementById('matchesGrid');
const premiumModal = document.getElementById('premiumModal');
const closeModal = document.getElementById('closeModal');

function renderMatches() {
  matchesGrid.innerHTML = '';
  matches.forEach(match => {
    const card = document.createElement('div');
    card.className = 'match-card';
    card.innerHTML = `
      <img src="${match.photo}" alt="${match.name}" class="match-photo">
      <div class="match-name">${match.name}</div>
      <div class="match-info">${match.age} • ${match.city}</div>
      <div class="match-tags">
        ${match.tags.map(tag => `<span class="match-tag">${tag}</span>`).join('')}
      </div>
    `;
    card.addEventListener('click', () => {
      premiumModal.classList.add('active');
    });
    matchesGrid.appendChild(card);
  });
}

if (closeModal) {
  closeModal.addEventListener('click', () => {
    premiumModal.classList.remove('active');
  });
}

// Also close modal on background click
if (premiumModal) {
  premiumModal.addEventListener('click', (e) => {
    if (e.target === premiumModal) {
      premiumModal.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const matchFoundSection = document.getElementById('matchFoundSection');
  const viewMatchBtn = document.getElementById('viewMatchBtn');
  const matchesGrid = document.getElementById('matchesGrid');

  if (viewMatchBtn && matchFoundSection && matchesGrid) {
    viewMatchBtn.addEventListener('click', function() {
      matchFoundSection.style.display = 'none';
      matchesGrid.style.display = 'grid';
    });
  }

  renderMatches();
}); 