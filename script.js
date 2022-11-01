// Initial Data 
const todoForm = document.querySelector('.form--todo');
const todoInput = document.querySelector('.input--todo');
const todoList = document.querySelector('.allTodo');
const editForm = document.querySelector('.edit--form');
const editInput = document.querySelector('.input--edit');
const cancelEditBtn = document.querySelector('.cancel-edit-btn');

let oldInputValue;


// Functions
const saveTodo = (text) => {
    let todoItem = document.querySelector('.allTodo .todo').cloneNode(true);
    todoItem.querySelector('span').innerHTML = text;

    todoList.appendChild(todoItem);

    todoInput.value = '';
    todoInput.focus();
}

const toggleForms = () => {
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('span');

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        };
    });
};

// Events
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue) {
        saveTodo(inputValue);
    };
});

document.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    const grandParentEl = parentEl.parentNode;

    let todoTitle;

    if(grandParentEl && grandParentEl.querySelector('span')) {
        todoTitle = grandParentEl.querySelector('span').innerText;
    }
    if(targetEl.classList.contains('finish--todo')) {
        grandParentEl.classList.toggle('done');
    };

    if(targetEl.classList.contains('remove--todo')) {
        grandParentEl.remove();
    };

    if(targetEl.classList.contains('edit--todo')) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    };

});

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();
})