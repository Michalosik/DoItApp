"use strict"
let todoList;
let doneBtns;
let editBtns;
let removeBtns;
let toDoCounter;
let doneCounter;
let task;
let foundTask;
let taskId;
let addTaskBtn;
let tasks = [];
let isLoading = true;
//paths
let getTasksPath = '/php/functions/getTasks.php';
let updateTaskPath = '/php/functions/updateTask.php';
let createTaskPath = '/php/functions/addTask.php';
let removeTaskPath = '/php/functions/removeTask.php';
let getRandomQuotePath = '/php/functions/getRandomQuote.php'
//constructor
class TaskObj {
    constructor(text, isDone, id) {
        this.text = text;
        this.isDone = isDone;
        this.id = id;
    }
}
//loading functions

document.addEventListener('DOMContentLoaded', () => {
    fetch(getTasksPath).then((res) => {
        if (res.ok) {
            return res.json();
        }
    }).then((data) => {
        isLoading = false;
        data.forEach(taskServer => {
            taskServer = new TaskObj(taskServer.text, taskServer.is_done == 1 ? 'true' : 'false', taskServer.id);
            tasks.push(taskServer);
        })
        setTasks();
        prepareDOMElements();
        handleCounters();
        prepareEvents();
    });
    fetch(getRandomQuotePath).then((res) => {
        if (res.ok) {
            return res.json();
        }
    }).then((quote) => {
        document.querySelector('.todo__header-form-input').setAttribute('placeholder', quote[0].quote);
    })

})


const prepareDOMElements = () => {
    todoList = document.querySelector('.todo__tasks');
    doneBtns = document.querySelectorAll('.check');
    editBtns = document.querySelectorAll('.edit');
    removeBtns = document.querySelectorAll('.remove');
    toDoCounter = document.querySelector('.things-to-do');
    doneCounter = document.querySelector('.things-done');
    addTaskBtn = document.querySelector('.todo__header-form-btn');
}

//setters
const setTasks = () => {
    if (tasks.length >= 1) {
        tasks.forEach(task => {
            let newTask = document.createElement('li');
            newTask.classList.add('todo__tasks-item');
            newTask.setAttribute('data-is-done', task.isDone);
            newTask.setAttribute('data-id', task.id);
            newTask.innerHTML = `<p>${task.text}</p>
    <div class="todo__tasks-item-controls">
        <button class="check"><span class="sr-only">Mark as done</span><i class="fas fa-check-circle"></i></button>
        <button class="edit"><span class="sr-only">Edit</span><i class="fas fa-edit"></i></button>
        <button class="remove"><span class="sr-only">Remove</span><i class="fas fa-times"></i></button>
    </div>`
            document.querySelector('.todo__tasks').prepend(newTask);
        })
    } else {
        tasks = [];
        let info = document.createElement('li');
        info.classList.add('flex-center');
        info.innerText = "We are sorry, but there is no tasks to do!"
        document.querySelector('.todo__tasks').prepend(info);
    }
}
// modals 
const createModal = () => {
    let modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.prepend(modal);
}

const removeModal = () => {
    let modal = document.querySelector('.modal');
    document.body.removeChild(modal);
}

//counters
const handleCounters = () => {
    toDoCounter.innerText = todoList.querySelectorAll('.todo__tasks-item[data-is-done="false"]').length;
    doneCounter.innerText = todoList.querySelectorAll('.todo__tasks-item[data-is-done="true"]').length;
}
//main functions
const updateTask = (data, path) => {
    fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        res.json;
    })
}

const addTask = () => {
    let text = document.querySelector('.todo__header-form-input').value;
    const id = () => {
        if (tasks.length < 1) {
            return 1;
        } else {
            let lastId = document.querySelector('.todo__tasks-item:last-child').getAttribute('data-id');
            return lastId = parseInt(lastId) + 1;
        }
    }
    if (text.trim() == "") {
        text = '';
        document.querySelector('.todo__header-form-input').setAttribute('placeholder', 'Ohh.. no.. you have written something wrong :(');
    } else {
        try {
            const newTask = new TaskObj(text.trim(), 'false', id());
            updateTask(newTask, createTaskPath);
        } catch {
            document.querySelector('.todo__header-form-input').setAttribute('placeholder', 'Ohh.. no.. you have written something wrong :(');
        }
    }
}


const handleTaskEvent = (e) => {
    task = e.target.closest('.todo__tasks-item');
    taskId = e.target.closest('.todo__tasks-item').getAttribute('data-id');
    foundTask = tasks.find(item => item.id == taskId);
    return task, taskId, foundTask;

}

const markAsDone = (e) => {
    handleTaskEvent(e);
    let attr = task.getAttribute('data-is-done');
    if (attr === 'false') {
        task.setAttribute('data-is-done', "true");
        foundTask.isDone = 1;
    } else {
        task.setAttribute('data-is-done', "false");
        foundTask.isDone = 0;
    }
    console.log(foundTask);
    let update = new TaskObj(foundTask.text, foundTask.isDone, parseInt(foundTask.id));
    updateTask(update, '/php/functions/updateTask.php');
    handleCounters();
}
const editTask = (e) => {
    handleTaskEvent(e);
    createModal();
    let text = task.querySelector('p');
    document.querySelector('.modal').innerHTML = `<form class='edit'><input type='text'
        class='edit-input' value="${text.innerText}"><div class='modal-btns'> <button class='confirm' type='button'>Save</button><button type='button' class="cancel">Cancel</button></div></form><div class="listener"></div>`;
    document.querySelector('.confirm').addEventListener('click', () => {
        let inputValue = document.querySelector('.edit-input').value;
        foundTask.text = inputValue;
        text.innerText = inputValue;
        const editedTask = new TaskObj(inputValue, foundTask.isDone === 'false' || 0 ? 0 : 1, foundTask.id);
        updateTask(editedTask, updateTaskPath);
        removeModal();
    });
    handleModalListeners();
}

const removeTask = (e) => {
    handleTaskEvent(e);
    createModal();
    document.querySelector('.modal').innerHTML = '<form class="delete"><label>Are you sure?</label><div class="modal-btns"><button type="button" class="remove">Delete</button><button type="button" class="cancel">Cancel</button></div></form><div class="listener"></div>';
    document.querySelector('.remove').addEventListener('click', () => {
        todoList.removeChild(task);
        tasks = tasks.filter(task => task !== foundTask);
        const taskToRemove = new TaskObj(
            foundTask.text, foundTask.isDone === 'false' || 0 ? 0 : 1, foundTask.id
        )
        console.log(taskToRemove);
        updateTask(taskToRemove, removeTaskPath);
        if (tasks.length <= 1) {
            window.location.reload();
        } else {
            removeModal();
        }
    })

    handleModalListeners();
}

//EventListeners
const prepareEvents = () => {
    doneBtns.forEach(btn => {
        btn.addEventListener('click', markAsDone);
    });
    editBtns.forEach(btn => {
        btn.addEventListener('click', editTask);
    })
    removeBtns.forEach(btn => {
        btn.addEventListener('click', removeTask);
    })
    addTaskBtn.addEventListener('click', addTask);
};
const handleModalListeners = () => {
    document.querySelector('.listener').addEventListener('click', removeModal);
    document.querySelector('.cancel').addEventListener('click', removeModal);
    handleCounters();
};