const botonMenu = document.getElementById('boton-menu');
const nav = document.getElementById('nav-principal');
const etiquetaBoton = botonMenu.querySelector('.visualmente-oculto');

function menuAbierto() {
  return botonMenu.getAttribute('aria-expanded') === 'true';
}

function alternarMenu(abrir) {
  const estado = abrir ?? !menuAbierto();
  botonMenu.setAttribute('aria-expanded', String(estado));
  nav.classList.toggle('abierto', estado);
  etiquetaBoton.textContent = estado
    ? 'Cerrar menú de navegación'
    : 'Abrir menú de navegación';
}

botonMenu.addEventListener('click', () => alternarMenu());

nav.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    alternarMenu(false);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuAbierto()) {
    alternarMenu(false);
    botonMenu.focus();
  }
});

document.addEventListener('click', (e) => {
  if (menuAbierto() && !e.target.closest('.navbar')) {
    alternarMenu(false);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && menuAbierto()) {
    alternarMenu(false);
  }
});
