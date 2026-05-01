// ============================================
// CULINARY JAKARTA SELATAN - MAIN JAVASCRIPT
// ============================================

// 1. SAMPLE RESTAURANT DATA
const restaurantsData = [
  {
    id: 1,
    name: "Restoran Tradisional Sunda",
    category: "Tradisional",
    location: "Senayan",
    priceRange: "Rp 50,000 - Rp 150,000",
    rating: 4.8,
    reviews: 245,
    phone: "+62 21-7218-0001",
    hours: "10:00 - 22:00",
    image: "🍲"
  },
  {
    id: 2,
    name: "Modern Fusion Kitchen",
    category: "Modern",
    location: "Kemang",
    priceRange: "Rp 80,000 - Rp 250,000",
    rating: 4.6,
    reviews: 189,
    phone: "+62 21-7810-0002",
    hours: "11:00 - 23:00",
    image: "🍽️"
  },
  {
    id: 3,
    name: "Seafood Paradise",
    category: "Seafood",
    location: "Pondok Indah",
    priceRange: "Rp 100,000 - Rp 300,000",
    rating: 4.7,
    reviews: 312,
    phone: "+62 21-7655-0003",
    hours: "12:00 - 23:00",
    image: "🦐"
  },
  {
    id: 4,
    name: "Green Garden Vegetarian",
    category: "Vegetarian",
    location: "Tebet",
    priceRange: "Rp 40,000 - Rp 120,000",
    rating: 4.5,
    reviews: 156,
    phone: "+62 21-8290-0004",
    hours: "09:00 - 21:00",
    image: "🥗"
  },
  {
    id: 5,
    name: "Sweet Dreams Dessert Cafe",
    category: "Dessert",
    location: "Cilandak",
    priceRange: "Rp 30,000 - Rp 100,000",
    rating: 4.9,
    reviews: 428,
    phone: "+62 21-7695-0005",
    hours: "10:00 - 22:00",
    image: "🍰"
  },
  {
    id: 6,
    name: "Premium Steak House",
    category: "Modern",
    location: "Senayan",
    priceRange: "Rp 150,000 - Rp 400,000",
    rating: 4.7,
    reviews: 278,
    phone: "+62 21-7215-0006",
    hours: "11:30 - 23:00",
    image: "🥩"
  }
];

// 2. DOM ELEMENTS
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const locationFilter = document.getElementById('locationFilter');
const searchBtn = document.getElementById('searchBtn');
const restaurantsGrid = document.getElementById('restaurantsGrid');
const modal = document.getElementById('reservationModal');
const modalClose = document.querySelector('.modal-close');
const scrollTopBtn = document.getElementById('scrollTopBtn');

