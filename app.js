const todoInput = document.querySelector("#todoInput");
const formBtn = document.querySelector('#formBtn');
const todoUl = document.querySelector('#todoUl');
const todoBody = document.querySelector('body');
//retrieve from localStorage
const todoList = JSON.parse(localStorage.getItem('todos')) || [];
for (let i = 0; i < todoList.length; i++) {
    const newTodoLi = document.createElement('li');
    const newTodoSpan = document.createElement('span');
    newTodoSpan.innerHTML = todoList[i].task;
    newTodoLi.appendChild(newTodoSpan);
    todoUl.appendChild(newTodoLi);
    //add line-through
    newTodoSpan.done = todoList[i].done;
    newTodoSpan.done ? newTodoSpan.style.textDecoration = 'line-through': newTodoSpan.style.textDecoration = 'none';
    //remove button
    const newDeleteBtn = document.createElement('button');
    newDeleteBtn.innerHTML = 'remove';
    newTodoLi.appendChild(newDeleteBtn);
}
//add <li> and remove button to <ul>
const addLi = function () {
    //creat <li>
    const todoLi = document.createElement('li');
    const spanLi = document.createElement('span');
    spanLi.innerHTML = todoInput.value;
    spanLi.done = false;
    todoLi.appendChild(spanLi);
    todoUl.appendChild(todoLi);
    //creat remove button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "remove";
    todoLi.appendChild(deleteBtn);

    //save at local storage
    todoList.push({
        task: spanLi.innerHTML,
        done: false
    });
    localStorage.setItem("todos", JSON.stringify(todoList));
};
//add eventListener
//add new todo, add or delete 'line-through',remove completed todo.
todoBody.addEventListener('click', function (e) {
    let targetName = e.target;
    let targetTagName = targetName.tagName;
    if (targetTagName === 'SPAN') {
        if (!targetName.done) {
            targetName.style.textDecoration = 'line-through';
            targetName.done = true;
            //save "add line-through" to local storage
            for (let i = 0; i < todoList.length; i++) {
                if (todoList[i].task === targetName.innerText) {
                    todoList[i].done = true;
                    localStorage.setItem('todos',JSON.stringify(todoList));
                };
            };
        } else {
            targetName.style.textDecoration = 'none';
            targetName.done = false;
            //save 'remove line-through' to local storage
            for (let i = 0; i < todoList.length; i++) {
                if (todoList[i].task === targetName.innerText) {
                    todoList[i].done = false;
                    localStorage.setItem('todos',JSON.stringify(todoList));
                };
            };
        };
    } else if (targetTagName === 'BUTTON') {
        targetName.parentElement.remove();
        //save 'remove todo' to local storage
        for(let i = 0; i < todoList.length; i++){
            if(todoList[i].task === targetName.previousElementSibling.innerText){
                todoList.splice(i,1);
                localStorage.setItem('todos',JSON.stringify(todoList));
            }
        }
    } else if (targetName.type === 'button') {
        e.preventDefault();
        addLi();
        todoInput.value = '';
    }
});