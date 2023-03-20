const hablarBtn = document.getElementById('hablar');
const detenerBtn = document.getElementById('detener');
const pausarBtn = document.getElementById('pausar');
const textoArea = document.getElementById('texto');
let voicesCargadas = false;


const utterance = new SpeechSynthesisUtterance();
let voices = [];
let paused = false;

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
    if (paused) {
      speechSynthesis.resume();
    } else {
      if (voicesCargadas) {
        speechSynthesis.speak(utterance);
      } else {
        console.log('Las voces aún no se han cargado. Por favor, espere unos segundos e inténtelo de nuevo.');
      }
    }
  }
  

function pausar() {
  speechSynthesis.pause();
  paused = true;
}

function detener() {
  speechSynthesis.cancel();
  paused = false;
}

hablarBtn.addEventListener('click', convertirTextoAVoz);
pausarBtn.addEventListener('click', pausar);
detenerBtn.addEventListener('click', detener);

window.addEventListener('load', iniciar);
