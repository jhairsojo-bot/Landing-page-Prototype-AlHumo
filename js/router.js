const vistaInicio = document.getElementById("vista-inicio");
const vistaMenu = document.getElementById("vista-menu");
const transicionHumo = document.getElementById("transicion-humo");
const tituloPagina = document.title;

const DURACION_EXTRA = 80;

let transicionando = false;
let hashPendiente = false;
let primerCambio = true;

function enfocar(elemento) {
  if (!elemento) return;
  elemento.setAttribute("tabindex", "-1");
  elemento.focus({ preventScroll: true });
  elemento.removeAttribute("tabindex");
}

function aplicarVista(hash) {
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

function duracionTransicion() {
  const duracion = getComputedStyle(transicionHumo).transitionDuration;
  return parseFloat(duracion) * 1000 || 0;
}

function esperarFase(clase) {
  return new Promise((resolver) => {
    transicionHumo.classList.add(clase);
    setTimeout(resolver, duracionTransicion() + DURACION_EXTRA);
  });
}

async function transicionar(hash) {
  transicionando = true;

  await esperarFase("entrando");
  aplicarVista(hash);
  transicionHumo.classList.remove("entrando");
  await esperarFase("saliendo");
  transicionHumo.classList.remove("saliendo");

  transicionando = false;

  if (hashPendiente) {
    hashPendiente = false;
    manejarHash();
  }
}

function cambiarVista(hash) {
  const esMenu = hash === "#/menu";
  const vistaActualEsMenu = !vistaMenu.hidden;
  const primerCarga = primerCambio;
  primerCambio = false;

  if (!transicionando && !primerCarga && esMenu !== vistaActualEsMenu) {
    transicionar(hash);
    return;
  }

  aplicarVista(hash);
}

function manejarHash() {
  if (transicionando) {
    hashPendiente = true;
    return;
  }
  cambiarVista(location.hash);
}

window.addEventListener("hashchange", manejarHash);

manejarHash();
