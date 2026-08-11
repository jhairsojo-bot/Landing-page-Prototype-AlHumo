const contenedorMenu = document.getElementById("contenedor-menu");

const filtrosContainer = document.createElement("div");
filtrosContainer.className = "menu-filtros";

const productosContainer = document.createElement("div");
productosContainer.id = "menu-productos-container";

function crearFiltros() {
  const categorias = ["Todos", ...menuCompleto.map((c) => c.categoria)];

  categorias.forEach((cat, i) => {
    const boton = document.createElement("button");
    boton.className = "menu-filtro" + (i === 0 ? " menu-filtro-activo" : "");
    boton.textContent = cat;
    boton.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    boton.addEventListener("click", () => filtrarPor(cat, boton));
    filtrosContainer.appendChild(boton);
  });
}

function renderizarMenu(categoria) {
  const categorias = categoria === "Todos"
    ? menuCompleto
    : menuCompleto.filter((c) => c.categoria === categoria);

  const fragmento = document.createDocumentFragment();

  categorias.forEach((cat) => {
    const seccion = document.createElement("div");
    seccion.className = "menu-seccion";

    const titulo = document.createElement("h3");
    titulo.className = "menu-categoria-titulo";
    titulo.textContent = cat.categoria;
    seccion.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "menu-productos-grid";

    cat.productos.forEach((prod) => {
      const articulo = document.createElement("article");
      articulo.className = "menu-producto";

      articulo.innerHTML =
        '<div class="menu-producto-info">' +
          '<h4 class="menu-producto-nombre">' + prod.nombre + "</h4>" +
          (prod.descripcion
            ? '<p class="menu-producto-descripcion">' + prod.descripcion + "</p>"
            : "") +
        "</div>" +
        '<span class="menu-producto-precio">' + prod.precio + "</span>";

      grid.appendChild(articulo);
    });

    seccion.appendChild(grid);
    fragmento.appendChild(seccion);
  });

  return fragmento;
}

function filtrarPor(categoria, botonActivo) {
  document.querySelectorAll(".menu-filtro").forEach((btn) => {
    btn.classList.remove("menu-filtro-activo");
    btn.setAttribute("aria-pressed", "false");
  });

  botonActivo.classList.add("menu-filtro-activo");
  botonActivo.setAttribute("aria-pressed", "true");

  productosContainer.innerHTML = "";
  productosContainer.appendChild(renderizarMenu(categoria));
}

function actualizarFlechas() {
  const scrollLeft = filtrosContainer.scrollLeft;
  const maxScroll = filtrosContainer.scrollWidth - filtrosContainer.clientWidth;
  flechaIzq.disabled = scrollLeft <= 0;
  flechaDer.disabled = scrollLeft >= maxScroll - 1;
}

const toolbar = document.createElement("div");
toolbar.className = "menu-filtros-toolbar";

const flechaIzq = document.createElement("button");
flechaIzq.className = "menu-flecha menu-flecha-izq";
flechaIzq.type = "button";
flechaIzq.setAttribute("aria-label", "Deslizar categorías a la izquierda");
flechaIzq.innerHTML = "&#9664;";
flechaIzq.addEventListener("click", function () {
  filtrosContainer.scrollBy({ left: -200, behavior: "smooth" });
});

const flechaDer = document.createElement("button");
flechaDer.className = "menu-flecha menu-flecha-der";
flechaDer.type = "button";
flechaDer.setAttribute("aria-label", "Deslizar categorías a la derecha");
flechaDer.innerHTML = "&#9654;";
flechaDer.addEventListener("click", function () {
  filtrosContainer.scrollBy({ left: 200, behavior: "smooth" });
});

filtrosContainer.addEventListener("scroll", actualizarFlechas);

toolbar.appendChild(flechaIzq);
toolbar.appendChild(filtrosContainer);
toolbar.appendChild(flechaDer);

crearFiltros();
contenedorMenu.appendChild(toolbar);
contenedorMenu.appendChild(productosContainer);
productosContainer.appendChild(renderizarMenu("Todos"));
requestAnimationFrame(actualizarFlechas);
