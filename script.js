document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const configuracionSection = document.getElementById('configuracion');
    const ingresoNotasSection = document.getElementById('ingresoNotas');
    const resultadosFinalesSection = document.getElementById('resultadosFinales');
    const cantidadEstudiantesInput = document.getElementById('cantidadEstudiantes');
    const btnIniciar = document.getElementById('btnIniciar');
    const tituloEstudiante = document.getElementById('tituloEstudiante');
    const nota1Input = document.getElementById('nota1');
    const nota2Input = document.getElementById('nota2');
    const btnCalcular = document.getElementById('btnCalcular');
    const modalResultado = document.getElementById('modalResultado');
    const resultadoIndividual = document.getElementById('resultadoIndividual');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const btnCerrarModal = document.querySelector('.close');
    const listaResultados = document.getElementById('listaResultados');
    const btnReiniciar = document.getElementById('btnReiniciar');

    // Variables del programa
    let cantidadEstudiantes = 0;
    let estudianteActual = 1;
    let resultados = [];

    // Event Listeners
    btnIniciar.addEventListener('click', iniciarProceso);
    btnCalcular.addEventListener('click', calcularPromedio);
    btnSiguiente.addEventListener('click', siguienteEstudiante);
    btnCerrarModal.addEventListener('click', cerrarModal);
    btnReiniciar.addEventListener('click', reiniciar);

    // Cerrar modal si se hace clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modalResultado) {
            cerrarModal();
        }
    });

    // Permitir Enter para calcular
    nota1Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            nota2Input.focus();
        }
    });

    nota2Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularPromedio();
        }
    });

    // Funciones
    function iniciarProceso() {
        cantidadEstudiantes = parseInt(cantidadEstudiantesInput.value);
        
        if (isNaN(cantidadEstudiantes) || cantidadEstudiantes <= 0 || cantidadEstudiantes > 50) {
            alert('Por favor, ingrese una cantidad válida de estudiantes (1-50).');
            return;
        }
        
        configuracionSection.classList.add('hidden');
        ingresoNotasSection.classList.remove('hidden');
        actualizarInterfazEstudiante();
    }

    function actualizarInterfazEstudiante() {
        tituloEstudiante.textContent = `Estudiante ${estudianteActual}`;
        nota1Input.value = '';
        nota2Input.value = '';
        nota1Input.focus();
        
        // Actualizar progreso si existe
        actualizarBarraProgreso();
    }

    function actualizarBarraProgreso() {
        let progressBar = document.querySelector('.progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            const progress = document.createElement('div');
            progress.className = 'progress';
            progressBar.appendChild(progress);
            ingresoNotasSection.insertBefore(progressBar, ingresoNotasSection.querySelector('.notas-container'));
        }
        
        const progress = progressBar.querySelector('.progress');
        const porcentaje = ((estudianteActual - 1) / cantidadEstudiantes) * 100;
        progress.style.width = `${porcentaje}%`;
    }

    function calcularPromedio() {
        const nota1 = parseFloat(nota1Input.value);
        const nota2 = parseFloat(nota2Input.value);
        
        if (isNaN(nota1) || isNaN(nota2) || nota1 < 0 || nota1 > 100 || nota2 < 0 || nota2 > 100) {
            alert('Por favor, ingrese notas válidas entre 0 y 100.');
            return;
        }
        
        const promedio = Math.round((nota1 + nota2) / 2);
        
        // Guardar resultado
        resultados.push({
            estudiante: estudianteActual,
            nota1: nota1,
            nota2: nota2,
            promedio: promedio
        });
        
        // Mostrar resultado en modal
        mostrarResultadoIndividual(nota1, nota2, promedio);
    }

    function mostrarResultadoIndividual(nota1, nota2, promedio) {
        resultadoIndividual.innerHTML = `
            <div class="resultado-item">
                <h4>Estudiante ${estudianteActual}</h4>
                <p><span>Nota 1:</span> <span>${nota1}</span></p>
                <p><span>Nota 2:</span> <span>${nota2}</span></p>
                <p class="promedio"><span>Promedio:</span> <span>${promedio}</span></p>
            </div>
        `;
        
        // Cambiar texto del botón si es el último estudiante
        if (estudianteActual === cantidadEstudiantes) {
            btnSiguiente.textContent = 'Ver Resultados Finales';
        } else {
            btnSiguiente.textContent = 'Siguiente Estudiante';
        }
        
        modalResultado.classList.remove('hidden');
    }

    function siguienteEstudiante() {
        cerrarModal();
        
        estudianteActual++;
        
        if (estudianteActual > cantidadEstudiantes) {
            // Mostrar resultados finales
            ingresoNotasSection.classList.add('hidden');
            resultadosFinalesSection.classList.remove('hidden');
            mostrarResultadosFinales();
        } else {
            // Continuar con siguiente estudiante
            actualizarInterfazEstudiante();
        }
    }

    function mostrarResultadosFinales() {
        listaResultados.innerHTML = '';
        
        resultados.forEach(resultado => {
            const resultadoItem = document.createElement('div');
            resultadoItem.className = 'resultado-item';
            resultadoItem.innerHTML = `
                <h4>Estudiante ${resultado.estudiante}</h4>
                <p><span>Nota 1:</span> <span>${resultado.nota1}</span></p>
                <p><span>Nota 2:</span> <span>${resultado.nota2}</span></p>
                <p class="promedio"><span>Promedio:</span> <span>${resultado.promedio}</span></p>
            `;
            listaResultados.appendChild(resultadoItem);
        });
    }

    function cerrarModal() {
        modalResultado.classList.add('hidden');
    }

    function reiniciar() {
        // Resetear variables
        cantidadEstudiantes = 0;
        estudianteActual = 1;
        resultados = [];
        
        // Resetear interfaz
        cantidadEstudiantesInput.value = '';
        resultadosFinalesSection.classList.add('hidden');
        configuracionSection.classList.remove('hidden');
        
        // Resetear botón
        btnSiguiente.textContent = 'Siguiente Estudiante';
        
        // Eliminar barra de progreso si existe
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.remove();
        }
    }
});