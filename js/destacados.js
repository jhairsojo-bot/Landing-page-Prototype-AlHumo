const contenedorDestacados = document.getElementById("contenedor-destacados");

contenedorDestacados.innerHTML = platosDestacados
  .map(
    (plato) => `
      <article class="tarjeta">
        <img
          class="tarjeta-imagen"
          src="${plato.imagen}"
          alt="Plato: ${plato.nombre}"
          loading="lazy"
        />
        <div class="tarjeta-cuerpo">
          <h3 class="tarjeta-nombre">${plato.nombre}</h3>
          <p class="tarjeta-descripcion">${plato.descripcion}</p>
          <p class="tarjeta-precio">${plato.precio}<span> — precio demostrativo</span></p>
        </div>
      </article>
    `
  )
  .join("");

const observadorRevelado = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("revelada");
        observadorRevelado.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.15 }
);

contenedorDestacados
  .querySelectorAll(".tarjeta")
  .forEach((tarjeta) => observadorRevelado.observe(tarjeta));
