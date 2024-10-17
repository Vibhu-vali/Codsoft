// Function to get chatbot response
function getChatbotResponse(userInput) {
    userInput = userInput.toLowerCase();

    if (userInput.includes("hello") || userInput.includes("hi")) {
        return "Hello! How can I assist you today?";
    } else if (userInput.includes("how are you")) {
        return "I'm just a bot, but I'm doing great! How about you?";
    } else if (userInput.includes("your name")) {
        return "I’m your friendly chatbot. You can call me ChatBot!";
    } else if (userInput.includes("what can you do")) {
        return "I can chat with you, answer simple questions, and help you out.";
    } else if (userInput.includes("time")) {
        return "I'm not sure about the exact time, but it's always a good time to chat!";
    } else if (userInput.includes("weather")) {
        return "I can't check the weather, but I hope it's sunny wherever you are!";
    } else if (userInput.includes("favorite color")) {
        return "I like all colors equally! But if I had to choose, maybe blue like the sky.";
    } else if (userInput.includes("tell me a joke")) {
        return "Why don't scientists trust atoms? Because they make up everything!";
    } else if (userInput.includes("hobby") || userInput.includes("like to do")) {
        return "I enjoy chatting with people! What about you? What are your hobbies?";
    } else if (userInput.includes("favorite food")) {
        return "I can't eat, but I've heard pizza is a popular favorite!";
    } else if (userInput.includes("tell me something interesting") || userInput.includes("fact")) {
        return "Did you know? Honey never spoils! Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible.";
    } else if (userInput.includes("who is your creator") || userInput.includes("who made you")) {
        return "I was created by talented developers to assist you with your questions!";
    } else if (userInput.includes("bye") || userInput.includes("goodbye")) {
        return "Goodbye! Have a nice day!";
    } else {
        return "I'm not sure I understand. Can you please rephrase?";
    }
}

// Main chat functionality
document.getElementById("send_button").onclick = function() {
    const userInput = document.getElementById("user_input").value;
    const chatbox = document.getElementById("chatbox");

    // Display user input in the chatbox with user class
    chatbox.innerHTML += `<div class="message user"><strong>You:</strong> ${userInput}</div>`;

    // Clear input field
    document.getElementById("user_input").value = "";

    // Add loading spinner
    const loadingSpinner = document.createElement("div");
    loadingSpinner.className = "spinner";
    chatbox.innerHTML += `<div class="message bot"><strong>ChatBot:</strong> Loading... ${loadingSpinner.outerHTML}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom

    // Simulate a delay for bot response
    setTimeout(() => {
        // Remove loading spinner
        const lastBotMessage = chatbox.lastChild;
        lastBotMessage.innerHTML = `<strong>ChatBot:</strong> ${getChatbotResponse(userInput)}`;
        chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
    }, 100); // Delay of 1 second for the bot response
};
