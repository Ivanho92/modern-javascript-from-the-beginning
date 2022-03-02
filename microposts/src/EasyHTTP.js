export class EasyHTTP {
    /**
     * Makes an HTTP GET request
     * @param {string} url 
     * @returns Promise
     */
    async get(url) {    
        const response = await fetch(url);
        if (!response.ok) throw new Error(`An error has occured: ${response.status}`);
        const posts = await response.json();
        return posts;  
    }

    /**
     * Makes an HTTP POST request
     * @param {string} url
     * @param {Object} data 
     * @returns Promise
     */
    async post(url, data) {
        const response = await fetch(url, 
            {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            }
        );
        if (!response.ok) throw new Error(`An error has occured: ${response.status}`);
        const post = await response.json();
        return post;  
    }

    /**
     * Makes an HTTP PUT request
     * @param {string} url URL of the specified ressource to update
     * @param {Object} data 
     * @returns Promise
     */
    async put(url, data) {
        const response = await fetch(url, 
            {
                method: "PUT",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            }
        );
        if (!response.ok) throw new Error(`An error has occured: ${response.status}`);
        const post = await response.json();
        return post;
    }

    /**
     * Makes an HTTP DELETE request
     * @param {string} url URL of the specified ressource to delete
     * @returns Promise
     */
     async delete(url) {
        const response = await fetch(url, {method: "DELETE"});
        if (!response.ok) throw new Error(`An error has occured: ${response.status}`);
        const responseMessage = 'Ressource succesfully deleted';
        return responseMessage; 
    }
}

export const easyHttp = new EasyHTTP;