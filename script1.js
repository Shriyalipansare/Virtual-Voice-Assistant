let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = "en-GB";

    // Wait until voices are loaded
    if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.speak(utterance);
        };
    } else {
        window.speechSynthesis.speak(utterance);
    }
}

function wishMe() {
    let hours = new Date().getHours();
    if (hours < 12) speak("Good Morning");
    else if (hours < 16) speak("Good Afternoon");
    else speak("Good Evening");
}

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    message = message.toLowerCase();
    let actionPerformed = false;

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello, how can I help you?");
        actionPerformed = true;
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com", "_blank");
        actionPerformed = true;
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com", "_blank");
        actionPerformed = true;
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com", "_blank");
        actionPerformed = true;
    } else if (message.includes("open wikipedia")) {
        speak("Opening Wikipedia");
        window.open("https://www.wikipedia.org", "_blank");
        actionPerformed = true;
    } else if (message.includes("what is your name")) {
        speak("I am Sira, your voice assistant. Created by Shriyali.");
        actionPerformed = true;
    } else if (message.includes("sorry")) {
        speak("Ohh... it's okay.");
        actionPerformed = true;
    } else if (message.includes("thank")) {
        speak("You're welcome.");
        actionPerformed = true;
    } else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com", "_blank");
        actionPerformed = true;
    } else if (message.includes("how are you sira") || message.includes("are you fine")) {
        speak("I am fine, how are you?");
        actionPerformed = true;
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://", "_blank"); // You may need a custom app for this
        actionPerformed = true;
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("https://web.whatsapp.com", "_blank");
        actionPerformed = true;
    } else if (message.includes("tell me time")) {
        let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        speak(`The time is ${time}`);
        actionPerformed = true;
    } else if (message.includes("tell me date")) {
        let date = new Date().toLocaleDateString();
        speak(`The date is ${date}`);
        actionPerformed = true;
    }

    if (!actionPerformed) {
        speak(`Searching for ${message}`);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
    }
}

// ---- SPEECH RECOGNITION SETUP ----
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
        voice.style.display = "block";
        btn.style.display = "none";
    };

    recognition.onresult = (event) => {
        let transcript = event.results[0][0].transcript;
        content.textContent = transcript;
        takeCommand(transcript);
        resetUI();
    };

    recognition.onerror = (event) => {
        speak("There was an error with speech recognition.");
        resetUI();
    };

    recognition.onend = () => {
        if (content.textContent.trim() === "") {
            setTimeout(() => {
                speak("I didn't hear anything. Please try again.");
            }, 1000);
        }
        resetUI();
    };

    btn.addEventListener("click", () => {
        content.textContent = "";

        // Run wishMe only once per page load
        if (!sessionStorage.getItem("hasWished")) {
            wishMe();
            sessionStorage.setItem("hasWished", "true");
        }

        recognition.start();
    });

    function resetUI() {
        btn.style.display = "flex";
        voice.style.display = "none";
    }
} else {
    content.textContent = "Speech recognition is not supported in your browser.";
    speak("Sorry, your browser does not support speech recognition.");
}
