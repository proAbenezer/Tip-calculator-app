const billInputElement = document.getElementById("cash-input");
const customTipInputElement = document.getElementById("tip-input");
const tipBoxesElement = document.querySelectorAll("[data-percentage]");
const peopleInputElement = document.getElementById("people-input");
const tipAmountElement = document.getElementById("tip-amount");
const totalAmountElement = document.getElementById("total-amount");
const resetBtn = document.getElementById("reset-btn");
const billInputContainer = document.getElementById("billInputContainer");
const peopInputContainer = document.getElementById("peopInputContainer");
const message = document.getElementById("message");
const billMessage = document.getElementById("billMessage");
// A Global object that contain the validation state for all inputs
const inputValidityStatus = {
  isBillValid: false,
  isTipPercentageValid: false,
  isPeopleCountValid: false,
};

let tipPercentage = 0;
let bill = 0;
let numberOfPeople = 0;
let selectedTip = 0;
let selectedTipBox;
function calculateTip() {
  if (
    !inputValidityStatus.isBillValid ||
    !inputValidityStatus.isTipPercentageValid ||
    !inputValidityStatus.isPeopleCountValid
  ) {
    return;
  }
  tipPercentage = Number(selectedTip);
  numberOfPeople = Number(peopleInputElement.value);
  bill = Number(billInputElement.value);
  let totalTip = (tipPercentage / 100) * bill;
  let tipPerPerson = totalTip / numberOfPeople;
  console.log(bill, selectedTip);
  totalAmountElement.innerHTML = (bill + totalTip).toFixed(2);
  tipAmountElement.innerHTML = tipPerPerson.toFixed(2);
  resetBtn.style.opacity = "90%";
}
function validateInputs() {
  message.innerHTML = "";
  billMessage.innerHTML = "";
  inputValidityStatus.isBillValid =
    billInputElement.value.trim() !== "" && Number(billInputElement.value) > 0;

  inputValidityStatus.isTipPercentageValid = selectedTip > 0;

  inputValidityStatus.isPeopleCountValid =
    peopleInputElement.value.trim() !== "" &&
    Number(peopleInputElement.value) > 0;
  const peopleInputValue = peopleInputElement.value;
  /*   const billInputValue = billInputElement.value;
  if (peopleInputValue === "0" || peopleInputValue.startsWith("0")) {
    message.innerHTML =
      "Can't be zero or negative, and no leading zeros allowed.";
    message.style.display = "block";
  } else if (Number(peopleInputValue) <= 0) {
    message.innerHTML = "Can't be zero or negative.";
    message.style.display = "block";
  } else {
    message.style.display = "none"; // Hide message if valid
  } */
  /*   if (
    billInputValue === "" ||
    billInputValue === "0" ||
    billInputValue.startsWith("0")
  ) {
    billMessage.innerHTML =
      "Can't be zero or negative, and no leading zeros allowed.";
    billMessage.style.display = "block";
  } else if (Number(peopleInputValue) <= 0) {
    billMessage.innerHTML = "Can't be zero or negative.";
    billMessage.style.display = "block";
  } else {
    billMessage.style.display = "none"; // Hide message if valid
  } */

  if (Object.values(inputValidityStatus).every(Boolean)) {
    calculateTip();
  }
}

function resetValues() {
  message.innerHTML = "";
  totalAmountElement.innerHTML = "0.00";
  tipAmountElement.innerHTML = "0.00";
  peopleInputElement.value = "";
  billInputElement.value = "";
  customTipInputElement.value = "";
  if (selectedTipBox) {
    selectedTipBox.style.backgroundColor = " hsl(183, 100%, 15%)";
    selectedTipBox.style.color = "#fff";
  }
}
// Event listeners
[billInputElement, peopleInputElement].forEach((input) =>
  input.addEventListener("input", (e) => {
    validateInputs();
  })
);

[billInputElement, peopleInputElement].forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.style.border = "2px solid hsl(172, 67%, 45%)";
  });

  input.addEventListener("blur", () => {
    input.parentElement.style.border = "2px solid #ccc";
  });
});

tipBoxesElement.forEach((box, index) => {
  box.addEventListener("click", function () {
    if (selectedTipBox) {
      selectedTipBox.style.backgroundColor = " hsl(183, 100%, 15%)";
      selectedTipBox.style.color = "#fff";
    }
    selectedTipBox = box;
    selectedTipBox.style.backgroundColor = "hsl(172, 67%, 45%)";
    selectedTipBox.style.color = "#333";
    selectedTip = parseInt(this.getAttribute("data-percentage"));
    validateInputs();
  });
});

customTipInputElement.addEventListener("input", function () {
  selectedTip = parseInt(this.value);
  if (selectedTipBox) {
    selectedTipBox.style.backgroundColor = " hsl(183, 100%, 15%)";
    selectedTipBox.style.color = "#fff";
  }
  if (isNaN(selectedTip) || selectedTip <= 0) {
    selectedTip = 0;
  }
  validateInputs();
});
resetBtn.addEventListener("click", resetValues);
