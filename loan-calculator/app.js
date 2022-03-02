let form = document.getElementById("loan-calculator-form");
let loanAmount = document.getElementById("loan-amount");
let annualInterest = document.getElementById("annual-interest");
let repaymentYears = document.getElementById("repayment-years");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (validateForm()) spinnerUX();
});

// Make sure values are not empty and/or lower than 1, and display errors if any
function validateForm() {
    let errorMessages = [];
    if (loanAmount.value == "") {
        errorMessages.push("Please fill in the desired loan amount");
    } else if (loanAmount.value < 1) {
        errorMessages.push("Ensure the loan amount is greater than 0");
    }
    if (annualInterest.value == "") {
        errorMessages.push("Please fill in the annual interest");
    } else if (annualInterest.value < 1) {
        errorMessages.push("Ensure the annual interest is greater than 0");
    }
    if (repaymentYears.value == "") {
        errorMessages.push("Please fill in the number of repayment years");
    } else if (repaymentYears.value < 1) {
        errorMessages.push("Ensure the number of repayment years is greater than 0");
    }

    if (errorMessages.length > 0) {
        if (document.getElementById("error-messages") !== null) document.getElementById("error-messages").remove();

        let el = document.createElement("div");
        el.className = "alert alert-danger";
        el.id = "error-messages";
        
        let HTMLErrors = "";
        errorMessages.forEach(error => {
            HTMLErrors += `<li>${error}</li>`;
        })
        
        el.innerHTML = `<ul class="mb-0">${HTMLErrors}</ul>`
        form.insertAdjacentElement("beforebegin", el);

        setTimeout(() => {
            if (document.getElementById("error-messages") !== null) document.getElementById("error-messages").remove()
        }, 3000);

        return false;
    } else {
        return true;
    }
}

function calculate(loanAmount, annualInterest, repaymentYears) {
    let n = repaymentYears * 12;
    let i = (annualInterest * 0.01) / 12;
    
    let PMT = ( loanAmount * ( i * Math.pow(1+i, n) ) ) / ( Math.pow(1+i, n) - 1);
    let totalPayment = PMT * n;
    let totalInterest = totalPayment - loanAmount;

    let el = document.createElement('div');
    el.id = 'results';
    let HTML = `
        <h5 class="text-center mt-3">Results</h5>
        <hr>
        <div><strong>Monthly Payment: </strong>${numeral(PMT.toFixed(2)).format('0.0[,]00 €')} €</div>
        <div><strong>Total Payment: </strong>${numeral(totalPayment.toFixed(2)).format('0.0[,]00 €')} €</div>
        <div><strong>Total Interest: </strong>${numeral(totalInterest.toFixed(2)).format('0.0[,]00 €')} €</div>
    `;
    el.innerHTML = HTML;
    form.insertAdjacentElement("afterend", el);
}

function spinnerUX() {
    if (document.getElementById("results") !== null) document.getElementById("results").remove();

    let el = document.createElement('div');
    el.classList.add("loader");
    el.id = 'spinner';
    let HTML = `Loading...`;
    el.innerHTML = HTML;
    form.insertAdjacentElement("afterend", el);

    setTimeout(() => {
        document.getElementById("spinner").remove();
        calculate(loanAmount.value, annualInterest.value, repaymentYears.value);
    }, 2000);
}