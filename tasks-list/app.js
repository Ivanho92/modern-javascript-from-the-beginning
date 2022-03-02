let form = document.getElementById("form");
let newTaskInput = document.getElementById("new_task");
let removeAllTasksButton = document.getElementById("remove_all_tasks");
let filteringButton = document.getElementById("filter_input");

loadEventListeners();

function loadEventListeners () {
    document.addEventListener("DOMContentLoaded", getTasks);
    form.addEventListener("submit", addTask);
    document.body.addEventListener("click", deleteTask);
    document.body.addEventListener("keyup", deleteTask);
    removeAllTasksButton.addEventListener("click", deleteAllTasks);
    filteringButton.addEventListener("keyup", filterTasks);
}

function getTasks () {
    let tasks = localStorage.getItem("tasks") !== null ? JSON.parse(localStorage.getItem("tasks")) : [];
    tasks.forEach(task => createTaskElement(task));
}

function createTaskElement(task) {
    let newTaskEl = document.createElement("li");
    newTaskEl.classList.add("collection-item");
    newTaskEl.innerHTML = `<div>${task}<a href="#!" class="secondary-content"><i class="delete-action material-icons deep-orange-text text-accent-3">delete_forever</i></a></div>`;
    document.querySelector("ul.collection").append(newTaskEl);
};

function addTask () {
    if (newTaskInput.value !== '') {
        storeTaskInLocalStorage(newTaskInput.value);
        createTaskElement(newTaskInput.value);    
        newTaskInput.value = '';
    }
}

function deleteTask (e) {
    if (e.target.localName == "a" && (e.key == 'Enter' || e.key == ' ')) {
        removeTaskFromLocalStorage(e.target.parentNode.parentNode);
        e.target.parentNode.parentNode.remove();
    };
    
    if (e.target.className.includes("delete-action")) {
        removeTaskFromLocalStorage(e.target.parentNode.parentNode.parentNode);
        e.target.parentNode.parentNode.parentNode.remove();
    };
}

function deleteAllTasks (e) {
    let children = document.querySelector("ul.collection").children;
    children = Array.from(children);
    children.forEach(el => el.remove());
    localStorage.clear();
}

function filterTasks (e) {
    let query = e.target.value.toLowerCase();
    let elements = document.querySelector("ul.collection").children;
    elements = Array.from(elements);
    elements.forEach( task => {
        let taskContent = task.firstElementChild.textContent.toLowerCase();
        taskContent = taskContent.replace('delete_forever','');
        if (taskContent.indexOf(query) > -1) {
            task.classList.remove("hide");
        } else {
            task.classList.add("hide");
        }
    });
}

function storeTaskInLocalStorage (task) {
    let tasks = localStorage.getItem("tasks") !== null ? JSON.parse(localStorage.getItem("tasks")) : [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage (task) {
    task = task.textContent.replace('delete_forever','');
    let tasks = localStorage.getItem("tasks") !== null ? JSON.parse(localStorage.getItem("tasks")) : [];
    tasks.forEach((taskLocalStorage, index) => {
        if (task === taskLocalStorage) tasks.splice(index, 1);   
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}