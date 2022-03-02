class UI {
    /**
     *
     * @param {Object} user
     */
    displayUserInfo(user) {
        this.hideAlert();

        const el = document.getElementById('user-info');
        el.classList.remove("d-none");

        const creationDate = new Date(user.created_at);

        const html = `
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${user.avatar_url}" alt="${user.login} profile picture" class="img-fluid">
                        <div class="d-grid gap-2">
                            <a href="${user.html_url}" class="mt-2 btn btn-outline-primary rounded-pill">View profile</a>
                        </div>
                    </div>

                    <div class="col-md-9">
                        <span class="badge py-2 px-3 bg-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge py-2 px-3 bg-secondary">Public Gists: ${user.public_gists}</span>
                        <span class="badge py-2 px-3 bg-success">Followers: ${user.followers}</span>
                        <span class="badge py-2 px-3 bg-info">Following: ${user.following}</span>

                        <div class="card mt-3">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><strong>Company: </strong> ${user.company}</li>
                                <li class="list-group-item"><strong>Website/blog: </strong>${user.blog}</li>
                                <li class="list-group-item"><strong>Location: </strong>${user.location}</li>
                                <li class="list-group-item"><strong>Member since: </strong>${creationDate.getDate()}/${creationDate.getMonth()}/${creationDate.getFullYear()}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        el.innerHTML = html;
    }

    /**
     *
     * @param {Array.<Object>} repos
     */
    displayUserRepos(repos) {
        this.hideAlert();

        const el = document.getElementById('user-repos');
        el.classList.remove("d-none");
        el.innerText = '';

        const h2 = document.createElement('h2');
        h2.className = 'mt-3';
        h2.innerText = 'Latest Repos';
        el.appendChild(h2);

        let html = '';
        repos.forEach(repo => {
            const div = document.createElement('div');
            div.className = 'card mt-2 p-3';
            div.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <a class="text-decoration-none" href="${repo.html_url}">${repo.name}</a>
                    </div>
                    <div class="col-md-6">
                        <span class="badge py-2 px-3 bg-primary">Stars: ${repo.stargazers_count}</span>
                        <span class="badge py-2 px-3 bg-success">Watchers: ${repo.watchers_count}</span>
                        <span class="badge py-2 px-3 bg-warning">Forks: ${repo.forks_count}</span>
                    </div>
                </div>
            `;
            el.appendChild(div);
        })   
    }


    displayError(error) {
        let errorMessage = error.message;
        if (error.message.includes('404')) errorMessage = 'This user does not exist. Please try another one.';
        console.error(error);
        const alertBox = document.getElementById('alert-box');
        alertBox.classList.remove("d-none");
        alertBox.innerText = errorMessage;
    }

    hideInfo() {
        const userCard = document.getElementById('user-info');
        userCard.classList.add("d-none");
        const reposCard = document.getElementById('user-repos');
        reposCard.classList.add("d-none");
        this.hideAlert();
    }

    hideAlert() {
        const alertBox = document.getElementById('alert-box');
        alertBox.classList.add("d-none");
    }
}
