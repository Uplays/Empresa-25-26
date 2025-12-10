// tienda3d.js - Interactividad 3D para productos

// Clase para manejar la rotación 3D de productos
class Product3DViewer {
  constructor(element) {
    this.element = element;
    this.container = element.querySelector('.product-3d-container');
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentRotationX = 0;
    this.currentRotationY = 0;
    this.targetRotationX = 0;
    this.targetRotationY = 0;
    
    this.init();
  }
  
  init() {
    // Eventos de mouse
    this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
    
    // Eventos táctiles para móviles
    this.element.addEventListener('touchstart', this.onTouchStart.bind(this));
    document.addEventListener('touchmove', this.onTouchMove.bind(this));
    document.addEventListener('touchend', this.onTouchEnd.bind(this));
    
    // Animación suave
    this.animate();
    
    // Efecto de hover automático
    this.autoRotate();
  }
  
  onMouseDown(e) {
    this.isDragging = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.element.style.cursor = 'grabbing';
  }
  
  onMouseMove(e) {
    if (!this.isDragging) return;
    
    const deltaX = e.clientX - this.startX;
    const deltaY = e.clientY - this.startY;
    
    this.targetRotationY = this.currentRotationY + deltaX * 0.5;
    this.targetRotationX = this.currentRotationX - deltaY * 0.5;
    
    // Limitar rotación en X para que no se voltee completamente
    this.targetRotationX = Math.max(-30, Math.min(30, this.targetRotationX));
  }
  
  onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.currentRotationX = this.targetRotationX;
      this.currentRotationY = this.targetRotationY;
      this.element.style.cursor = 'grab';
    }
  }
  
  onTouchStart(e) {
    if (e.touches.length === 1) {
      this.isDragging = true;
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      e.preventDefault();
    }
  }
  
  onTouchMove(e) {
    if (!this.isDragging || e.touches.length !== 1) return;
    
    const deltaX = e.touches[0].clientX - this.startX;
    const deltaY = e.touches[0].clientY - this.startY;
    
    this.targetRotationY = this.currentRotationY + deltaX * 0.5;
    this.targetRotationX = this.currentRotationX - deltaY * 0.5;
    
    this.targetRotationX = Math.max(-30, Math.min(30, this.targetRotationX));
    
    e.preventDefault();
  }
  
  onTouchEnd() {
    if (this.isDragging) {
      this.isDragging = false;
      this.currentRotationX = this.targetRotationX;
      this.currentRotationY = this.targetRotationY;
    }
  }
  
  animate() {
    // Interpolación suave
    this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.1;
    this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.1;
    
    // Aplicar transformación
    this.container.style.transform = `
      rotateX(${this.currentRotationX}deg) 
      rotateY(${this.currentRotationY}deg)
      translateZ(20px)
    `;
    
    requestAnimationFrame(() => this.animate());
  }
  
  autoRotate() {
    // Rotación automática sutil al pasar el mouse
    this.element.addEventListener('mouseenter', () => {
      if (!this.isDragging) {
        this.targetRotationY += 15;
      }
    });
    
    this.element.addEventListener('mouseleave', () => {
      if (!this.isDragging) {
        // Volver a la posición original suavemente
        this.targetRotationX = 0;
        this.targetRotationY = 0;
      }
    });
  }
}

// Inicializar todos los visores 3D
document.addEventListener('DOMContentLoaded', () => {
  const product3DElements = document.querySelectorAll('.product-viewer');
  
  product3DElements.forEach(element => {
    new Product3DViewer(element);
  });
  
  // Efecto parallax en el hero
  const storeHero = document.querySelector('.store-hero');
  if (storeHero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      storeHero.style.transform = `translateY(${parallax}px)`;
    });
  }
  
  // Animación de entrada para las tarjetas
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar tarjetas de información
  document.querySelectorAll('.info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
  });
  
  // Efecto de brillo en las imágenes de productos
  const productImages = document.querySelectorAll('.product-image');
  productImages.forEach(img => {
    img.addEventListener('load', () => {
      img.style.opacity = '0';
      setTimeout(() => {
        img.style.transition = 'opacity 0.5s ease';
        img.style.opacity = '1';
      }, 100);
    });
  });
  
  // Mejorar el efecto de los botones de compra
  const buyButtons = document.querySelectorAll('.buy-btn');
  buyButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Crear efecto de ondas
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple-effect');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Contador de productos en vista
  let productsInView = 0;
  const productCards = document.querySelectorAll('.merch-card');
  
  const productObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        productsInView++;
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.5 });
  
  productCards.forEach(card => {
    productObserver.observe(card);
  });
  
  // Efecto de partículas en el hero (opcional, sutil)
  createHeroParticles();
});

// Función para crear partículas sutiles en el hero
function createHeroParticles() {
  const hero = document.querySelector('.store-hero');
  if (!hero) return;
  
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'hero-particles';
  particlesContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
  `;
  
  hero.insertBefore(particlesContainer, hero.firstChild);
  
  // Crear partículas
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    particlesContainer.appendChild(particle);
  }
  
  // Añadir animación CSS
  if (!document.getElementById('particle-animation')) {
    const style = document.createElement('style');
    style.id = 'particle-animation';
    style.textContent = `
      @keyframes float-particle {
        0% {
          transform: translateY(0) translateX(0);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
          opacity: 0;
        }
      }
      
      .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }
      
      @keyframes ripple-animation {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Optimización de rendimiento: Lazy loading para imágenes
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Mejorar la experiencia en dispositivos táctiles
if ('ontouchstart' in window) {
  document.body.classList.add('touch-device');
  
  // Deshabilitar el hint de rotación en dispositivos táctiles después de la primera interacción
  let hasInteracted = false;
  document.querySelectorAll('.product-viewer').forEach(viewer => {
    viewer.addEventListener('touchstart', function() {
      if (!hasInteracted) {
        hasInteracted = true;
        document.querySelectorAll('.rotation-hint').forEach(hint => {
          hint.style.display = 'none';
        });
      }
    }, { once: true });
  });
}

// Añadir efecto de zoom en las imágenes de modelos
document.querySelectorAll('.model-card .product-image').forEach(img => {
  img.addEventListener('click', function() {
    // Crear modal de zoom
    const modal = document.createElement('div');
    modal.className = 'image-zoom-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      cursor: zoom-out;
      animation: fadeIn 0.3s ease;
    `;
    
    const zoomedImg = document.createElement('img');
    zoomedImg.src = this.src;
    zoomedImg.alt = this.alt;
    zoomedImg.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      border-radius: 10px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      animation: zoomIn 0.3s ease;
    `;
    
    modal.appendChild(zoomedImg);
    document.body.appendChild(modal);
    
    // Cerrar al hacer click
    modal.addEventListener('click', () => {
      modal.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => modal.remove(), 300);
    });
    
    // Añadir animaciones si no existen
    if (!document.getElementById('zoom-animations')) {
      const style = document.createElement('style');
      style.id = 'zoom-animations';
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  });
});

console.log('🎨 Tienda 3D inicializada correctamente');
