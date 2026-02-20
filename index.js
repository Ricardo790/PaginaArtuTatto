const TATTOOS = [
  //seccion de practicas
  { id: 1, title: "", category: "Practicas", url: "Practicas/1.webp" },
  { id: 2, title: "", category: "Practicas", url: "Practicas/2.webp" },
  { id: 3, title: "", category: "Practicas", url: "Practicas/3.webp" },
  { id: 4, title: "", category: "Practicas", url: "Practicas/4.webp" },
  { id: 5, title: "", category: "Practicas", url: "Practicas/5.webp" },
  { id: 6, title: "", category: "Practicas", url: "Practicas/6.webp" },
  { id: 7, title: "", category: "Practicas", url: "Practicas/jackie.webp" },
  //seccion de linea fina
  { id: 8, title: "", category: "Linea Fina", url: "LineaFina/1.webp" },
  { id: 9, title: "", category: "Linea Fina", url: "LineaFina/2.webp" },
  { id: 10, title: "", category: "Linea Fina", url: "LineaFina/3.webp" },
  { id: 11, title: "", category: "Linea Fina", url: "LineaFina/4.webp" },
  { id: 12, title: "", category: "Linea Fina", url: "LineaFina/5.webp" },
  { id: 13, title: "", category: "Linea Fina", url: "LineaFina/6.webp" },
  { id: 14, title: "", category: "Linea Fina", url: "LineaFina/7.webp" },
  //seccion de black
  { id: 15, title: "", category: "Black Work", url: "BlackWork/1.webp" },
  { id: 16, title: "", category: "Black Work", url: "BlackWork/2.webp" },
  { id: 17, title: "", category: "Black Work", url: "BlackWork/3.webp" },
  { id: 18, title: "", category: "Black Work", url: "BlackWork/4.webp" },
  { id: 19, title: "", category: "Black Work", url: "BlackWork/5.webp" },
  { id: 20, title: "", category: "Black Work", url: "BlackWork/6.webp" },
  { id: 21, title: "", category: "Black Work", url: "BlackWork/7.webp" },

  //seccion de semi Semi Realismo
  { id: 1, title: "", category: "Semi Realismo", url: "SemiRealismo/1.webp" },
  { id: 22, title: "", category: "Semi Realismo", url: "SemiRealismo/2.webp" },
  { id: 23, title: "", category: "Semi Realismo", url: "SemiRealismo/3.webp" },
  { id: 24, title: "", category: "Semi Realismo", url: "SemiRealismo/4.webp" },
  { id: 25, title: "", category: "Semi Realismo", url: "SemiRealismo/5.webp" },
  { id: 26, title: "", category: "Semi Realismo", url: "SemiRealismo/6.webp" },
  {
    id: 27,
    title: " ",
    category: "SemiRealismo",
    url: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=800",
  },
];

let currentLimit = 6;
let currentCategory = "Todos";

function renderGallery(filter = "Todos") {
  const grid = document.getElementById("gallery-grid");
  grid.style.opacity = "0";

  setTimeout(() => {
    grid.innerHTML = "";
    //const filtered = filter === 'Todos' ? TATTOOS : TATTOOS.filter(t => t.category === filter);
    currentCategory = filter;

    const filtered =
      filter === "Todos"
        ? TATTOOS
        : TATTOOS.filter((t) => t.category === filter);

    const limited = filtered.slice(0, currentLimit);

    limited.forEach((t, index) => {
      const item = document.createElement("div");
      item.className =
        "gallery-item reveal group bg-[#0a0a0a] border border-white/5 overflow-hidden";
      item.style.transitionDelay = `${index * 100}ms`;

      item.innerHTML = `
                <div class="relative aspect-[3/4] overflow-hidden">
                    <img src="${t.url}" loading="lazy" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-8">
                        <div class="text-center">
                            <h4 class="font-serif-bold text-2xl mb-2 text-[#c5a059]">${t.title}</h4>
                            <span class="text-[9px] uppercase tracking-widest text-white/50">${t.category}</span>
                        </div>
                    </div>
                </div>
              <div class="p-8 text-center">
    <a 
      href="https://wa.me/7779750237?text=${encodeURIComponent(`Hola Artu, me interesa un diseño similar al estilo ${t.category}. ¿Podemos hablar sobre una idea personalizada?`)}"
      target="_blank"
      class="inline-block mt-4 border border-[#c5a059]/40 px-6 py-3 uppercase text-[10px] font-bold tracking-[0.3em] hover:bg-[#c5a059]/10 transition-all"
    >
      Consultar este diseño
    </a>
</div>
            `;
      grid.appendChild(item);
    });
    grid.style.opacity = "1";
    observeElements();
  }, 300);
}

// Filtrado
window.filterGallery = (cat) => {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active", "bg-[#c5a059]", "text-black", "font-bold");
    btn.classList.add("border-white/10", "text-zinc-500");
    if (
      btn.innerText.toLowerCase() === cat.toLowerCase() ||
      (cat === "Todos" && btn.innerText === "Todos")
    ) {
      btn.classList.add("active", "bg-[#c5a059]", "text-black", "font-bold");
      btn.classList.remove("border-white/10", "text-zinc-500");
    }
  });
  currentLimit = 6;
  renderGallery(cat);
};

// Observador para animaciones
function observeElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  renderGallery();

  // 🔥 BOTÓN VER MÁS
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      currentLimit += 6;
      renderGallery(currentCategory);
    });
  }

  // Formulario de Cita
  const form = document.getElementById("appointment-form");
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById("form-name").value;
      const style = document.getElementById("form-style").value;
      const idea = document.getElementById("form-idea").value;
      const msg = `Hola Artu, soy ${name}. Quiero consultar disponibilidad para un tatuaje estilo ${style}. Idea: ${idea}`;
      window.open(
        `https://wa.me/7779750237?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
    };
  }
});
