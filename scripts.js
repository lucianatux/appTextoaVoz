

const hablarBtn = document.getElementById('hablar');
const detenerBtn = document.getElementById('detener');
const pausarBtn = document.getElementById('pausar');
const textoArea = document.getElementById('texto');
let voicesCargadas = false;


const utterance = new SpeechSynthesisUtterance();
let voices = [];
let estado = 'detenido';

utterance.onpause = () => {
    estado = 'pausado';
  };
  utterance.onend = () => {
    estado = 'detenido';
  };
  

function obtenerVoces() {
    voices = speechSynthesis.getVoices();
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      document.getElementById('voices').appendChild(option);
    }
    voicesCargadas = true;
  }

  obtenerVoces();
  

function iniciar() {
  if ('speechSynthesis' in window) {
    obtenerVoces();
    speechSynthesis.addEventListener('voiceschanged', obtenerVoces);
  } else {
    console.log('La API de SpeechSynthesis no está disponible en este navegador.');
  }
}

document.getElementById('voices').addEventListener('change', () => {
  utterance.voice = voices[document.getElementById('voices').value];
});

function convertirTextoAVoz() {
    utterance.text = textoArea.value;
    if (estado === 'pausado') {
      speechSynthesis.resume();
    } else {
      speechSynthesis.speak(utterance);
    }
    estado = 'hablando';
    console.log('Reproduciendo...');
  }
  
  

function pausar() {
  speechSynthesis.pause();
  paused = true;
  estado = 'pausado';
  console.log('Pausado...');
}

function detener() {
  speechSynthesis.cancel();
  paused = false;
  estado = 'detenido';
  console.log('Detenido...');
}

hablarBtn.addEventListener('click', convertirTextoAVoz);
pausarBtn.addEventListener('click', pausar);
detenerBtn.addEventListener('click', detener);

window.addEventListener('load', iniciar)