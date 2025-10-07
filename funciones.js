// funciones.js

// --- 1. Toggle menú móvil ---
document.querySelector(".nav-toggle").addEventListener("click", () => {
    // Usamos querySelector para que funcione tanto en pruebasweb.html como en tienda.html
    const navLinks = document.querySelector(".nav-links");
    if (navLinks) {
        navLinks.classList.toggle("open");
    }
});

// --- 2. Carousel simple (Solo funciona en pruebasweb.html) ---
document.querySelectorAll(".carousel").forEach(carousel => {
    const inner = carousel.querySelector(".carousel-inner");
    const prev = carousel.querySelector(".prev");
    const next = carousel.querySelector(".next");
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
});

// --- 3. Contadores animados (Solo funciona en pruebasweb.html) ---
function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / 100; // Un incremento suave

    const updateCount = () => {
        if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
}

// --- 4. Likes y Dislikes persistentes (Funciona en ambas páginas) ---
document.querySelectorAll(".merch-card").forEach((card, index) => {
    const likeBtn = card.querySelector(".like-btn");
    
    // Crear el contenedor de likes/dislikes
    const wrap = document.createElement("div");
    wrap.classList.add("like-dislike-wrap");
    
    // Crear y añadir botón de dislike
    const dislikeBtn = document.createElement("div");
    dislikeBtn.classList.add("like-btn", "dislike-btn");
    dislikeBtn.innerHTML = "💔 <span>0</span>";
    
    // Mover el botón de like existente al wrap y añadir el dislike
    wrap.appendChild(likeBtn);
    wrap.appendChild(dislikeBtn);
    card.appendChild(wrap);

    // Usamos el data-id para generar una clave única y persistente, 
    // y el prefijo 'store-' para la nueva tienda
    const productID = card.getAttribute("data-id") || index;
    const likeKey = `store-like-${productID}`;
    const dislikeKey = `store-dislike-${productID}`;

    // Cargar valores desde localStorage
    let likeValue = +(localStorage.getItem(likeKey) || 0);
    let dislikeValue = +(localStorage.getItem(dislikeKey) || 0);

    likeBtn.querySelector("span").innerText = likeValue;
    dislikeBtn.querySelector("span").innerText = dislikeValue;

    // Comprobar si ya están activos
    if (localStorage.getItem(`active-${likeKey}`) === 'true') {
        likeBtn.classList.add("active");
    }
    if (localStorage.getItem(`active-${dislikeKey}`) === 'true') {
        dislikeBtn.classList.add("active");
    }

    // Función para actualizar y guardar (refactorizado)
    const update = (btn, key, otherBtn, otherKey) => {
        let count = +(localStorage.getItem(key) || 0);
        let otherCount = +(localStorage.getItem(otherKey) || 0);

        if (!btn.classList.contains("active")) {
            // Activar: Sumar 1 y si el opuesto está activo, restarle 1
            count += 1;
            btn.classList.add("active");
            localStorage.setItem(`active-${key}`, 'true');
            
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

        btn.querySelector("span").innerText = count;
        localStorage.setItem(key, count);
    };

    likeBtn.addEventListener("click", () => update(likeBtn, likeKey, dislikeBtn, dislikeKey));
    dislikeBtn.addEventListener("click", () => update(dislikeBtn, dislikeKey, likeBtn, likeKey));
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
