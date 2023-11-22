$(document).ready(function () {
    const conversationContainer = $("#conversation");
    const startButton = $("#startButton");
    const stopButton = $("#stopButton");

    let recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    startButton.on("click", function () {
        recognition.start();
        writeToScreen("SynthiaMind is listening...");
    });

    stopButton.on("click", function () {
        recognition.stop();
        writeToScreen("SynthiaMind has stopped listening.");
    });

    recognition.onresult = function (event) {
        const last = event.results.length - 1;
        const userQuery = event.results[last][0].transcript;
        writeToScreen(`User: ${userQuery}`);
        searchWeb(userQuery);
    };

    function searchWeb(query) {
        writeToScreen(`Searching the web for: ${query}`);
        // You can customize this function to perform the actual search.
        // For simplicity, let's just display a message.
        const response = `I found some results for '${query}'.`;
        speak(response);
    }

    function speak(response) {
        writeToScreen(`SynthiaMind: ${response}`);
    }

    function writeToScreen(message) {
        const p = document.createElement("p");
        p.textContent = message;
        conversationContainer.append(p);
    }
});
