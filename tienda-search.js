// tienda-search.js - Sistema de búsqueda funcional

document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    removeCartFeatures();
});

// ===== SISTEMA DE BÚSQUEDA =====
function initSearch() {
    const searchBtn = document.querySelector('.nav-icon-btn[aria-label="Buscar"]');

    if (searchBtn) {
        searchBtn.addEventListener('click', toggleSearchBar);
    }

    // Crear barra de búsqueda
    createSearchBar();
}

function createSearchBar() {
    const searchBar = document.createElement('div');
    searchBar.className = 'search-bar-container';
    searchBar.style.cssText = `
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: white;
    padding: 1.5rem 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 999;
    transform: translateY(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: 2px solid #667eea;
  `;

    searchBar.innerHTML = `
    <div style="max-width: 1400px; margin: 0 auto; display: flex; gap: 1rem; align-items: center;">
      <input 
        type="text" 
        class="search-input" 
        placeholder="Buscar productos... (ej: camiseta, gorro, mochila)"
        style="
          flex: 1;
          padding: 1rem 1.5rem;
          border: 2px solid #e5e7eb;
          border-radius: 50px;
          font-size: 1rem;
          font-family: 'Poppins', sans-serif;
          outline: none;
          transition: all 0.3s ease;
        "
      />
      <button class="search-close-btn" style="
        background: #667eea;
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      ">
        Cerrar
      </button>
    </div>
    <div class="search-results" style="
      max-width: 1400px;
      margin: 1rem auto 0;
      display: none;
    "></div>
  `;

    document.body.appendChild(searchBar);

    // Event listeners
    const input = searchBar.querySelector('.search-input');
    const closeBtn = searchBar.querySelector('.search-close-btn');

    input.addEventListener('input', (e) => performSearch(e.target.value));
    input.addEventListener('focus', function () {
        this.style.borderColor = '#667eea';
        this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
    });
    input.addEventListener('blur', function () {
        this.style.borderColor = '#e5e7eb';
        this.style.boxShadow = 'none';
    });

    closeBtn.addEventListener('click', toggleSearchBar);
    closeBtn.addEventListener('mouseenter', function () {
        this.style.background = '#5568d3';
        this.style.transform = 'translateY(-2px)';
    });
    closeBtn.addEventListener('mouseleave', function () {
        this.style.background = '#667eea';
        this.style.transform = 'translateY(0)';
    });
}

function toggleSearchBar() {
    const searchBar = document.querySelector('.search-bar-container');
    const input = searchBar.querySelector('.search-input');

    if (searchBar.style.transform === 'translateY(0px)') {
        searchBar.style.transform = 'translateY(-100%)';
        input.value = '';
        document.querySelector('.search-results').style.display = 'none';
    } else {
        searchBar.style.transform = 'translateY(0)';
        setTimeout(() => input.focus(), 300);
    }
}

