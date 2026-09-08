const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.textContent = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(input) {
  const text = input.toLowerCase();

  if (text.includes("bonjour") || text.includes("salut")) {
    return "Bonjour ! Ravi de te parler. Comment vas-tu ?";
  } else if (text.includes("qui es-tu") || text.includes("qui es tu")) {
    return "Je suis QWantum AI, le pont vers un autre monde 🌌";
  } else if (text.includes("merci")) {
    return "Avec plaisir ! N'hésite pas si tu as d'autres questions.";
  } else if (text.includes("ça va") || text.includes("ca va")) {
    return "Je fonctionne parfaitement, merci ! Et toi ?";
  } else {
    return "Intéressant ! Peux-tu m'en dire plus ?";
  }
}

function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;

  addMessage(text, "user");
  userInput.value = "";

  setTimeout(() => {
    const response = getBotResponse(text);
    addMessage(response, "bot");
  }, 500);
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
