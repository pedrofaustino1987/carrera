let tiempoInicio;
let cronometroInterval;
let posicion = 1;

const tiempoDisplay = document.getElementById('tiempo-actual');
const listadoCorredores = document.getElementById('listado-corredores');
const nombreCorredorInput = document.getElementById('nombre-corredor');
const botonIniciar = document.getElementById('iniciar');
const botonPausar = document.getElementById('pausar');
const botonResetear = document.getElementById('resetear');
const botonRegistrar = document.getElementById('registrar-llegada');
const botonDetener = document.getElementById('detener');

botonIniciar.addEventListener('click', () => {
    tiempoInicio = Date.now();
    cronometroInterval = setInterval(actualizarCronometro, 1000);
    // Habilitamos el registro de llegadas
    botonRegistrar.disabled = false;
    nombreCorredorInput.disabled = false;
    nombreCorredorInput.focus();
});

botonPausar.addEventListener('click', () => {
    clearInterval(cronometroInterval);
});

botonResetear.addEventListener('click', () => {
    clearInterval(cronometroInterval);
    tiempoDisplay.innerText = '00:00:00';
    listadoCorredores.innerHTML = '';
    posicion = 1;
    
    // Reactivamos todos los botones y campos
    botonIniciar.disabled = false;
    botonPausar.disabled = false;
    botonRegistrar.disabled = false;
    botonDetener.disabled = false;
    nombreCorredorInput.disabled = false;
    nombreCorredorInput.value = '';
});

botonDetener.addEventListener('click', () => {
    clearInterval(cronometroInterval); 
    
    // Desactivamos los botones de control para evitar que se reinicie
    botonIniciar.disabled = true;
    botonPausar.disabled = true;
    botonRegistrar.disabled = true;
    nombreCorredorInput.disabled = true;
    console.log('La carrera ha finalizado.');
});

botonRegistrar.addEventListener('click', registrarLlegada);

// Añadimos el nuevo event listener para la tecla Enter
nombreCorredorInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        registrarLlegada();
    }
});

function registrarLlegada() {
    const nombre = nombreCorredorInput.value.trim();
    if (nombre === '') {
        alert('Por favor, ingresa el nombre o dorsal del corredor.');
        return;
    }
    
    const tiempoLlegada = tiempoDisplay.innerText;
    const corredorDiv = document.createElement('div');
    corredorDiv.innerHTML = `<strong>Posición ${posicion}:</strong> ${nombre} - Tiempo: ${tiempoLlegada}`;
    listadoCorredores.appendChild(corredorDiv);
    
    posicion++;
    nombreCorredorInput.value = '';
    nombreCorredorInput.focus(); 
}

function actualizarCronometro() {
    const tiempoActual = Date.now() - tiempoInicio;
    const segundos = Math.floor(tiempoActual / 1000) % 60;
    const minutos = Math.floor(tiempoActual / 1000 / 60) % 60;
    const horas = Math.floor(tiempoActual / 1000 / 60 / 60);

    const tiempoFormateado = 
        `${horas.toString().padStart(2, '0')}:` +
        `${minutos.toString().padStart(2, '0')}:` +
        `${segundos.toString().padStart(2, '0')}`;

    tiempoDisplay.innerText = tiempoFormateado;
}