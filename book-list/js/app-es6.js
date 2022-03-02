// Book constructor
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI  
class UI {
    addBookToList (book) {
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

    displayAlert (state, message) {
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

    clearForm (elementsArray) {
        elementsArray.forEach(element => {
            element.value =  '';
        });
    }

    deleteBook (target) {
        target.parentNode.parentNode.remove();
    }

    deleteAlert (target) {
        target.parentNode.remove();
    }

    

    
}

// LocalStorage
class LocalStorage {
    static getBooks () {
        let books = localStorage.getItem("books") !== null ? JSON.parse(localStorage.getItem("books")) : [];
        books.forEach(book => ui.addBookToList(book));
    }

    static storeBook (book) {
        let books = localStorage.getItem("books") !== null ? JSON.parse(localStorage.getItem("books")) : [];
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
        ui.addBookToList(book);
    }

    static removeBook (book) {
        let books = localStorage.getItem("books") !== null ? JSON.parse(localStorage.getItem("books")) : [];
        books.forEach((bookLocalStorage, index) => {
            if (
                book.title == bookLocalStorage.title &&
                book.author == bookLocalStorage.author &&
                book.isbn == bookLocalStorage.isbn
            ) books.splice(index, 1);   
        });
        localStorage.setItem("books", JSON.stringify(books));
    }
}


const ui = new UI(); // Instantiate UI (private methods)
LocalStorage.getBooks(); // Publis static methods : no need to instantiate the object

// Event listeners
document.getElementById('add-book-form').addEventListener('submit', e => {

    e.preventDefault();

    let title = document.getElementById('title'),
        author = document.getElementById('author'),
        isbn = document.getElementById('isbn');
        
    if (title.value == '' || author.value == '' || isbn.value == '') {
        ui.displayAlert('danger', 'Please fill in information for all fields');
    } else {
        const book = new Book(title.value, author.value, isbn.value);

        LocalStorage.storeBook(book);
        ui.displayAlert('success', 'Your book has successfully been added to the book list');
        ui.clearForm([title, author, isbn]);
    }
})

document.addEventListener('click', e => {
    if (e.target.parentNode.className.includes('alert') && e.target.className.includes('delete-button-message')) {
        ui.deleteAlert(e.target);
    }

    if (e.target.className.includes('delete-button-table')) {
        const bookInfos = Array.from(e.target.parentNode.parentNode.children);
        const book = new Book(bookInfos[0].innerText, bookInfos[1].innerText, bookInfos[2].innerText);
        LocalStorage.removeBook(book);
        ui.deleteBook(e.target);
        ui.displayAlert('success', 'Your book has successfully been deleted');
    }
})