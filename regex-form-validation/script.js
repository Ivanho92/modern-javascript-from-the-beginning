const formValidator = new FormValidator;

const formName = document.getElementById('name');
const zipcode = document.getElementById('zipcode');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

const form = document.querySelector('form');

formName.addEventListener('blur', () => formValidator.validateName(formName.value));
zipcode.addEventListener('blur', () => formValidator.validateZipcode(zipcode.value));
email.addEventListener('blur', () => formValidator.validateEmail(email.value));
phone.addEventListener('blur', () => formValidator.validatePhone(phone.value));

form.addEventListener('submit', e => {
    e.preventDefault();
    validateForm() ? console.log('Tous les champs sont corrects!') : console.log('Au moins un champ est incorrect!');
});

function validateForm() {
    const inputs = document.querySelectorAll('form input');
    let isValidated = true;
    inputs.forEach(input => {
        if (!input.classList.contains('is-invalid') && !input.classList.contains('is-valid')) {
            isValidated = false;
        } else if (input.classList.contains('is-invalid')) {
            isValidated = false;
        }
    })
    return isValidated;
}