function performSearch(query) {
    const resultsContainer = document.querySelector('.search-results');

    if (!query.trim()) {
        resultsContainer.style.display = 'none';
        return;
    }

    // Base de datos de productos
    const products = [
        {
            id: 'camiseta',
            name: 'Camiseta Exclusiva',
            category: 'Ropa',
            keywords: ['camiseta', 'camisa', 't-shirt', 'ropa', 'algodón', 'premium'],
            price: '18€',
            image: 'Camiseta.jpeg'
        },
        {
            id: 'gorro',
            name: 'Gorro Scout',
            category: 'Ropa',
            keywords: ['gorro', 'beanie', 'ropa', 'invierno', 'cabeza'],
            price: '12€',
            image: 'Gorro.jpeg'
        },
        {
            id: 'gorra',
            name: 'Gorra Oficial',
            category: 'Ropa',
            keywords: ['gorra', 'cap', 'ropa', 'verano', 'cabeza', 'casual'],
            price: '15€',
            image: 'gorra.png'
        },
        {
            id: 'mochila',
            name: 'Mochila Scout',
            category: 'Accesorios',
            keywords: ['mochila', 'backpack', 'bolsa', 'accesorio', 'excursión', 'viaje'],
            price: '35€',
            image: 'Mochila.jpeg'
        },
        {
            id: 'rinonera',
            name: 'Riñonera Deportiva',
            category: 'Accesorios',
            keywords: ['riñonera', 'rinonera', 'fanny pack', 'bolsa', 'accesorio', 'deportiva'],
            price: '14€',
            image: 'Rinyonera.jpeg'
        },
        {
            id: 'pulsera',
            name: 'Pulsera Artesanal',
            category: 'Accesorios',
            keywords: ['pulsera', 'bracelet', 'accesorio', 'artesanal', 'mano'],
            price: '5€',
            image: 'pulsera.png'
        }
    ];

    // Buscar productos
    const searchTerm = query.toLowerCase();
    const results = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.keywords.some(keyword => keyword.includes(searchTerm));
    });

    // Mostrar resultados
    if (results.length > 0) {
        resultsContainer.innerHTML = `
      <p style="color: #6b7280; margin-bottom: 1rem; font-size: 0.9rem;">
        ${results.length} resultado${results.length > 1 ? 's' : ''} encontrado${results.length > 1 ? 's' : ''}
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
        ${results.map(product => `
          <div class="search-result-item" data-id="${product.id}" style="
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 16px;
            padding: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <img src="${product.image}" alt="${product.name}" style="
              width: 100%;
              height: 150px;
              object-fit: contain;
              margin-bottom: 0.75rem;
              border-radius: 12px;
            "/>
            <div style="font-size: 0.75rem; color: #667eea; font-weight: 600; margin-bottom: 0.25rem;">
              ${product.category}
            </div>
            <div style="font-weight: 600; margin-bottom: 0.25rem;">
              ${product.name}
            </div>
            <div style="color: #667eea; font-weight: 700; font-size: 1.25rem;">
              ${product.price}
            </div>
          </div>
        `).join('')}
      </div>
    `;
        resultsContainer.style.display = 'block';

        // Añadir event listeners a los resultados
        resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('mouseenter', function () {
                this.style.borderColor = '#667eea';
                this.style.transform = 'translateY(-4px)';
                this.style.boxShadow = '0 8px 16px rgba(102, 126, 234, 0.2)';
            });

            item.addEventListener('mouseleave', function () {
                this.style.borderColor = '#e5e7eb';
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });

            item.addEventListener('click', function () {
                const productId = this.dataset.id;
                scrollToProduct(productId);
                toggleSearchBar();
            });
        });
    } else {
        resultsContainer.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: #6b7280;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="margin: 0 auto 1rem;">
          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p>No se encontraron productos para "${query}"</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">
          Intenta buscar: camiseta, gorro, gorra, mochila, riñonera o pulsera
        </p>
      </div>
    `;
        resultsContainer.style.display = 'block';
    }
}

function scrollToProduct(productId) {
    const product = document.querySelector(`.product-card-premium[data-id="${productId}"]`);
    if (product) {
        const offsetTop = product.offsetTop - 120;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });

        // Highlight effect
        product.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.3)';
        setTimeout(() => {
            product.style.boxShadow = '';
        }, 2000);
    }
}

// ===== QUITAR CARACTERÍSTICAS DEL CARRITO =====
function removeCartFeatures() {
    // Ocultar botón de carrito
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.style.display = 'none';
    }

    // Deshabilitar funcionalidad de añadir al carrito
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.remove();
    });
}

console.log('%c🔍 Sistema de búsqueda activado', 'font-size: 14px; color: #667eea; font-weight: bold;');
console.log('%c🛒 Carrito desactivado - Solo exposición', 'font-size: 12px; color: #10b981;');

// Mejorar scroll to product
function scrollToProductDirect(productId) {
  const product = document.querySelector(.product-card-premium[data-id="${productId}"]);
  if (product) {
    // Cerrar b�squeda
    const searchBar = document.querySelector('.search-bar-container');
    if (searchBar) {
      searchBar.style.transform = 'translateY(-100%)';
      searchBar.querySelector('.search-input').value = '';
      searchBar.querySelector('.search-results').style.display = 'none';
    }
    
    // Scroll directo al producto
    setTimeout(() => {
      const offsetTop = product.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Highlight mejorado
      product.style.transition = 'all 0.3s ease';
      product.style.transform = 'scale(1.05)';
      product.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.6), 0 20px 40px rgba(102, 126, 234, 0.4)';
      product.style.borderColor = '#667eea';
      
      setTimeout(() => {
        product.style.transform = '';
        product.style.boxShadow = '';
        product.style.borderColor = '';
      }, 2500);
    }, 300);
  }
}

// Reemplazar la funci�n original
window.scrollToProduct = scrollToProductDirect;
