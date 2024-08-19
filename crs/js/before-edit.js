// form => submit => create new todo => {id, title, createAt, isComplated}
// const todos = [] => todos.push(todo)

// selecting :
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");

let todos = [];
let filterValue = "all";
// event :
todoForm.addEventListener("submit", addTodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

// function :

function addTodo(e) {
  // don't refresh form
  e.preventDefault();
  if (!todoInput.value) return null;
  const newTodo = {
    id: Date.now(),
    title: todoInput.value,
    createdAt: new Date().toISOString(),
    isComplated: false,
  };
  todos.push(newTodo);
  filterTodos();
}

function createTodos(todos) {
  //create todos in dom
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
          <p class="todo__title ${todo.isComplated && "completed"}">${
      todo.title
    }</p>
          <span class="todo__createdAt">${new Date(
            todo.createdAt
          ).toLocaleDateString("fa-IR")}</span>
          <button class="todo__edit" data-todo-id=${
            todo.id
          }><i class="fa-regular fa-pen-to-square"></i></button>
          <button class="todo__check" data-todo-id=${
            todo.id
          }><i class="far fa-check-square"></i></button>
          <button class="todo__remove" data-todo-id=${
            todo.id
          }><i class="far fa-trash-alt"></i></button>
        `;
  });
  todoList.innerHTML = result;
  //   console.log(result);
  todoInput.value = "";
  //   console.log(todos);

  const removeBtns = [...document.querySelectorAll(".todo__remove")];
  removeBtns.forEach((todo) => todo.addEventListener("click", removeTodo));

  const checkBtns = [...document.querySelectorAll(".todo__check")];
  checkBtns.forEach((todo) => todo.addEventListener("click", checkTodo));

  const editBtns = [...document.querySelectorAll(".todo__edit")];
  editBtns.forEach((todo) => todo.addEventListener("click", editTodo));
}

function filterTodos() {
  switch (filterValue) {
    case "all": {
      createTodos(todos);
      break;
    }
    case "completed": {
      const filterTodos = todos.filter((todo) => todo.isComplated);
      createTodos(filterTodos);
      break;
    }
    case "uncompleted": {
      const filterTodos = todos.filter((todo) => !todo.isComplated);
      createTodos(filterTodos);
      break;
    }
  }
}

function removeTodo(e) {
  // data-todo-id=${todo.id} -> dataset.todoId
  //console.log(e.target.dataset.todoId);
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((todo) => todo.id !== todoId);
  filterTodos();
}

function checkTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((todo) => todo.id === todoId);
  todo.isComplated = !todo.isComplated;
  filterTodos();
}

function editTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
}