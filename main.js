let personajes = [
  { nombre: "Guerrero", vida: 100, ataque: 10, defensa: 5 },
  { nombre: "Mago", vida: 80, ataque: 15, defensa: 2 },
  { nombre: "Pícaro", vida: 90, ataque: 12, defensa: 3 },
];

let enemigos = [
  { nombre: "Orco", vida: 50, ataque: 8, defensa: 2 },
  { nombre: "Goblin", vida: 40, ataque: 10, defensa: 1 },
  { nombre: "Ogro", vida: 60, ataque: 6, defensa: 3 },
  { nombre: "Esqueleto", vida: 30, ataque: 7, defensa: 1 },
  { nombre: "Bruja", vida: 45, ataque: 9, defensa: 2 },
  { nombre: "Troll", vida: 80, ataque: 10, defensa: 4 },
  { nombre: "Demonio Pequeño", vida: 70, ataque: 11, defensa: 3 },
  { nombre: "Vampiro", vida: 55, ataque: 12, defensa: 2 },
  { nombre: "Fantasma", vida: 25, ataque: 6, defensa: 1 },
  { nombre: "Jefe Dragón", vida: 100, ataque: 12, defensa: 5 },
];

let nombreJugador;
let personajeSeleccionado;
let enemigoSeleccionado;
let victorias = 0;

const nombreJugadorInput = document.getElementById("nombreJugador");
const elegirPersonajeBtn = document.getElementById("elegirPersonajeBtn");
const combatirBtn = document.getElementById("combatir-btn");
const mensajeDiv = document.getElementById("mensaje");
const victoriasDiv = document.getElementById("victorias");

function mostrarMensaje(mensaje) {
  mensajeDiv.textContent = mensaje;
}

function actualizarInfo() {
  document.getElementById("personaje-nombre").textContent =
    personajeSeleccionado.nombre;
  document.getElementById("personaje-vida").textContent =
    personajeSeleccionado.vida;
  document.getElementById("personaje-ataque").textContent =
    personajeSeleccionado.ataque;
  document.getElementById("personaje-defensa").textContent =
    personajeSeleccionado.defensa;

  document.getElementById("enemigo-nombre").textContent =
    enemigoSeleccionado.nombre;
  document.getElementById("enemigo-vida").textContent =
    enemigoSeleccionado.vida;
  document.getElementById("enemigo-ataque").textContent =
    enemigoSeleccionado.ataque;
  document.getElementById("enemigo-defensa").textContent =
    enemigoSeleccionado.defensa;
}

//COMBATIR

function combatir() {
  while (personajeSeleccionado.vida > 0 && enemigoSeleccionado.vida > 0) {
    let danoPersonaje = personajeSeleccionado.ataque - enemigoSeleccionado.defensa;
    if (danoPersonaje > 0) {
      enemigoSeleccionado.vida -= danoPersonaje;
    }

    if (enemigoSeleccionado.vida <= 0) {
      mostrarMensaje(personajeSeleccionado.nombre + " derrotó a " + enemigoSeleccionado.nombre + "!");
      victorias++;
      localStorage.setItem("victorias", victorias);

      //JEFE DRAGON

      if (victorias === 10) {
        enemigoSeleccionado = enemigos.find((enemigo) => enemigo.nombre === "Jefe Dragón");
        mostrarMensaje("¡Ha aparecido el temible Jefe Dragón!");
        victorias = 0;
      } else {
        enemigoSeleccionado = enemigos[Math.floor(Math.random() * enemigos.length)];
      }

      break;
    }
    let danoEnemigo = enemigoSeleccionado.ataque - personajeSeleccionado.defensa;
    if (danoEnemigo > 0) {
      personajeSeleccionado.vida -= danoEnemigo;
    }

    if (personajeSeleccionado.vida <= 0) {
      mostrarMensaje(personajeSeleccionado.nombre + " fue derrotado por " + enemigoSeleccionado.nombre + "!");
    }
  }

  actualizarInfo();
  combatirBtn.disabled = true;
  victoriasDiv.textContent = "Victorias: " + victorias;
}

elegirPersonajeBtn.addEventListener("click", function () {
  nombreJugador = nombreJugadorInput.value;
  if (nombreJugador) {
    let selectPersonajes = document.createElement("select");
    for (let i = 0; i < personajes.length; i++) {
      let option = document.createElement("option");
      option.textContent = personajes[i].nombre;
      selectPersonajes.appendChild(option);
    }
    mensajeDiv.textContent = "Hola " + nombreJugador + ", elige tu personaje:";
    mensajeDiv.appendChild(selectPersonajes);
    selectPersonajes.addEventListener("change", function () {
      const opcion = selectPersonajes.selectedIndex;
      personajeSeleccionado = personajes[opcion];
      mensajeDiv.textContent = "";
      enemigoSeleccionado = enemigos[Math.floor(Math.random() * enemigos.length)];
      actualizarInfo();
      combatirBtn.disabled = false;
    });
  } else {
    personajeSeleccionado = personajes[Math.floor(Math.random() * personajes.length)];
    mostrarMensaje("¿Así que anónimo verdad? Entonces elegiré por ti");
    enemigoSeleccionado = enemigos[Math.floor(Math.random() * enemigos.length)];
    actualizarInfo();
    combatirBtn.disabled = false;
  }
});

combatirBtn.addEventListener("click", combatir);

document.addEventListener("DOMContentLoaded", function () {
  victorias = parseInt(localStorage.getItem("victorias")) || 0;
  victoriasDiv.textContent = "Victorias: " + victorias;
});

