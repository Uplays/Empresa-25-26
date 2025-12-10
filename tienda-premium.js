
// ===== TIENDA PREMIUM - FUNCIONALIDADES =====

document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    initLikes();
    initGallery();
    initMobileMenu();
    init3DViewer();
    initAnimations();

    console.log('%c🛍️ Tienda Premium Lista', 'font-size: 16px; font-weight: bold; color: #a855f7;');
});

// ===== BÚSQUEDA =====
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const products = document.querySelectorAll('.product-card-premium');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();

            products.forEach(product => {
                const title = product.querySelector('.product-name-premium')?.textContent.toLowerCase() || '';
                const desc = product.querySelector('.product-description-premium')?.textContent.toLowerCase() || '';
                const category = product.querySelector('.product-category')?.textContent.toLowerCase() || '';

                if (title.includes(term) || desc.includes(term) || category.includes(term)) {
                    product.style.display = 'block';
                    // Re-trigger animation
                    product.style.animation = 'none';
                    product.offsetHeight; /* trigger reflow */
                    product.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }
}

// ===== LIKES =====
let likes = JSON.parse(localStorage.getItem('productLikes')) || {};

function initLikes() {
    const likeBtns = document.querySelectorAll('.btn-like-premium');

    likeBtns.forEach(btn => {
        const card = btn.closest('.product-card-premium');
        const productId = card.dataset.id;

        // Cargar likes guardados
        if (likes[productId]) {
            btn.classList.add('liked');
            const count = btn.querySelector('.like-count');
            if (count) count.textContent = likes[productId];
        }

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isLiked = this.classList.contains('liked');
            const count = this.querySelector('.like-count');

            if (isLiked) {
                this.classList.remove('liked');
                likes[productId] = Math.max(0, (likes[productId] || 0) - 1);
            } else {
                this.classList.add('liked');
                likes[productId] = (likes[productId] || 0) + 1;

                // Animación de corazón
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
            }

            if (count) count.textContent = likes[productId];
            localStorage.setItem('productLikes', JSON.stringify(likes));
        });
    });
}

// ===== GALERÍA =====
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item-premium');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const img = this.querySelector('.gallery-image');
            if (!img || !img.src) return;

            // Crear modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: zoom-out;
                opacity: 0;
                transition: opacity 0.3s ease;
                backdrop-filter: blur(5px);
            `;

            const zoomedImg = document.createElement('img');
            zoomedImg.src = img.src;
            zoomedImg.alt = img.alt;
            zoomedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 16px;
                box-shadow: 0 0 50px rgba(168, 85, 247, 0.2);
                transform: scale(0.9);
                transition: transform 0.3s ease;
            `;

            modal.appendChild(zoomedImg);
            document.body.appendChild(modal);

            // Trigger animations
            requestAnimationFrame(() => {
                modal.style.opacity = '1';
                zoomedImg.style.transform = 'scale(1)';
            });

            // Cerrar al hacer click
            modal.addEventListener('click', () => {
                modal.style.opacity = '0';
                zoomedImg.style.transform = 'scale(0.9)';
                setTimeout(() => modal.remove(), 300);
            });
        });
    });
}

// ===== MENÚ MÓVIL =====
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links-premium');

    if (toggle) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            if (navLinks) {
                navLinks.classList.toggle('show');
            }
        });
    }
}

// ===== ANIMACIONES Y 3D SIMULADO =====
function init3DViewer() {
    // Si tienes lógica 3d específica, va aquí. 
    // Por ahora mantenemos los efectos hover visuales.
    const cards = document.querySelectorAll('.product-card-premium');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
}

function initAnimations() {
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Navbar scroll effect
    const nav = document.querySelector('.nav-premium');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            nav.style.background = 'rgba(15, 12, 41, 0.9)';
        } else {
            nav.classList.remove('scrolled');
            nav.style.background = 'rgba(15, 12, 41, 0.7)';
        }
    });
}
