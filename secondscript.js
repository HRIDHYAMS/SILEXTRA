const outputDivEnglish = document.getElementById('transcription');
const startButtonEnglish = document.getElementById('startButton');
const stopButtonEnglish = document.getElementById('stopButton');
const recognitionEnglish = new webkitSpeechRecognition() || new SpeechRecognition();
let isRecordingEnglish = false;

recognitionEnglish.lang = 'en-US';
recognitionEnglish.continuous = true;
recognitionEnglish.interimResults = true;

recognitionEnglish.onresult = function(event) {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
        } else {
            transcript += event.results[i][0].transcript + ' ';
        }
    }
    outputDivEnglish.style.fontSize = '30px';
    outputDivEnglish.style.color = '#482870'; 
    outputDivEnglish.style.fontWeight = 'bold';
    outputDivEnglish.textContent = transcript;
};

recognitionEnglish.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
};

startButtonEnglish.addEventListener('click', function() {
    if (!isRecordingEnglish) {
        recognitionEnglish.start();
        startButtonEnglish.disabled = true;
        stopButtonEnglish.disabled = false;
        outputDivEnglish.textContent = 'Listening...';
        isRecordingEnglish = true;
    }
});

stopButtonEnglish.addEventListener('click', function() {
    if (isRecordingEnglish) {
        recognitionEnglish.stop();
        startButtonEnglish.disabled = false;
        stopButtonEnglish.disabled = true;
        isRecordingEnglish = false;
    }
});

const outputDivMalayalam = document.getElementById('output'); 
const startButtonMalayalam = document.getElementById('startButtonMalayalam'); 
const stopButtonMalayalam = document.getElementById('stopButtonMalayalam'); 
const recognitionMalayalam = new webkitSpeechRecognition() || new SpeechRecognition();
let isRecordingMalayalam = false;

recognitionMalayalam.lang = 'ml-IN';
recognitionMalayalam.continuous = true;
recognitionMalayalam.interimResults = true;



recognitionMalayalam.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
};

startButtonMalayalam.addEventListener('click', function() {
    if (!isRecordingMalayalam) {
        recognitionMalayalam.start();
        startButtonMalayalam.disabled = true;
        stopButtonMalayalam.disabled = false;
        outputDivMalayalam.innerHTML = 'Listening...';
        isRecordingMalayalam = true;
    }
});

stopButtonMalayalam.addEventListener('click', function() {
    if (isRecordingMalayalam) {
        recognitionMalayalam.stop();
        startButtonMalayalam.disabled = false;
        stopButtonMalayalam.disabled = true;
        isRecordingMalayalam = false;
    }
});

recognitionMalayalam.onresult = function(event) {
    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
        } else {
            interimTranscript += event.results[i][0].transcript;
        }
    }
    outputDivMalayalam.style.fontSize = '20px';
    outputDivMalayalam.style.color = '#000000'; 
    outputDivMalayalam.style.fontWeight = 'bold';
    outputDivMalayalam.innerHTML = finalTranscript;
};

const alphabetImages = {
    a: "images/a.gif",
    b: "images/b.gif",
    c: "images/c.gif",
    d: "images/d.jpg",
    e: "images/e.gif",
    f: "images/f.gif",
    g: "images/g.gif",
    h: "images/h.jpg",
    i: "images/i.gif",
    j: "images/j.jpg",
    k: "images/k.jpg",
    l: "images/l.gif",
    m: "images/m.jpg",
    n: "images/n.jpg",
    o: "images/o.gif",
    p: "images/p.gif",
    q: "images/q.jpg",
    r: "images/r.gif",
    s: "images/s.gif",
    t: "images/t.gif",
    u: "images/u.gif",
    v: "images/v.gif",
    w: "images/w.gif",
    x: "images/x.jpg",
    y: "images/y.jpg",
    z: "images/z.gif",
};

function animateText() {
    const inputText = document.getElementById('textInput').value.toLowerCase();
    const animationContainer = document.getElementById('animationContainer');
    animationContainer.innerHTML = '';

    let index = 0;
    const interval = setInterval(() => {
        if (index < inputText.length) {
            const currentLetter = inputText[index];
            const image = new Image();
            image.src = alphabetImages[currentLetter] || '';
            image.className = 'letterImage';
            animationContainer.innerHTML = '';
            animationContainer.appendChild(image);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 2000);
}
