document.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener("keydown", function(event) {
        // Check if the correct key combination is pressed
        if (event.key === "Å") { //opt-shift-a on Mac; change to whatever key you want
            var s = window.getSelection().toString();
            if (s) {
                TextToSpeech(s);
            } else {
                alert('Please select some text to speak.');
            }
        }
    })
});

function TextToSpeech(s) {
    var sModelId = "tts-1"; //Choos model here; API Reference: https://platform.openai.com/docs/models/tts
    var sVoiceId = "onyx";  //Choose your voice here: https://platform.openai.com/docs/guides/text-to-speech/voice-options
    var API_KEY = ""; //Your API Key Here

    ShowSpinner();

    var oHttp = new XMLHttpRequest();
    oHttp.open("POST", "https://api.openai.com/v1/audio/speech");
    oHttp.setRequestHeader("Accept", "audio/mpeg");
    oHttp.setRequestHeader("Content-Type", "application/json");
    oHttp.setRequestHeader("Authorization", "Bearer " + API_KEY);

    oHttp.onload = function () {
        if (oHttp.readyState === 4) {
            HideSpinner();
            if (oHttp.status === 200) {
                var oBlob = new Blob([this.response], { "type": "audio/mpeg" });
                var audioURL = window.URL.createObjectURL(oBlob);
                var audio = new Audio();
                audio.src = audioURL;
                audio.play();
            } else {
                console.error('Error: ' + oHttp.statusText);
                alert('There was an error processing the text-to-speech request.');
            }
        }
    };

    oHttp.onerror = function () {
        HideSpinner();
        console.error('Network Error');
        alert('Network error occurred.');
    };

    var data = {
        model: sModelId,
        input: s,
        voice: sVoiceId
    };

    oHttp.responseType = "arraybuffer";
    oHttp.send(JSON.stringify(data));
}

function ShowSpinner() {
    var o = document.getElementById('spinnerContainer');
    if (o) return;

    var style = document.getElementById('SpinnerStyle');
    if (style == null) {
        style = document.createElement("style");
        style.id = "SpinnerStyle";
        style.textContent = ".spinner-container { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999;}"
                          + ".spinner {border: 4px solid rgba(0, 0, 0, 0.1); border-left: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite;}"
                          + "@keyframes spin {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}}";
        document.head.appendChild(style);
    }

    var c = document.createElement('div');
    c.id = 'spinnerContainer';
    c.classList.add('spinner-container');
    var s = document.createElement('div');
    s.classList.add('spinner');
    c.appendChild(s);
    document.body.appendChild(c);
}

function HideSpinner() {
    var o = document.getElementById('spinnerContainer');
    if (o) {
        document.body.removeChild(o);
    }
}
