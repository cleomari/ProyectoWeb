let minNumero, maxNumero, numeroRandom, intentos

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('iniciarJuegoBtn').addEventListener('click', iniciarJuego)
    document.getElementById('comprobarNumeroBtn').addEventListener('click', comprobarNumero)
    document.getElementById('reiniciarJuegoBtn').addEventListener('click', reiniciarJuego)
});

function iniciarJuego() {
    minNumero = parseInt(document.getElementById('rango-minimo').value)
    maxNumero = parseInt(document.getElementById('rango-maximo').value)

    if (isNaN(minNumero) || isNaN(maxNumero) || minNumero >= maxNumero) {
        alert('Por favor, ingresa un rango válido.')
        return
    }

    numeroRandom = generarNumeroRandom(minNumero, maxNumero);
    intentos = 0;

    document.getElementById('intentos').textContent = `Intentos restantes: ${5}`;
    document.getElementById('mensaje').textContent = '';
}

function generarNumeroRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function comprobarNumero() {
    const guessInput = document.getElementById('guessInput')
    const mensaje = document.getElementById('mensaje')
    const displayIntentos = document.getElementById('intentos')
    const intentoUsuario = parseInt(guessInput.value)

    if (isNaN(intentoUsuario) || intentoUsuario < minNumero || intentoUsuario > maxNumero) {
        mensaje.textContent = `Por favor, ingresa un número válido entre ${minNumero} y ${maxNumero}.`;
        mensaje.style.color = 'red';
        return;
    }

    intentos++;

    const pista = obtenerPista(intentoUsuario);
    
    if (intentoUsuario === numeroRandom) {      
        mensaje.textContent = `¡Correcto! Has adivinado el número en ${intentos} intentos.`;
        document.body.classList.add('background-change-win');
        mensaje.style.color = 'green';
        // Restablece los intentos después de adivinar correctamente
        intentos = 0;
    } else {       
        mensaje.textContent = `Incorrecto. ${pista}`;
        mensaje.style.color = 'red';

        const intentosRestantes = 5 - intentos;
        displayIntentos.textContent = `Intentos restantes: ${intentosRestantes}`;

        if (intentosRestantes === 1) {
            mensaje.textContent += ' ¡Piensa muy bien, es tu última oportunidad!';
        }

        if(intentosRestantes == 0){
            mensaje.textContent = `¡Juego terminado! El número correcto era ${numeroRandom}.`;
            mensaje.style.color = 'red';
            // Restablece los intentos después de agotar los intentos
            intentos = 0;
            document.body.classList.add('background-change-lose');
        }
    }      
}

function obtenerPista(guess) {
    const diferencia = Math.abs(numeroRandom - guess);

    if (diferencia >= 5) {
        return 'Estás muy lejos.'
    } else if (diferencia >= 2) {
        return 'Estás cerca.'
    } else {
        return 'Estás muy cerca.'
    }
}

function reiniciarJuego() {   
    document.getElementById('guessInput').value = ''
    document.getElementById('rango-minimo').value = ''
    document.getElementById('rango-maximo').value = ''
    document.getElementById('intentos').textContent = ''
    document.getElementById('mensaje').textContent = ''
    document.body.classList.remove('background-change-win', 'background-change-lose')
}