// 3. HAMBURGER MENU TOGGLE
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// 4. DISPLAY ALL RESTAURANTS
function displayRestaurants(restaurants = restaurantsData) {
  if (restaurantsGrid) {
    restaurantsGrid.innerHTML = '';

    if (restaurants.length === 0) {
      restaurantsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
          <p style="font-size: 18px; color: #999;">Tidak ada restoran yang sesuai dengan pencarian Anda</p>
        </div>
      `;
      return;
    }

    restaurants.forEach(restaurant => {
      const stars = '⭐'.repeat(Math.floor(restaurant.rating));
      const restaurantCard = `
        <div class="restaurant-card">
          <div class="restaurant-image">
            ${restaurant.image}
            <span class="restaurant-badge">⭐ ${restaurant.rating}</span>
          </div>
          <div class="restaurant-info">
            <div class="restaurant-header">
              <div>
                <div class="restaurant-name">${restaurant.name}</div>
                <div class="restaurant-rating">
                  <span class="stars">${stars}</span>
                  <span class="rating-count">(${restaurant.reviews} ulasan)</span>
                </div>
              </div>
            </div>
            
            <div class="restaurant-details">
              <div class="detail-item">
                <span class="detail-item-icon">📍</span>
                <span class="detail-item-text">${restaurant.location}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-icon">💰</span>
                <span class="detail-item-text">${restaurant.priceRange}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-icon">🏷️</span>
                <span class="detail-item-text">${restaurant.category}</span>
              </div>
              <div class="detail-item">
                <span class="detail-item-icon">🕐</span>
                <span class="detail-item-text">${restaurant.hours}</span>
              </div>
            </div>

            <div class="restaurant-actions">
              <button class="btn btn-primary" onclick="viewDetails(${restaurant.id})">Lihat Detail</button>
              <button class="btn btn-secondary" onclick="openReservation(${restaurant.id})">Reservasi</button>
            </div>
          </div>
        </div>
      `;
      restaurantsGrid.innerHTML += restaurantCard;
    });
  }
}

// 5. FILTER RESTAURANTS
function filterRestaurants() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const price = priceFilter.value;
  const location = locationFilter.value;

  const filtered = restaurantsData.filter(restaurant => {
    const matchSearch = restaurant.name.toLowerCase().includes(searchTerm) || 
                       restaurant.category.toLowerCase().includes(searchTerm);
    const matchCategory = category === '' || restaurant.category === category;
    const matchPrice = price === '' || restaurant.priceRange.includes(price);
    const matchLocation = location === '' || restaurant.location === location;

    return matchSearch && matchCategory && matchPrice && matchLocation;
  });

  console.log(`📊 Filter Results: ${filtered.length} restoran ditemukan`);
  displayRestaurants(filtered);
}

// 6. SEARCH BUTTON
if (searchBtn) {
  searchBtn.addEventListener('click', filterRestaurants);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') filterRestaurants();
  });
  categoryFilter.addEventListener('change', filterRestaurants);
  priceFilter.addEventListener('change', filterRestaurants);
  locationFilter.addEventListener('change', filterRestaurants);
}

// 7. VIEW RESTAURANT DETAILS
function viewDetails(restaurantId) {
  const restaurant = restaurantsData.find(r => r.id === restaurantId);
  if (restaurant) {
    console.log(`👁️ Melihat detail: ${restaurant.name}`);
    alert(`
    📍 ${restaurant.name}
    ⭐ Rating: ${restaurant.rating}/5 (${restaurant.reviews} ulasan)
    📍 Lokasi: ${restaurant.location}
    💰 Harga: ${restaurant.priceRange}
    🏷️ Kategori: ${restaurant.category}
    🕐 Jam Operasional: ${restaurant.hours}
    📞 Telepon: ${restaurant.phone}
    
    Untuk melihat detail lengkap, silakan klik tombol "Reservasi"
    `);
  }
}

// 8. OPEN RESERVATION MODAL
function openReservation(restaurantId) {
  const restaurant = restaurantsData.find(r => r.id === restaurantId);
  if (restaurant && modal) {
    console.log(`📅 Membuka reservasi untuk: ${restaurant.name}`);
    document.getElementById('reservationRestaurant').textContent = restaurant.name;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// 9. CLOSE MODAL
if (modalClose) {
  modalClose.addEventListener('click', () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// 10. SUBMIT RESERVATION
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('guestName').value;
    const email = document.getElementById('guestEmail').value;
    const date = document.getElementById('reservationDate').value;
    const time = document.getElementById('reservationTime').value;
    const guests = document.getElementById('guestCount').value;
    const requests = document.getElementById('specialRequests').value;
    const restaurant = document.getElementById('reservationRestaurant').textContent;

    console.log(`✅ Reservasi berhasil!`);
    console.log(`   Nama: ${name}`);
    console.log(`   Email: ${email}`);
    console.log(`   Restoran: ${restaurant}`);
    console.log(`   Tanggal: ${date}`);
    console.log(`   Jam: ${time}`);
    console.log(`   Jumlah Tamu: ${guests}`);
    console.log(`   Permintaan Khusus: ${requests || 'Tidak ada'}`);

    alert(`✅ Reservasi berhasil!\n\nRestoran: ${restaurant}\nTanggal: ${date}\nJam: ${time}\nJumlah Tamu: ${guests}\n\nKonfirmasi akan dikirim ke ${email}`);

    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
    reservationForm.reset();
  });
}

// 11. SUBMIT REVIEW
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const reviewerName = document.getElementById('reviewerName').value;
    const rating = document.getElementById('reviewRating').value;
    const comment = document.getElementById('reviewComment').value;

    console.log(`⭐ Review baru!`);
    console.log(`   Nama: ${reviewerName}`);
    console.log(`   Rating: ${rating}/5`);
    console.log(`   Komentar: ${comment}`);

    alert(`✅ Terima kasih atas ulasan Anda!\n\nRating: ${rating}/5\nKomentar Anda akan ditampilkan setelah diverifikasi.`);
    reviewForm.reset();
  });
}

// 12. SCROLL TO TOP BUTTON
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 13. CLOSE MODAL WHEN CLICKING OUTSIDE
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// 14. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  console.log('🍽️ Website Kuliner Jakarta Selatan - Siap Digunakan');
  console.log(`📊 Total Restoran: ${restaurantsData.length}`);
  displayRestaurants();
});

// 15. SEARCH ON PAGE LOAD
window.addEventListener('load', () => {
  displayRestaurants();
});

// 16. EXPORT FUNCTIONS FOR GLOBAL USE
window.viewDetails = viewDetails;
window.openReservation = openReservation;
