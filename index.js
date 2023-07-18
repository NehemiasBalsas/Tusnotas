console.log("Hola, estoy enlazado!");

const formulario = document.getElementById("formulario");
const notaInput = document.getElementById("nota-input");
const lista = document.getElementById("lista");

let listaDeNotas = [];
let notaActual = "";

function verificarNotasEnAlmacenamiento() {
  const notas = localStorage.getItem("notas");

  if (notas) {
    listaDeNotas = JSON.parse(notas);
    renderizarNotas();
  }
}
function renderizarNotas() {
  lista.innerHTML = ``;

  listaDeNotas.forEach((nota) => {
    const li = document.createElement("li");
    li.classList.add("nota-item");

    li.innerHTML = `
      <p class="nota-content">${nota}</p>
      <button class="copiar-button" onclick='copiarNota("${nota}")'><i class="far fa-copy"></i></button>
      <button class="eliminar-button" onclick='eliminarNota("${nota}")'><i class="fas fa-trash-alt"></i></button>
    `;

    lista.appendChild(li);
  });
}


function eliminarNota(nota) {
  const notaIndex = listaDeNotas.indexOf(nota);
  if (notaIndex !== -1) {
    listaDeNotas.splice(notaIndex, 1);
    localStorage.setItem("notas", JSON.stringify(listaDeNotas));
    renderizarNotas();
  }
}


function copiarNota(nota) {

  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = nota;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextarea);

  alert("¡Nota copiada al portapapeles!");
}

notaInput.addEventListener("keyup", (e) => {
  const notaSiendoEscrita = e.target.value;
  notaActual = notaSiendoEscrita;
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  listaDeNotas.push(notaInput.value);
  localStorage.setItem("notas", JSON.stringify(listaDeNotas));

  renderizarNotas();

  notaInput.value = "";
});

verificarNotasEnAlmacenamiento();
