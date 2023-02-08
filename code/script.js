// Variables that point to selected DOM elements
const chat = document.getElementById("chat");

const formInput = document.getElementById("input-form");
const textInput = document.getElementById("text-input");
const sendBtn = document.getElementById("send-btn");
const inputWrapper = document.getElementById("input-wrapper");

// If you need any global variables that you can use across different functions, declare them here:

// Declare your functions after this comment

const botReply = (msg) => {
  showMessage(msg, "bot");
};

const userReply = (msg) => {
  showMessage(msg, "user");
};

// This function will add a chat bubble in the correct place based on who the sender is
function showMessage(message, sender) {
  // the if statement checks if the sender is 'user' and if that's the case it inserts an html senction inside the chat with the posted message
  if (sender === "user") {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user-h.png" alt="User" />
      </section>
    `;
    // the else if statement checks if the sender is a bot and if that's the case it inserts an html senction inside the chat with the posted message
  } else if (sender === "bot") {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/sorting-hat.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `;
  }
  // This little thing makes the chat scroll to the last message when there are too many to be shown in the chat box
  chat.scrollTop = chat.scrollHeight;
}

// Bot greeting once you open the page
const greetUser = () => {
  botReply("So... Who do we have here?");
};

const nextQuestion = (message) => {
  if (questionNumber === 1) {
    userReply(message);
    formMessageBox.value = "";
    setTimeout(() => question2(message), chatDelay);
  } else if (questionNumber === 2) {
    userReply(firstToUpperCase(message));
    formMessageBox.value = "";
    setTimeout(() => question3(message), chatDelay);
  } else if (questionNumber === 3) {
    userReply(firstToUpperCase(message));
    formMessageBox.value = "";
    setTimeout(() => question4(message), chatDelay);
  }
};

// Bot welcoming you to Hogwarts once you sumbit your name

formInput.addEventListener("submit", (event) => {
  event.preventDefault();
  const userName = textInput.value;
  userReply(userName);
  botReply(`Welcome ${userName} to Hogwarts! Now...
            In order to sort you into a house you have to answer a few questions...
            First, what is your favourite colour?`);
  textInput.value = "";
});

//The bot will give you four colours to choose from

//You pick a colour by clicking a button

//Next, the bot will ask your favourite animal

//You pick an animal by clicking buttons with emojis (maybe)

//The bot will choose a house for you and say "Good luck!"

// Set up your eventlisteners here

//Delay the bot answers.
setTimeout(greetUser, 500);
