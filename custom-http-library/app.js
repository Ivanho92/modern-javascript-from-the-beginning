const http = new EasyHTTP;
const data = {title: 'foo', body: 'bar'};

/** V1 : with XHR object */
    // http.get("https://jsonplaceholder.typicode.com/posts", (error, response) => {
    //     error ? console.error(error) : console.log(response);
    // });

    // http.post("https://jsonplaceholder.typicode.com/posts", data, (error, response) => {
    //     error ? console.error(error) : console.log(response);
    // });

    // http.put("https://jsonplaceholder.typicode.com/posts/5", data, (error, response) => {
    //     error ? console.error(error) : console.log(response);
    // });

    // http.delete("https://jsonplaceholder.typicode.com/posts/5", (error, response) => {
    //     error ? console.error(error) : console.log(response);
    // });


/** V2 : with Fetch and Promises */
    // http.get("https://jsonplaceholder.typicode.com/posts")
    //     .then((posts) => console.log(posts))
    //     .catch((error) => console.error(error))

    // http.post("https://jsonplaceholder.typicode.com/posts", data)
    //     .then((post) => console.log(post))
    //     .catch((error) => console.error(error))

    // http.put("https://jsonplaceholder.typicode.com/posts/5", data)
    //     .then((post) => console.log(post))
    //     .catch((error) => console.error(error))

    // http.delete("https://jsonplaceholder.typicode.com/posts/5")
    //     .then((successMessage) => console.log(successMessage))
    //     .catch((error) => console.error(error))

/** V3 : working with Async and Await */
    http.get("https://jsonplaceholder.typicode.com/posts")
    .then((posts) => console.log(posts))
    .catch((error) => console.error(error.message))

    // http.post("https://jsonplaceholder.typicode.com/posts", data)
    //     .then((post) => console.log(post))
    //     .catch((error) => console.error(error.message))

    // http.put("https://jsonplaceholder.typicode.com/posts/5", data)
    //     .then((post) => console.log(post))
    //     .catch((error) => console.error(error.message))

    // http.delete("https://jsonplaceholder.typicode.com/posts/5")
    //     .then((successMessage) => console.log(successMessage))
    //     .catch((error) => console.error(error.message))