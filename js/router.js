const vistaInicio = document.getElementById("vista-inicio");
const vistaMenu = document.getElementById("vista-menu");
const tituloPagina = document.title;

function enfocar(elemento) {
  if (!elemento) return;
  elemento.setAttribute("tabindex", "-1");
  elemento.focus({ preventScroll: true });
  elemento.removeAttribute("tabindex");
}

function cambiarVista(hash) {
  const esMenu = hash === "#/menu";

  vistaInicio.hidden = esMenu;
  vistaMenu.hidden = !esMenu;

  document.title = esMenu
    ? "Menú — AL HUMO"
    : tituloPagina;

  if (esMenu) {
    enfocar(document.getElementById("menu-titulo"));
    window.scrollTo(0, 0);
    return;
  }

  const idSeccion = hash.slice(1);
  const seccion = idSeccion
    ? document.getElementById(idSeccion)
    : null;

  if (seccion) {
    seccion.scrollIntoView();
    enfocar(seccion);
  } else {
    window.scrollTo(0, 0);
  }
}

function manejarHash() {
  cambiarVista(location.hash);
}

window.addEventListener("hashchange", manejarHash);

manejarHash();
