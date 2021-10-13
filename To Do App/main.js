let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

submit.onclick = function() {
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
};

tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains("task")) {
        e.target.classList.toggle("done");
        toggleTaskStatus(e.target.getAttribute("data-id"));
    }
})

function addTaskToArray(taskText) {
    let task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };

    arrayOfTasks.push(task);

    addElementsToPageFrom(arrayOfTasks);

    addDataToLocalStorage(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach((ele) => {
        let div = document.createElement("div");
        div.classList.add("task");
        if (ele.completed) {
            div.classList.add("done");
        }
        div.setAttribute("data-id", ele.id);
        div.appendChild(document.createTextNode(ele.title))

        let span = document.createElement("span");
        span.appendChild(document.createTextNode("delete"));
        span.classList.add("del");
        div.appendChild(span);

        tasksDiv.appendChild(div);
        console.log(tasksDiv);
    });
}

function addDataToLocalStorage(arrayOfTasks) {
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    if (localStorage.getItem("tasks")) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskFromLocalStorage(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorage(arrayOfTasks);
}

function toggleTaskStatus(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false;
        }
    }
    addDataToLocalStorage(arrayOfTasks);
}