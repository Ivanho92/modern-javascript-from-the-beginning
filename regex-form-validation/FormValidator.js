class FormValidator {
    constructor () {
        this.name = document.getElementById('name');
        this.zipcode = document.getElementById('zipcode');
        this.email = document.getElementById('email');
        this.phone = document.getElementById('phone');

        this.regexName = /^[A-Za-z]{2,50}$/;
        this.regexZipcode = /^[1-9][0-9]{3}$/;
        this.regexEmail = /^\S+@\w+.\w+$/;
        this.regexPhone = /^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/;
    }

    displayValid(element) {
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
    }

    displayInvalid(element) {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid')
    }

    validateName(input) {
        this.regexName.test(input) ? this.displayValid(this.name) : this.displayInvalid(this.name);
    }

    validateZipcode(input) {
        this.regexZipcode.test(input) ? this.displayValid(this.zipcode) : this.displayInvalid(this.zipcode);
    }

    validateEmail(input) {
        this.regexEmail.test(input) ? this.displayValid(this.email) : this.displayInvalid(this.email);
    }

    validatePhone(input) {
        this.regexPhone.test(input) ? this.displayValid(this.phone) : this.displayInvalid(this.phone);
    }
}