const listen = document.querySelector('.listen-button');
const clear = document.querySelector('.clear-button');
const download = document.querySelector('.download-button');
const words = document.querySelector('.text');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recording = false;

function speechToText(){
   const recognition = new SpeechRecognition;
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
    recordBtn.querySelector("p").innerHTML = "Start Listening";
    recording = false;
}

clear.addEventListener('click', ()=>{
    words.innerHTML = '';
    download.style.cursor = 'not-allowed';
    download.style.backgroundColor = 'rgba(179, 179, 179, 0.7)'

    clear.style.cursor = 'not-allowed';
    clear.style.backgroundColor = 'rgba(179, 179, 179, 0.7)';
})