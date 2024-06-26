const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const speechRecognition = new SpeechRecognition();
const transcriptArea = document.getElementById("transcript");
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");

startButton.addEventListener("click", startSpeechRecognition);
stopButton.addEventListener("click", stopSpeechRecognition);

function startSpeechRecognition() {
  speechRecognition.continuous = true; // Enable continuous recognition
  speechRecognition.interimResults = true; // Capture intermediate results
  speechRecognition.start();
  startButton.textContent = "Stop Listening";
  startButton.disabled = true; // Disable start button while listening
  stopButton.disabled = false; // Enable stop button
  transcriptArea.textContent = ""; // Clear previous transcript
}

function stopSpeechRecognition() {
  speechRecognition.stop();
  startButton.textContent = "Start Listening";
  startButton.disabled = false;
  stopButton.disabled = true; // Disable stop button when stopped
}

speechRecognition.onresult = function (event) {
  let finalTranscript = "";
  for (let i = 0; i < event.results.length; i++) {
    if (event.results[i].isFinal) {
      finalTranscript += event.results[i][0].transcript + ". "; // Add punctuation for final sentences
    } else {
      finalTranscript += event.results[i][0].transcript;
    }
  }
  transcriptArea.value = finalTranscript;
};

speechRecognition.onerror = function (error) {
  console.error("Speech recognition error:", error);
};
