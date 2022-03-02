// Book constructor
function Book (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor & Prototype methods 
function UI () {}

// UI Prototype "Private" methods 
UI.prototype.addBookToList = function (book) {
    const bookTable = document.getElementById('book-table');
    const newBook = document.createElement('tr');
    newBook.innerHTML = `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td class="align-right">
                <button class="delete-button delete-button-table">X</button>
            </td>
        </tr>
    `
    bookTable.insertAdjacentElement('afterend', newBook);
}
UI.prototype.displayAlert =  function (state, message) {
    const alert = document.createElement('div');
    alert.className = (state == 'success') ? 'alert success' : 'alert danger';
    alert.innerHTML = `
        <strong></strong>
        &nbsp;
        <span class="message">${message}</span>
        <button class="delete-button delete-button-message">X</button>
    `;
    document.querySelector('h1').insertAdjacentElement('afterend', alert);
}
UI.prototype.clearForm = function (elementsArray) {
    elementsArray.forEach(element => {
        element.value =  '';
    });
}

// UI Stastic "Public" Methods -> see implementation on lines 80 and 84
UI.deleteBook = function (target) {
    target.parentNode.parentNode.remove();
}
UI.deleteAlert = function (target) {
    target.parentNode.remove();
}

// Instantiate UI
const ui = new UI();

// Event listeners
document.getElementById('add-book-form').addEventListener('submit', e => {
    e.preventDefault();

    let title = document.getElementById('title'),
        author = document.getElementById('author'),
        isbn = document.getElementById('isbn');
        
    if (title.value == '' || author.value == '' || isbn.value == '') {
        // Populate error message
        ui.displayAlert('danger', 'Please fill in information for all fields');
    } else {
        const book = new Book(title.value, author.value, isbn.value);

        // Insert book in table
        ui.addBookToList(book);
        // Populate success message
        ui.displayAlert('success', 'Your book has successfully been added to the book list');
        // Reset form
        ui.clearForm([title, author, isbn]);
    }
})

document.addEventListener('click', e => {
    if (e.target.parentNode.className.includes('alert') && e.target.className.includes('delete-button-message')) {
        UI.deleteAlert(e.target);
    }

    if (e.target.className.includes('delete-button-table')) {
        UI.deleteBook(e.target);
        ui.displayAlert('success', 'Your book has successfully been deleted');
    }
})