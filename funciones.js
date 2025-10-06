// Toggle menú móvil
document.querySelector(".nav-toggle").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("open");
});

// Carousel simple
document.querySelectorAll(".carousel").forEach(carousel => {
  const inner = carousel.querySelector(".carousel-inner");
  const prev = carousel.querySelector(".prev");
  const next = carousel.querySelector(".next");
  let index = 0;
  const items = inner.children;
  const total = items.length;

  function showSlide(i){
    inner.style.transform = `translateX(-${i * 100}%)`;
  }

  prev.addEventListener("click", ()=>{
    index = (index - 1 + total) % total;
    showSlide(index);
  });

  next.addEventListener("click", ()=>{
    index = (index + 1) % total;
    showSlide(index);
  });
});

// Contadores animados
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / 100;
    if(count < target){
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount,20);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

// Likes y Dislikes persistentes con corazones
document.querySelectorAll(".merch-card").forEach((card, index) => {
  const likeBtn = card.querySelector(".like-btn");
  
  // Crear botón de dislike
  const dislikeBtn = document.createElement("div");
  dislikeBtn.classList.add("like-btn", "dislike-btn");
  dislikeBtn.innerHTML = "💔 <span>0</span>";
  card.appendChild(dislikeBtn);

  const likeKey = `like-${index}`;
  const dislikeKey = `dislike-${index}`;

  // Cargar valores desde localStorage
  const likeValue = localStorage.getItem(likeKey);
  const dislikeValue = localStorage.getItem(dislikeKey);

  if (likeValue) {
    likeBtn.querySelector("span").innerText = likeValue;
    if(likeValue>0) likeBtn.classList.add("active");
  }
  if (dislikeValue) {
    dislikeBtn.querySelector("span").innerText = dislikeValue;
    if(dislikeValue>0) dislikeBtn.classList.add("active");
  }

  // Click en Like
  likeBtn.addEventListener("click", () => {
    let count = +likeBtn.querySelector("span").innerText;

    if (!likeBtn.classList.contains("active")) {
      count++;
      likeBtn.classList.add("active");
      likeBtn.innerHTML = `❤️ <span>${count}</span>`;
      // Quitar dislike si estaba activo
      if (dislikeBtn.classList.contains("active")) {
        dislikeBtn.classList.remove("active");
        let dCount = +dislikeBtn.querySelector("span").innerText;
        dCount = dCount > 0 ? dCount - 1 : 0;
        dislikeBtn.querySelector("span").innerText = dCount;
        localStorage.setItem(dislikeKey, dCount);
      }
    } else {
      count--;
      likeBtn.classList.remove("active");
      likeBtn.innerHTML = `❤️ <span>${count}</span>`;
    }

    likeBtn.querySelector("span").innerText = count;
    localStorage.setItem(likeKey, count);
  });

  // Click en Dislike
  dislikeBtn.addEventListener("click", () => {
    let count = +dislikeBtn.querySelector("span").innerText;

    if (!dislikeBtn.classList.contains("active")) {
      count++;
      dislikeBtn.classList.add("active");
      dislikeBtn.innerHTML = `💔 <span>${count}</span>`;
      // Quitar like si estaba activo
      if (likeBtn.classList.contains("active")) {
        likeBtn.classList.remove("active");
        let lCount = +likeBtn.querySelector("span").innerText;
        lCount = lCount > 0 ? lCount - 1 : 0;
        likeBtn.innerHTML = `❤️ <span>${lCount}</span>`;
        localStorage.setItem(likeKey, lCount);
      }
    } else {
      count--;
      dislikeBtn.classList.remove("active");
      dislikeBtn.innerHTML = `💔 <span>${count}</span>`;
    }

    dislikeBtn.querySelector("span").innerText = count;
    localStorage.setItem(dislikeKey, count);
  });
});


// Scroll a secciones visible
const sections = document.querySelectorAll(".card-section");
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:0.2});
sections.forEach(sec=>observer.observe(sec));

// Scroll top button
const scrollBtn = document.createElement("button");
scrollBtn.id = "scrollTop";
scrollBtn.innerHTML = "⬆";
document.body.appendChild(scrollBtn);
scrollBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
window.addEventListener("scroll", ()=>{
  if(window.scrollY > 200) scrollBtn.classList.add("show");
  else scrollBtn.classList.remove("show");
});

// Abrir formulario según el producto
document.querySelectorAll(".buy-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const url = btn.getAttribute("data-url");
    if(url) window.open(url, "_blank");
  });
});

