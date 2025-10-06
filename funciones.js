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

// Likes merch
document.querySelectorAll(".like-btn").forEach(btn => {
  btn.addEventListener("click", ()=>{
    const span = btn.querySelector("span");
    span.innerText = +span.innerText + 1;
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
