class Github {
    constructor() {
        this.token = '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';
        this.baseEndPoint = 'https://api.github.com/users';
    }

    async getData(url) {
        const response = await fetch(url, {
            headers : {
                "Accept": "application/vnd.github.v3+json",
                "Authorization": `token ${this.token}`
            }
        });
        if (!response.ok) throw new Error(`Something went wrong => ${response.status}`);
        const data = await response.json();
        return data;
    }  

    async getUser(username) {       
        const profile = await this.getData(`${this.baseEndPoint}/${username}`);
        const repos = await this.getData(`${this.baseEndPoint}/${username}/repos`);

        return {
            profile, // same as => profile (key) : profile (value)
            repos // same as => repos (key) : repos (value)
        };
    }
}