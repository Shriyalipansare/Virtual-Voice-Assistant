const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

document.querySelector("button").addEventListener("click", function () {
    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance); // 
    }

    function handleCommand(command) {
        if (command.includes("Open Youtube")) {
            speak("Opening Youtube...");
            window.open("https://www.youtube.com", "_blank");
        } else if (command.includes("Open facebook")) {
            speak("Opening Facebook...");
            window.open("https://www.facebook.com", "_blank");
        } else if (command.includes("Open Instagram")) {
            speak("Opening Instagram...");
            window.open("https://www.instagram.com", "_blank"); // 
        } else {
            speak("Search on Youtube");
        }
    }

    speak("HOW CAN I HELP YOU");

    // Optionally start recognition if needed
    // recognition.start();
});
