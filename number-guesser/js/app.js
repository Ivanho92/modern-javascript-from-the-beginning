let form = document.getElementById("number-guesser-form");
let hintMessage = document.getElementById("hint-message");
let numberInput = document.getElementById("number");
let submitButton = document.querySelector("input[type='submit']");

let checkNumberGuess = e => {
    e.preventDefault();

    if (submitButton.getAttribute("state") == "play") {
        if (areNumbersEqual(numberInput.value, numberToGuess)) {
            toggleSubmitButton();
            populateHintMessage(`<p>Well done!</p>`, "success");
            toggleInputClass(numberInput, "success");
        } else {
            let hint = (numberInput.value < numberToGuess) ? "greater" : "lower";
            lifePoints = lifePoints -1 ;
            toggleInputClass(numberInput, "error");
            if (lifePoints > 0) {
                populateHintMessage(`
                    <p>Try again... <em>Hint: number is ${hint}</em></p>
                    <p>Remaining chances : <strong>${lifePoints}</strong></p>
                `, "error");
            } else {
                toggleSubmitButton();
                populateHintMessage(`
                    <p>Game over :(</p>
                    <p>Number was ${numberToGuess}...</p>
                `, "error");
            }
        }
    } else {
        resetGame();
    }
};

function areNumbersEqual (numberA, numberB) {
    return (numberA == numberB ? true : false);  
}

function generateNumberToGuess () {
    return Math.floor(Math.random() * 11); // Returns a random integer from 0 to 10 
}

function toggleInputClass (element, state) {
    switch (state) {
        case 'success':
            element.classList.remove("danger");
            element.classList.add("success");
            break;
        case 'error':
            element.classList.remove("success");
            element.classList.add("danger");
            break;
        case 'clear':
            element.classList.remove("success");
            element.classList.remove("danger");
            element.removeAttribute("disabled");
      } 
}

function populateHintMessage (message="", state="clear") {
    hintMessage.innerHTML = message;
    switch (state) {
        case 'success':
            hintMessage.classList.remove("hint-danger");
            hintMessage.classList.add("hint-success");
            break;
        case 'error':
            hintMessage.classList.remove("hint-success");
            hintMessage.classList.add("hint-danger");
            break;
        case 'clear':
            hintMessage.classList.remove("hint-success");
            hintMessage.classList.remove("hint-danger");
      } 
}

function resetGame () {
    submitButton.setAttribute("state", "play");
    submitButton.setAttribute("value", "Submit");
    numberInput.value = '';
    toggleInputClass(numberInput, "clear");
    populateHintMessage("", "clear");
    
    numberToGuess = generateNumberToGuess();
    lifePoints = 3;

    console.log("Number to Guess:", numberToGuess);
}

function toggleSubmitButton () {
    numberInput.setAttribute("disabled", false);
    submitButton.setAttribute("state", "retry");
    submitButton.setAttribute("value", "Try again");
}

resetGame();
form.addEventListener("submit", checkNumberGuess);