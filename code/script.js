// All the DOM selectors stored as short variables
const chat = document.getElementById("chat");
const inputWrapper = document.getElementById("input-wrapper");
const nameInput = document.getElementById("name-input");
const form = document.getElementById("name-form");

// const sendBtn = document.getElementById("send-btn")
const audio = new Audio("drill.mp3");

// Global variables, if you need any, declared here
let questionStep = 1;

// Function to display the message on the screen both for bot and user
const botAnswer = (inputMessage) => {
  showMessage(inputMessage, "bot");
};
const userAnswer = (inputMessage) => {
  showMessage(inputMessage, "user");
};

// Question flow functions
const handleInput = (message) => {
  if (questionStep === 2) {
    userAnswer(message);
    setTimeout(() => moreServices(message), 800);
  } else if (questionStep === 3) {
    userAnswer(message);
    setTimeout(() => priceInformation(message), 800);
  } else {
    userAnswer(message);
    setTimeout(goodBye, 800);
  }
};
// This function will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  if (sender === "user") {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user-h.png" alt="User" />  
      </section>
    `;
  } else if (sender === "bot") {
    console.log("This works");
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
};

// Bot welcome message
const greeting = () => {
  showMessage(`So... Who do we have here?`, "bot");
};

// This will display the first answer (user name)
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value;
  userAnswer(`${name}`);
  // This will keep the input box empty after user clicks send
  nameInput.value = "";
  setTimeout(() => serviceOptions(name), 800);
});

// 2nd Bot message - Bot welcomes you to Hogwarts and asks your favourite colour
const serviceOptions = (name) => {
  questionStep++;
  botAnswer(`Welcome ${name} to Hogwarts!
  In order to sort you into a house you have to answer a few questions...
  First, what is your favourite colour?`);
  inputWrapper.innerHTML = `
    <button id="redButton">Red</button>
    <button id="greenButton">Green</button>
    <button id="yellowButton">Yellow</button>
    <button id="blueButton">Blue</button>
    `;
  document.getElementById("redButton").addEventListener("click", () => {
    type = "Red";
    handleInput("Red");
  });
  document.getElementById("greenButton").addEventListener("click", () => {
    type = "Green";
    handleInput("Green");
  });
  document.getElementById("yellowButton").addEventListener("click", () => {
    type = "Yellow";
    handleInput("Yellow");
  });
  document.getElementById("blueButton").addEventListener("click", () => {
    type = "Blue";
    handleInput("Blue");
  });
};

//3rd Bot message - Bot asks you to choose favourite animal
const moreServices = (type) => {
  questionStep++;
  botAnswer(
    `Interesting! And could you tell me what is your favourite animal?`
  );
  inputWrapper.innerHTML = `
  <select id = 'select'>
  <option value='' selected disabled> Choose animal </option>
  <option value='Lion!'>Lion</option>
  <option value='Snake!'>Snake</option>
  <option value='Badger!'>Badger</option>
  <option value='Eagle!'>Eagle</option>
  </select> `;
  const select = document.getElementById("select");
  select.addEventListener("change", () => handleInput(select.value));
};

//4th Bot message - Bot will place you in Hogwarts house
const priceInformation = (service) => {
  questionStep++;
  if (service === "Snake!") {
    botAnswer(`SLYTHERIN!`);
  } else {
    botAnswer(`Hmm... Tough call... Better put you in... SLYTHERIN!`);
  }

  //You will love your new house
  inputWrapper.innerHTML = `
<button id="bookButton">Yay!</button>
`;
  document
    .getElementById("bookButton")
    .addEventListener("click", () =>
      handleInput(
        "I cant waint to become the gratest wizard/witch in the world!"
      )
    );
};

// 5 th bot message - Bot will wish you good luck and say good bye
function goodBye() {
  botAnswer(`Have fun with your new slytherin friends!`);
  botAnswer(`And watch out for nargles...`);
  // Below clears the option to click button after once selected.
  inputWrapper.innerHTML = ``;
}
//This function will be called one second after the website is loaded.
setTimeout(greeting, 800);
