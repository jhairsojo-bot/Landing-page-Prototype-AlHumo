const vistaInicio = document.getElementById("vista-inicio");
const vistaMenu = document.getElementById("vista-menu");
const tituloPagina = document.title;

function cambiarVista(hash) {
  const esMenu = hash === "#/menu";

  vistaInicio.hidden = esMenu;
  vistaMenu.hidden = !esMenu;

  document.title = esMenu
    ? "Menú — AL HUMO"
    : tituloPagina;

  const destino = esMenu
    ? document.getElementById("menu-titulo")
    : document.getElementById("hero-titulo");

  if (destino) {
    destino.setAttribute("tabindex", "-1");
    destino.focus();
    destino.removeAttribute("tabindex");
  }
}

function manejarHash() {
  cambiarVista(location.hash);
}

window.addEventListener("hashchange", manejarHash);

manejarHash();
