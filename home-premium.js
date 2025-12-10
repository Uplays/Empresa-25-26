// home-premium.js - JavaScript premium para la página principal

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initSectionAnimations();
    initCarouselIndicators();
    initCounterBars();
    initLazyLoading();
    initPerformanceOptimizations();
});

// ===== PARTÍCULAS EN EL HERO =====
function initParticles() {
    const particlesContainer = document.querySelector('.header-particles');
    if (!particlesContainer) return;

    const particleCount = window.innerWidth > 768 ? 30 : 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float-particle ${Math.random() * 10 + 15}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
      pointer-events: none;
    `;
        particlesContainer.appendChild(particle);
    }

    // Añadir animación si no existe
    if (!document.getElementById('particle-animations')) {
        const style = document.createElement('style');
        style.id = 'particle-animations';
        style.textContent = `
      @keyframes float-particle {
        0% {
          transform: translateY(0) translateX(0) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) scale(0.5);
          opacity: 0;
        }
      }
    `;
        document.head.appendChild(style);
    }
}

// ===== ANIMACIONES DE SECCIÓN =====
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section-animated');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animar elementos hijos con delay
                const children = entry.target.querySelectorAll('.card, .counter-box, .contact-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(20px)';
                        child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

                        requestAnimationFrame(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        });
                    }, index * 100);
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ===== INDICADORES DEL CAROUSEL =====
function initCarouselIndicators() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const inner = carousel.querySelector('.carousel-inner');
    const items = inner.querySelectorAll('.carousel-card');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');

    if (!indicatorsContainer) return;

    // Crear indicadores
    items.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator';
        if (index === 0) indicator.classList.add('active');

        indicator.addEventListener('click', () => {
            goToSlide(index);
        });

        indicatorsContainer.appendChild(indicator);
    });

    // Función para ir a un slide específico
    function goToSlide(index) {
        inner.style.transform = `translateX(-${index * 100}%)`;

        // Actualizar indicadores
        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });
    }

    // Actualizar indicadores cuando cambia el carousel
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');

    if (prevBtn && nextBtn) {
        let currentIndex = 0;

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            goToSlide(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            goToSlide(currentIndex);
        });
    }
}

// ===== BARRAS DE PROGRESO DE CONTADORES =====
function initCounterBars() {
    const counterSection = document.getElementById('contador');
    if (!counterSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.counter-fill');
                bars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';

                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counterSection);
}

// ===== LAZY LOADING OPTIMIZADO =====
function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // El navegador soporta lazy loading nativo
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src; // Trigger lazy loading
        });
    } else {
        // Fallback para navegadores antiguos
        const images = document.querySelectorAll('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.removeAttribute('loading');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== OPTIMIZACIONES DE RENDIMIENTO =====
function initPerformanceOptimizations() {
    // Debounce para scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            handleScroll();
        });
    }, { passive: true });

    // Throttle para resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleResize();
        }, 250);
    }, { passive: true });
}

function handleScroll() {
    // Parallax en el hero
    const header = document.querySelector('.header-wrap');
    if (header) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        header.style.transform = `translateY(${parallax}px)`;
    }
}

function handleResize() {
    // Reiniciar partículas si es necesario
    const particlesContainer = document.querySelector('.header-particles');
    if (particlesContainer && window.innerWidth <= 768) {
        const particles = particlesContainer.querySelectorAll('.particle');
        if (particles.length > 15) {
            particles.forEach((particle, index) => {
                if (index >= 15) particle.remove();
            });
        }
    }
}

// ===== EFECTOS ADICIONALES =====

// Efecto de hover en tarjetas interactivas
document.querySelectorAll('.card-interactive').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll mejorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#top') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 100; // Offset para el nav

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto ripple en botones
document.querySelectorAll('.btn-primary, .social-btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Añadir animación de ripple si no existe
if (!document.getElementById('ripple-animation')) {
    const style = document.createElement('style');
    style.id = 'ripple-animation';
    style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
    document.head.appendChild(style);
}

// ===== PRELOAD DE RECURSOS CRÍTICOS =====
function preloadCriticalResources() {
    // Preload de imágenes importantes
    const criticalImages = [
        'Camiseta.jpeg',
        'Mochila.jpeg',
        'Modelo1.jpeg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Ejecutar preload
preloadCriticalResources();

// ===== DETECCIÓN DE DISPOSITIVO TÁCTIL =====
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');

    // Deshabilitar hover en dispositivos táctiles
    const style = document.createElement('style');
    style.textContent = `
    .touch-device .card-interactive:hover {
      transform: none;
    }
    .touch-device .card-interactive:active {
      transform: translateY(-8px) scale(1.02);
    }
  `;
    document.head.appendChild(style);
}

// ===== MONITOREO DE RENDIMIENTO =====
if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                // Log de métricas de rendimiento (solo en desarrollo)
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.log(`${entry.name}: ${entry.duration}ms`);
                }
            }
        });

        perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
    } catch (e) {
        // Silenciar errores en navegadores que no soportan PerformanceObserver
    }
}

// ===== ACCESIBILIDAD =====
// Mejorar navegación por teclado
document.querySelectorAll('.card-interactive, .social-btn').forEach(element => {
    if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
    }

    element.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// ===== MENSAJE DE CONSOLA =====
console.log('%c🏕️ Empresa 25-26', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%c✨ Web optimizada y lista!', 'font-size: 14px; color: #10b981;');
console.log('%cRendimiento: ⚡ Optimizado', 'color: #f59e0b;');
console.log('%cSeguridad: 🔒 Mejorada', 'color: #ef4444;');

// Export para testing (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initParticles,
        initSectionAnimations,
        initCarouselIndicators,
        initCounterBars
    };
}

// ===== LAZY LOADING MEJORADO PARA DATA-SRC =====
class LazyImageLoader {
  constructor() {
    this.init();
  }
  
  init() {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.01
    };
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadMedia(entry.target);
          imageObserver.unobserve(entry.target);
        }
      });
    }, options);
    
    // Observar im�genes lazy
    document.querySelectorAll('.lazy-image').forEach(img => {
      imageObserver.observe(img);
    });
    
    // Observar videos lazy
    document.querySelectorAll('.lazy-video').forEach(video => {
      imageObserver.observe(video);
    });
  }
  
  loadMedia(element) {
    if (element.tagName === 'IMG') {
      const src = element.dataset.src;
      if (src) {
        const tempImg = new Image();
        tempImg.onload = () => {
          element.src = src;
          element.classList.add('loaded');
          element.style.opacity = '0';
          element.style.transform = 'scale(0.95)';
          requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
          });
        };
        tempImg.src = src;
        element.removeAttribute('data-src');
      }
    } else if (element.tagName === 'VIDEO') {
      const sources = element.querySelectorAll('source[data-src]');
      sources.forEach(source => {
        source.src = source.dataset.src;
        source.removeAttribute('data-src');
      });
      element.load();
      element.classList.add('loaded');
    }
  }
}

// Inicializar lazy loader mejorado
if (document.querySelector('.lazy-image') || document.querySelector('.lazy-video')) {
  new LazyImageLoader();
}

console.log('%c?? Lazy loading mejorado activo', 'color: #8b5cf6;');

// ===== MEJORAS DE SCROLL =====

// Progress bar de scroll
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.style.width = scrolled + '%';
}, { passive: true });

// Scroll reveal mejorado
const revealElements = document.querySelectorAll('.card, .counter-box, .contact-item, .feature-item');
revealElements.forEach((el, index) => {
  el.classList.add('scroll-reveal');
  el.style.transitionDelay = (index * 0.1) + 's';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      entry.target.classList.add('in-viewport');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Nav blur al hacer scroll
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
}, { passive: true });

// Indicador de scroll
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
document.body.appendChild(scrollIndicator);

window.addEventListener('scroll', () => {
  if (window.pageYOffset < 200) {
    scrollIndicator.classList.add('show');
  } else {
    scrollIndicator.classList.remove('show');
  }
}, { passive: true });

// Parallax suave en secciones
const parallaxSections = document.querySelectorAll('.card-section');
window.addEventListener('scroll', () => {
  parallaxSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    
    if (scrollPercent > 0 && scrollPercent < 1) {
      const translateY = (scrollPercent - 0.5) * 20;
      section.style.transform = 'translateY(' + translateY + 'px)';
    }
  });
}, { passive: true });

console.log('%c?? Efectos de scroll mejorados activos', 'color: #a855f7;');
