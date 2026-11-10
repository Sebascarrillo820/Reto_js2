// Reto: búsqueda de datos en un arreglo de objetos utilizando Promesas.

// Arreglo de estudiantes proporcionado en el enunciado.
const estudiantes = [
    { id: 1, nombre: 'Ana', edad: 20 },
    { id: 2, nombre: 'Juan', edad: 22 },
    { id: 3, nombre: 'María', edad: 21 },
];

/*
 * Busca un estudiante por su ID.
 * La función devuelve una Promesa:
 * - resolve() si encuentra al estudiante.
 * - reject() si no existe un estudiante con ese ID.
 */
function buscarEstudiantePorId(id) {
    return new Promise((resolve, reject) => {
        const estudianteEncontrado = estudiantes.find(
            (estudiante) => estudiante.id === id
        );

        if (estudianteEncontrado) {
            resolve(estudianteEncontrado);
        } else {
            reject(new Error(`No existe un estudiante con el ID ${id}.`));
        }
    });
}

// Elementos de la página que utilizaremos para mostrar la información.
const formulario = document.getElementById('search-form');
const campoId = document.getElementById('student-id');
const resultado = document.getElementById('result');
const tablaEstudiantes = document.getElementById('students-table');

// Muestra todos los estudiantes del arreglo en la tabla HTML.
function mostrarEstudiantes() {
    tablaEstudiantes.innerHTML = '';

    estudiantes.forEach((estudiante) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${estudiante.id}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.edad}</td>
        `;

        tablaEstudiantes.appendChild(fila);
    });
}

// Actualiza el área de resultado cuando la búsqueda es exitosa.
function mostrarResultadoExitoso(estudiante) {
    resultado.className = 'result success';
    resultado.innerHTML = `
        <div class="student-name">${estudiante.nombre}</div>
        <div>ID: ${estudiante.id}</div>
        <div>Edad: ${estudiante.edad} años</div>
    `;
}

// Actualiza el área de resultado cuando ocurre un error.
function mostrarError(error) {
    resultado.className = 'result error';
    resultado.textContent = `Error: ${error.message}`;
}

// Ejecuta una búsqueda y maneja la Promesa con then() y catch().
function realizarBusqueda(id) {
    buscarEstudiantePorId(id)
        .then((estudiante) => {
            // Se ejecuta cuando la Promesa se resuelve.
            mostrarResultadoExitoso(estudiante);
            console.log(`Búsqueda del estudiante con ID ${id}`);
            console.log(`Nombre: ${estudiante.nombre}, Edad: ${estudiante.edad}`);
        })
        .catch((error) => {
            // Se ejecuta cuando la Promesa es rechazada.
            mostrarError(error);
            console.error(`Búsqueda del estudiante con ID ${id}`);
            console.error(`Error: ${error.message}`);
        });
}

// Escucha el envío del formulario.
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const id = Number(campoId.value);

    if (!Number.isInteger(id) || id <= 0) {
        mostrarError(new Error('Ingresa un ID entero mayor que cero.'));
        return;
    }

    realizarBusqueda(id);
});

// Los botones de ejemplo ejecutan búsquedas rapidas.
document.querySelectorAll('.example-button').forEach((boton) => {
    boton.addEventListener('click', () => {
        const id = Number(boton.dataset.id);
        campoId.value = id;
        realizarBusqueda(id);
    });
});

// Carga la tabla al abrir la pagina.
mostrarEstudiantes();

// Los resultados se muestran en la consola usando then() y catch().
[2, 1, 10].forEach((id) => {
    buscarEstudiantePorId(id)
        .then((estudiante) => {
            console.log(`Búsqueda del estudiante con ID ${id}`);
            console.log(`Nombre: ${estudiante.nombre}, Edad: ${estudiante.edad}`);
        })
        .catch((error) => {
            console.error(`Búsqueda del estudiante con ID ${id}`);
            console.error(`Error: ${error.message}`);
        });
});
