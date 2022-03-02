const github = new Github;
const ui = new UI;

const usernameInput = document.getElementById('username');

// Wait 1s after user has stopped typing
let timeout = null;
usernameInput.addEventListener('keyup', e => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        let user = e.target.value;

        if (user != '') {
            github.getUser(user)
                .then(user => {
                    ui.displayUserInfo(user.profile);
                    ui.displayUserRepos(user.repos);
                })
                .catch(error => ui.displayError(error))
        } else {
            ui.hideInfo();
        }
        
    }, 1000);
});