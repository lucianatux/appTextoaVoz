// Inicializar el objeto speechSynthesis
const synth = window.speechSynthesis;

// Obtener los elementos del DOM
const hablarBtn = document.querySelector('#hablar');
const pausarBtn = document.querySelector('#pausar');
const detenerBtn = document.querySelector('#detener');
const inputForm = document.querySelector("form");
const inputTxt = document.querySelector("textarea");
const voiceSelect = document.querySelector("select");

/*// Definir la función de hablar
const hablar = () => {
  // Verificar si ya se está hablando
  if (synth.speaking) {
    console.error('Ya se está reproduciendo un texto');
    return;
  }

  // Obtener el texto a convertir en voz
  const texto = new SpeechSynthesisUtterance(inputTxt.value);

  // Definir la voz a utilizar (en este caso, la voz por defecto)
  const voces = synth.getVoices();
  texto.voice = voces[0];

  // Definir la velocidad y el tono de la voz
  texto.rate = 1;
  texto.pitch = 1;

  // Reproducir el texto en voz
  synth.speak(texto);
};*/

// Definir la función de pausar
const pausar = () => {
  synth.pause();
};

// Definir la función de detener
const detener = () => {
  synth.cancel();
};

// Agregar los event listeners a los botones
hablarBtn.addEventListener('click', hablar);
pausarBtn.addEventListener('click', pausar);
detenerBtn.addEventListener('click', detener);


/**************************** */

function populateVoiceList() {
  voices = synth.getVoices();

  for (const voice of voices) {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;

    if (voice.default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

inputForm.onsubmit = (event) => {
  event.preventDefault();

  const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");
  utterThis.voice = voices.find((v) => v.name === selectedOption);
  synth.speak(utterThis);
  inputTxt.blur();
};