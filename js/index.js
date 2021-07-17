const tipCalculatorForm = document.getElementById("tip-calculator-form");
const resultTipAmt = document.querySelector(".result__tip-amt");
const resultContributionAmt = document.querySelector(
  ".result__contribution-amt"
);
const resetBtn = document.querySelector(".reset-btn");
const peopleInputEl = document.getElementById("people");
const customTipEl = document.getElementById("custom-tip");
const tipRadioButtons = document.getElementsByName("tip");

customTipEl.addEventListener("focus", () => {
  console.log("focused");
  delete inputs["tip"];
  tipRadioButtons.forEach((el) => {
    el.checked = false;
  });
});

tipRadioButtons.forEach((el) => {
  el.addEventListener("input", () => {
    customTipEl.value = "";
    delete inputs["customTip"];
  });
});

const inputs = {};
tipCalculatorForm.querySelectorAll("input").forEach((el) => {
  el.addEventListener("input", function () {
    console.log(inputs);
    switch (this.name) {
      case "bill":
      case "customTip":
        inputs[this.name] = parseFloat(this.value);
        break;
      case "tip":
      case "people":
        inputs[this.name] = parseInt(this.value);
        break;
    }
    calculateContribution(inputs);
  });
});

function calculateContribution(inputs) {
  console.log(JSON.stringify(inputs));
  const { bill, tip, customTip, people } = inputs;
  if (bill && people && (tip || customTip)) {
    const totalTip = bill * (customTip ? customTip : tip) * 0.01;
    const totalBill = bill + totalTip;
    const contribution = totalBill / people;
    const tipContribution = totalTip / people;

    resultTipAmt.innerText = `$${tipContribution.toFixed(2)}`;
    resultContributionAmt.innerText = `$${contribution.toFixed(2)}`;
  }
}

peopleInputEl.addEventListener("input", function (e) {
  const inputValue = parseFloat(e.target.value);

  if (!Number.isNaN(inputValue)) {
    if (inputValue <= 0) {
      this.style.border = "2px solid orange";
      this.nextElementSibling.innerText = "Can't be <= zero";
    } else if (!Number.isInteger(inputValue)) {
      this.style.border = "2px solid orange";
      this.nextElementSibling.innerText = "Can't be decimal";
    } else {
      this.style.border = "2px solid transparent";
      this.nextElementSibling.innerText = "";
    }
  } else {
    this.style.border = "2px solid transparent";
    this.nextElementSibling.innerText = "";
  }
});

resetBtn.addEventListener("click", handleReset);

function handleReset(event) {
  tipCalculatorForm.reset();
  resultTipAmt.innerText = `$0.00`;
  resultContributionAmt.innerText = `$0.00`;
}
