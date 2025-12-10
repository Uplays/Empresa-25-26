// funciones.js

// --- 1. Toggle menú móvil ---
document.querySelector(".nav-toggle").addEventListener("click", () => {
    // Usamos querySelector para que funcione tanto en index.html como en tienda.html
    const navLinks = document.querySelector(".nav-links");
    if (navLinks) {
        navLinks.classList.toggle("open");
    }
});

// --- 2. Carousel simple (Solo funciona en index.html) ---
document.querySelectorAll(".carousel").forEach(carousel => {
    const inner = carousel.querySelector(".carousel-inner");
    // Usamos botones reales con clase .carousel-control
    const prev = carousel.querySelector(".carousel-control.prev");
    const next = carousel.querySelector(".carousel-control.next");
    const items = inner.children;
    const total = items.length;
    let index = 0;

    // Asegura que hay elementos para el carrusel
    if (total === 0) return;

    // Ajusta el carrusel al tamaño del primer elemento
    function showSlide(i) {
        // Usamos la propiedad transform para deslizar
        inner.style.transform = `translateX(-${i * 100}%)`;
    }

    if (prev && next) { // Comprobación para evitar errores si los controles no existen
        prev.addEventListener("click", () => {
            index = (index - 1 + total) % total;
            showSlide(index);
        });

        next.addEventListener("click", () => {
            index = (index + 1) % total;
            showSlide(index);
        });

        // Inicializa la posición
        showSlide(index);
    }
});

// --- 3. Contadores animados (Solo funciona en index.html) ---
function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / 100; // Un incremento suave

    const updateCount = () => {
        if (count < target) {
            count += increment;
            // Usamos Math.round() para una progresión más natural
            counter.innerText = Math.round(count); 
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
}

// --- 4. Likes y Dislikes persistentes (Funciona en ambas páginas) ---
document.querySelectorAll(".merch-card").forEach((card, index) => {
    // Seleccionar el botón de Like existente
    const likeBtn = card.querySelector(".like-btn");
    
    // Crear el botón de Dislike (usando <button> para accesibilidad)
    const dislikeBtn = document.createElement("button");
    dislikeBtn.classList.add("dislike-btn");
    dislikeBtn.innerHTML = "💔 <span>0</span>"; 
    dislikeBtn.setAttribute('aria-label', 'No me gusta este producto');

    // Crear el contenedor de likes/dislikes
    const wrap = document.createElement("div");
    wrap.classList.add("like-dislike-wrap");
    
    // Mover los botones al wrap
    wrap.appendChild(likeBtn);
    wrap.appendChild(dislikeBtn);
    
    // Insertar el wrap DENTRO de la tarjeta, antes del botón de compra (si existe) o al final
    const buyBtn = card.querySelector(".buy-btn");
    if (buyBtn) {
        card.insertBefore(wrap, buyBtn.nextSibling); // Insertar después del botón de compra
    } else {
        card.appendChild(wrap);
    }

    // Usamos el data-id para generar una clave única y persistente
    const productID = card.getAttribute("data-id") || `product-${index}`;
    const likeKey = `store-like-${productID}`;
    const dislikeKey = `store-dislike-${productID}`;
    
    // Cargar valores desde localStorage
    let likeValue = +(localStorage.getItem(likeKey) || 0);
    let dislikeValue = +(localStorage.getItem(dislikeKey) || 0);

    likeBtn.querySelector("span").innerText = likeValue;
    dislikeBtn.querySelector("span").innerText = dislikeValue;

    // Comprobar y restaurar estado activo
    if (localStorage.getItem(`active-${likeKey}`) === 'true') {
        likeBtn.classList.add("active");
    }
    if (localStorage.getItem(`active-${dislikeKey}`) === 'true') {
        dislikeBtn.classList.add("active");
    }

    // Función refactorizada para actualizar y guardar
    const update = (btn, key, otherBtn, otherKey, emoji) => {
        let count = +(localStorage.getItem(key) || 0);
        let otherCount = +(localStorage.getItem(otherKey) || 0);
        
        // El emoji se actualiza al click (para Like es ❤️, para Dislike es 💔)
        const activeEmoji = btn.classList.contains("active") ? emoji : btn.innerHTML.split(' ')[0];

        if (!btn.classList.contains("active")) {
            // Activar: Sumar 1
            count += 1;
            btn.classList.add("active");
            localStorage.setItem(`active-${key}`, 'true');
            
            // Si el opuesto está activo, desactivarlo y restarle 1
            if (otherBtn.classList.contains("active")) {
                otherCount = otherCount > 0 ? otherCount - 1 : 0;
                otherBtn.classList.remove("active");
                localStorage.setItem(`active-${otherKey}`, 'false');
                otherBtn.querySelector("span").innerText = otherCount;
                localStorage.setItem(otherKey, otherCount);
            }
        } else {
            // Desactivar: Restar 1
            count = count > 0 ? count - 1 : 0;
            btn.classList.remove("active");
            localStorage.setItem(`active-${key}`, 'false');
        }

        // Actualizar el DOM y LocalStorage
        btn.querySelector("span").innerText = count;
        localStorage.setItem(key, count);
    };

    likeBtn.addEventListener("click", () => update(likeBtn, likeKey, dislikeBtn, dislikeKey, '👍'));
    dislikeBtn.addEventListener("click", () => update(dislikeBtn, dislikeKey, likeBtn, likeKey, '💔'));
});


// --- 5. Scroll a secciones visible (Animación de entrada) ---
const sections = document.querySelectorAll(".card-section");
const counterSection = document.getElementById("contador");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            
            // Si la sección del contador es visible, activamos los contadores
            if (entry.target.id === "contador") {
                const counters = entry.target.querySelectorAll(".counter");
                counters.forEach(counter => {
                    // Solo animar si no ha sido animado (resetear a 0 primero)
                    if (counter.innerText === "0" || counter.innerText !== counter.getAttribute("data-target")) {
                        counter.innerText = "0"; 
                        animateCounter(counter);
                    }
                });
                // Desconectar el observer del contador una vez que se activa
                observer.unobserve(entry.target); 
            }
        } 
    });
}, { threshold: 0.2 });

sections.forEach(sec => observer.observe(sec));

// --- 6. Botón de Scroll Top ---
const scrollBtn = document.createElement("button");
scrollBtn.id = "scrollTop";
scrollBtn.innerHTML = "⬆";
scrollBtn.setAttribute('aria-label', 'Volver arriba');
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) scrollBtn.classList.add("show");
    else scrollBtn.classList.remove("show");
});

// --- 7. Abrir formulario (Botón Comprar) ---
document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const url = btn.getAttribute("data-url");
        if(url) window.open(url, "_blank");
    });
});

// --- 8. Animación de Texto en Header (Nuevo) ---
const subtitleElement = document.querySelector('.header-subtitle');

if (subtitleElement) {
    const phrases = subtitleElement.getAttribute('data-text').split('|');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Borrando
            charIndex--;
            subtitleElement.textContent = currentPhrase.substring(0, charIndex);
        } else {
            // Escribiendo
            charIndex++;
            subtitleElement.textContent = currentPhrase.substring(0, charIndex);
        }

        let typingSpeed = isDeleting ? 75 : 150;

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Termina de escribir, espera 1.5s antes de borrar
            typingSpeed = 1500; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Termina de borrar, cambia de frase y espera 0.5s
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; 
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}