class EasyHTTP {
    /**
     * Makes an HTTP GET request
     * @param {string} url 
     * @returns Promise
     */
    get(url) {
        return new Promise ((resolve, reject) => {
            fetch(url)
                .then(response => response.ok ? response.json() : reject('Error: ' + response.status))
                .then(data => resolve(data))
                .catch(error => reject(error))
        });
    }

    /**
     * Makes an HTTP POST request
     * @param {string} url
     * @param {Object} data 
     * @returns Promise
     */
    post(url, data) {
        return new Promise ((resolve, reject) => {
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            })
                .then(response => response.ok ? response.json() : reject('Error: ' + response.status))
                .then(data => resolve(data))
                .catch(error => reject(error))
        });
    }

    /**
     * Makes an HTTP PUT request
     * @param {string} url URL of the specified ressource to update
     * @param {Object} data 
     * @returns Promise
     */
    put(url, data) {
        return new Promise ((resolve, reject) => {
            fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            })
                .then(response => response.ok ? response.json() : reject('Error: ' + response.status))
                .then(data => resolve(data))
                .catch(error => reject(error))
        });
    }

    /**
     * Makes an HTTP DELETE request
     * @param {string} url URL of the specified ressource to delete
     * @returns Promise
     */
     delete(url) {
        return new Promise ((resolve, reject) => {
            fetch(url, {method: "DELETE"})
                .then(response => response.ok ? response.json() : reject('Error: ' + response.status))
                .then(() => resolve('Ressource succesfully deleted'))
                .catch(error => reject(error))
        });
    }
}