// USE URL.js TO ADD THE BOOKMARKLET TO YOUR BROWSER
// This is the bookmarklet code

javascript: (function() {
  function TextToSpeech(s) {
    var sModelId = "tts-1-hd";
    var sVoiceId = "echo"; //Voice Model
    var API_KEY = "YOUR_API_KEY";

    ShowSpinner();

    var oHttp = new XMLHttpRequest();
    oHttp.open("POST", "https://api.openai.com/v1/audio/speech");
    oHttp.setRequestHeader("Accept", "audio/mpeg");
    oHttp.setRequestHeader("Content-Type", "application/json");
    oHttp.setRequestHeader("Authorization", "Bearer " + API_KEY);

    oHttp.onload = function() {
      if (oHttp.readyState === 4) {
        HideSpinner();

        if (oHttp.status === 200) {
          var oBlob = new Blob([this.response], { "type": "audio/mpeg" });
          var audioURL = window.URL.createObjectURL(oBlob);
          PlayAudio(audioURL);
        } else {
          alert('Error: ' + oHttp.status);
        }
      }
    };

    var data = {
      model: sModelId,
      input: s,
      voice: sVoiceId
    };

    oHttp.responseType = "arraybuffer";
    oHttp.send(JSON.stringify(data));
  }

  function PlayAudio(audioURL) {
    var audio = new Audio();
    audio.src = audioURL;

    var player = document.createElement('div');
    player.id = 'audioPlayer';
    player.style.position = 'fixed';
    player.style.bottom = '20px';
    player.style.left = '20px';
    player.style.zIndex = '9999';

    var playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.onclick = function() {
      if (audio.paused) {
        audio.play();
        playButton.textContent = 'Pause';
      } else {
        audio.pause();
        playButton.textContent = 'Play';
      }
    };

    var stopButton = document.createElement('button');
    stopButton.textContent = 'Stop';
    stopButton.onclick = function() {
      audio.pause();
      audio.currentTime = 0;
      playButton.textContent = 'Play';
    };

    player.appendChild(playButton);
    player.appendChild(stopButton);
    document.body.appendChild(player);

    audio.play();
  }

  function ShowSpinner() {
    var o = document.getElementById('spinnerContainer');
    if (o) return;

    var style = document.getElementById('SpinnerStyle');
    if (style == null) {
      var style = document.createElement("style");
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

  var s = window.getSelection().toString();
  if (s) {
    TextToSpeech(s);
  } else {
    alert('Please select some text to speak.');
  }
})();