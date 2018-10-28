//Grab UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event isteners
loadAllEventListeners();

function loadAllEventListeners() {
    //event called on DOM load
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //add delete listener
    taskList.addEventListener('click', deleteTask);
    //add clear all listener
    clearBtn.addEventListener('click', clearTasks);
    //create search functionality
    filter.addEventListener('keyup', filterItems);
}

//Get tasks from localstorage
function getTasks() {
    //initialize tasks variable
    let tasks;
    //if there are no tasks in local storage, set the tasks variable to an empty array
    if (!localStorage.getItem('tasks')) {
        tasks = [];
    }
    // if there are tasks in localstorage, parge them and save them to tasks as an array
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className = 'delete item secondary-content';
        link.innerHTML = "<i class='fa fa-remove'></i>";
        li.appendChild(link);

        taskList.appendChild(li);
    });
}

//Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Please add a task');
    }
    //If there is a value, we want to create an LI and append it to the UL

    //Create the LI element
    const li = document.createElement('li');
    //add class to the li
    li.className = 'collection-item';
    //create text node and appent it to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //create a new link element
    const link = document.createElement('a');
    //add class to link element
    link.className = 'delete-item secondary-content';
    //add icon 
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to the li
    li.appendChild(link);

    taskList.appendChild(li);

    //persist to local storage
    saveToLocal(taskInput.value);

    //reset task input
    taskInput.value = '';
    //prevent form default behaviour
    e.preventDefault();
}

//save to local storage
function saveToLocal(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(e) {
    const textContent = e.target.parentElement.parentElement.textContent;
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm(`Are you sure that you want to delete ${textContent}?`)) {
            e.target.parentElement.parentElement.remove();
        }
    }
    removeFromLocalStorage(e.target.parentElement.parentElement);
}

//remove item from local storage
function removeFromLocalStorage(currentTask) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
        if (currentTask.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    if (confirm('Are you sure that you want to delete all tasks?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        clearFromLocal();
    }
}

function clearFromLocal() {
    localStorage.clear();
}

function filterItems(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}