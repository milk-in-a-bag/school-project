const listen = document.querySelector('.listen-button');
const clear = document.querySelector('.clear-button');
const download = document.querySelector('.download-button');
const words = document.querySelector('.text');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recording = false;

function speechToText(){
   let recognition = new SpeechRecognition;
   recognition.interimResults = true;
   listen.innerText = 'Listening...'

   let p = document.createElement('p');

   recognition.addEventListener('result', (e)=>{
    const text = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    
        p.innerText = text;
        words.appendChild(p);

        if(e.results[0].isFinal){
            p = document.createElement('p');
        }
        
        download.style.cursor = 'pointer';
        download.style.backgroundColor = '#17A1FA';
        listen.style.border = 'none';

        clear.style.cursor = 'pointer';
        clear.style.backgroundColor = '#17A1FA';

    console.log(text);
    
});

recognition.addEventListener('end', ()=>{
    recognition.start();
})
recognition.start();
}

listen.addEventListener("click", () => {
    if (!recording) {
      speechToText();
      recording = true;
    } else{
        stopRecording();
    }
});

function stopRecording(){
    recognition.stop();
    listen.innerText = "Start Listening";
    recording = false;
}

clear.addEventListener('click', ()=>{
    words.innerText = '';
    download.style.cursor = 'not-allowed';
    download.style.backgroundColor = 'rgba(179, 179, 179, 0.7)'

    clear.style.cursor = 'not-allowed';
    clear.style.backgroundColor = 'rgba(179, 179, 179, 0.7)';
    stopRecording();
})

function saveFile() {
    const text = words.innerText;
    const filename = "speech.txt";
  
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  
  download.addEventListener("click", saveFile);