"use strict"
let todoList;
let doneBtns;
let editBtns;
let removeBtns;
let toDoCounter;
let doneCounter;
let task;
let newTaskInput;
let addTaskBtn;
let tasks;

document.addEventListener('DOMContentLoaded', (e) => {
    getTasks();
    prepareDOMElements();
    handleCounters();
    prepareEvents();

})
class TaskObj {
    constructor(text, isDone, id) {
        this.text = text;
        this.isDone = isDone;
        this.id = id;
    }
}
const prepareDOMElements = () => {
    todoList = document.querySelector('.todo__tasks');
    doneBtns = document.querySelectorAll('.check');
    editBtns = document.querySelectorAll('.edit');
    removeBtns = document.querySelectorAll('.remove');
    toDoCounter = document.querySelector('.things-to-do');
    doneCounter = document.querySelector('.things-done');
    addTaskBtn = document.querySelector('.todo__header-form-btn');
}
const getTasks = () => {
    let taskArr = JSON.parse(localStorage.getItem('tasks'));
    if (taskArr !== null) {
        tasks = taskArr;
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
            prepareDOMElements();

        })
    } else {
        tasks = [];
        let info = document.createElement('li');
        info.classList.add('flex-center');
        info.innerText = "We are sorry, but there is no tasks to do!"
        document.querySelector('.todo__tasks').prepend(info);
    }
}

const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
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
const handleTaskAdd = () => {
    newTaskInput = document.querySelector('.todo__header-form-input').value;
    // let newTask = document.createElement('li');
    // newTask.classList.add('todo__tasks-item');
    // newTask.setAttribute('data-is-done', 'false');
    const id = () => {
        if (tasks.length < 1) {
            // newTask.setAttribute('data-id', 1);
            return 1;
        } else {
            let id = document.querySelector('.todo__tasks-item:last-child').getAttribute('data-id');
            let taskId = parseInt(id) + 1;
            return taskId;
        }

        // newTask.setAttribute('data-id', parseInt(id) + 1);
    }
    // newTask.innerHTML = `<p>${newTaskInput}</p>
    // <div class="todo__tasks-item-controls">
    //     <button class="check"><span class="sr-only">Mark as done</span><i class="fas fa-check-circle"></i></button>
    //     <button class="edit"><span class="sr-only">Edit</span><i class="fas fa-edit"></i></button>
    //     <button class="remove"><span class="sr-only">Remove</span><i class="fas fa-times"></i></button>
    // </div>`
    // todoList.prepend(newTask);
    const newTaskObj = new TaskObj(newTaskInput, 'false', id());
    tasks.unshift(newTaskObj);
    updateLocalStorage();
}



const handleTaskEvent = (e) => {
    return task = e.target.closest('.todo__tasks-item')
}


const handleTaskMarkAsDone = (e) => {
    handleTaskEvent(e);
    let taskId = e.target.closest('.todo__tasks-item').getAttribute('data-id');
    let foundTask = tasks.find(item => item.id == taskId);
    let attr = task.getAttribute('data-is-done');
    if (attr === 'false') {
        task.setAttribute('data-is-done', "true");
        foundTask.isDone = true;
        updateLocalStorage();
    } else {
        task.setAttribute('data-is-done', 'false');
        foundTask.isDone = false;
        updateLocalStorage();
    }
    handleCounters();
}
const handleTaskEdit = (e) => {
    handleTaskEvent(e);
    let taskId = e.target.closest('.todo__tasks-item').getAttribute('data-id');
    let foundTask = tasks.find(item => item.id == taskId);
    createModal();
    let text = task.querySelector('p');
    document.querySelector('.modal').innerHTML = `<form action='POST' class='edit'><input type='text'
        class='edit-input' value="${text.innerText}"><div class='modal-btns'> <button class='confirm' type='button'>Save</button><button type='button' class="cancel">Cancel</button></div></form><div class="listener"></div>`;
    document.querySelector('.confirm').addEventListener('click', () => {
        let inputValue = document.querySelector('.edit-input').value;
        foundTask.text = inputValue;
        text.innerText = inputValue;
        updateLocalStorage();
        removeModal();
    });
    handleModalListeners();
}
const handleTaskRemove = (e) => {
    handleTaskEvent(e);
    let taskId = e.target.closest('.todo__tasks-item').getAttribute('data-id');
    let foundTask = tasks.find(item => item.id == taskId);
    createModal();
    document.querySelector('.modal').innerHTML = '<p>Are you sure?</p><div class="modal-btns"><button type="button" class="remove">Delete</button><button type="button" class="cancel">Cancel</button></div><div class="listener"></div>';
    document.querySelector('.remove').addEventListener('click', () => {
        todoList.removeChild(task);
        tasks = tasks.filter(task => task !== foundTask);
        updateLocalStorage();
        removeModal();
    })
    handleModalListeners();
}

const handleModalListeners = () => {
    document.querySelector('.listener').addEventListener('click', removeModal);
    document.querySelector('.cancel').addEventListener('click', removeModal);
    handleCounters();
}



const prepareEvents = () => {
    doneBtns.forEach(btn => {
        btn.addEventListener('click', handleTaskMarkAsDone);
    });
    editBtns.forEach(btn => {
        btn.addEventListener('click', handleTaskEdit);
    })
    removeBtns.forEach(btn => {
        btn.addEventListener('click', handleTaskRemove);
    })
    addTaskBtn.addEventListener('click', handleTaskAdd);

};