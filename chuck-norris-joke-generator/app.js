const form = document.getElementById("chuck-norris-form");
form.addEventListener("submit", (e) => {
    const xhr = new XMLHttpRequest();

    const numberOfJokes = document.getElementById("jokes-number").value;

    xhr.open("GET", `http://api.icndb.com/jokes/random/${numberOfJokes}`, true);
    
    xhr.onload = () => {
        if (xhr.status === 200) {
            if (document.getElementById("jokes-response") !== null) document.getElementById("jokes-response").remove();
            const jokes = JSON.parse(xhr.responseText);
            const ul = document.createElement("ol");
            ul.id = "jokes-response";
            jokes.value.forEach(joke => {
                let el = document.createElement("li");
                el.innerText = joke.joke.replace(/&quot;/g,'"');
                ul.appendChild(el);
            });
            form.insertAdjacentElement("beforeend", ul);
        }
    };

    xhr.send();

    e.preventDefault();
})