class UI {
    constructor() {
        this.uiSelectors = {
            postsList: document.getElementById('posts'),
            submitBtn: document.getElementById('submit-btn'),
            backBtn: document.getElementById('back-btn'),
            updateBtn: document.getElementById('update-btn'),
            postTitleInput: document.getElementById('postTitle'),
            postBodyInput: document.getElementById('postBody'),
            form: document.querySelector('form'),
            alertSpan: document.querySelector('.form-end'),
            defaultStateBtns: document.querySelector('.default-state'),
            editStateBtns: document.querySelector('.edit-state')
        }
    }

    showPosts(posts) {
        let HtmlOutput = '';
        posts.forEach(post => {
            HtmlOutput += `
                <div class="card post my-4">
                    <div id="post-${post.id}" class="card-body">
                        <h4>${post.title}</h4>
                        <p class="mb-1">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}"><i class="fas fa-pencil-alt"></i></a>
                        <a href="#" class="delete card-link" data-id="${post.id}" style="color: Tomato;"><i class="fas fa-times"></i></a>
                        </a>
                    </div>
                </div>
            `;
        });
        this.uiSelectors.postsList.innerHTML = HtmlOutput;
    }

    clearInputs() {
        this.uiSelectors.postTitleInput.value = '';
        this.uiSelectors.postBodyInput.value = '';
    }

    showAlert(message, state) {
        this.clearAlert();
        this.uiSelectors.alertSpan.innerHTML = `
            <div class="alert alert-${state} mt-3 mb-1" role="alert">${message}</div>
        `;
        setTimeout(this.clearAlert, 3000);
    }
    
    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) currentAlert.remove();
    }

    enterDefaultState() {
        // Clear input fields
        ui.clearInputs();
        // Change buttons
        ui.uiSelectors.defaultStateBtns.classList.remove('d-none');
        ui.uiSelectors.editStateBtns.classList.add('d-none');
        ui.uiSelectors.updateBtn.setAttribute('type', 'button');
        ui.uiSelectors.submitBtn.setAttribute('type', 'submit');
    }

    enterEditState(post) {
        // Populate input fields
        ui.uiSelectors.postTitleInput.value = post.title;
        ui.uiSelectors.postBodyInput.value = post.body;

        // Change buttons
        ui.uiSelectors.defaultStateBtns.classList.add('d-none');
        ui.uiSelectors.editStateBtns.classList.remove('d-none');
        ui.uiSelectors.updateBtn.setAttribute('type', 'submit');
        ui.uiSelectors.submitBtn.setAttribute('type', 'button');
    }
}

export const ui = new UI;