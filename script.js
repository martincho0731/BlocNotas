
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
    .then(reg => console.log('Service Worker registrado', reg))
    .catch(err => console.log('Error al registrar el Service Worker', err));
}


document.addEventListener("DOMContentLoaded", () => {
    const nuevaNotaBtn = document.getElementById("nuevaNota");
    const guardarNotaBtn = document.getElementById("guardarNota");
    const listaNotas = document.getElementById("listaNotas");
    const editor = document.getElementById("editor");
    const app = document.getElementById("app");
    const tituloInput = document.getElementById("titulo");
    const contenidoInput = document.getElementById("contenido");

    let notas = JSON.parse(localStorage.getItem("notas")) || [];
    let notaActual = null;

    function mostrarNotas() {
        listaNotas.innerHTML = "";
        notas.forEach((nota, index) => {
            const li = document.createElement("li");
            li.textContent = nota.titulo || "(Sin título)";
            li.addEventListener("click", () => editarNota(index));
            listaNotas.appendChild(li);
        });
    }

    function guardarNotas() {
        localStorage.setItem("notas", JSON.stringify(notas));
    }

    function nuevaNota() {
        notaActual = null;
        tituloInput.value = "";
        contenidoInput.value = "";
        app.classList.add("hidden");
        editor.classList.remove("hidden");
        tituloInput.focus();
    }

    function editarNota(index) {
        notaActual = index;
        tituloInput.value = notas[index].titulo;
        contenidoInput.value = notas[index].contenido;
        app.classList.add("hidden");
        editor.classList.remove("hidden");
        tituloInput.focus();
    }

    function guardarNota() {
        const titulo = tituloInput.value.trim();
        const contenido = contenidoInput.value.trim();
        if (titulo || contenido) {
            if (notaActual === null) {
                notas.push({ titulo, contenido });
            } else {
                notas[notaActual] = { titulo, contenido };
            }
            guardarNotas();
        }
        cerrarEditor();
    }

    function cerrarEditor() {
        editor.classList.add("hidden");
        app.classList.remove("hidden");
        tituloInput.value = "";
        contenidoInput.value = "";
        mostrarNotas();
    }

    nuevaNotaBtn.addEventListener("click", nuevaNota);
    guardarNotaBtn.addEventListener("click", guardarNota);
    mostrarNotas();
});