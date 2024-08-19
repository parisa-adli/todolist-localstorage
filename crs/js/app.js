// form => submit => create new todo => {id, title, createAt, isComplated}
// const todos = [] => todos.push(todo)

// selecting :
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");
const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const closeModalBtn = document.querySelector(".close-modal");
const latest = document.getElementById("latest");
const earlest = document.getElementById("earlest");

// let todos = getAllTodos();
let filterValue = "all";

// event :
document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  createTodos(todos);
  sortData();
});

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
  saveTodo(newTodo);
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

function sortData() {
  const todos = getAllTodos();
  latest.addEventListener("change", (e) => {
    todos.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    saveAllTodos(todos);
    filterTodos();
  });
  earlest.addEventListener("change", (e) => {
    todos.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    saveAllTodos(todos);
    filterTodos();
  });
}

function filterTodos() {
  const todos = getAllTodos();
  sortData();
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
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((todo) => todo.id !== todoId);
  saveAllTodos(todos);
  filterTodos();
}

function checkTodo(e) {
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((todo) => todo.id === todoId);
  todo.isComplated = !todo.isComplated;
  saveAllTodos(todos);
  filterTodos();
}

function showModal() {
  modal.classList.remove("hidden");
  backdrop.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  backdrop.classList.add("hidden");
}

function editTodo(e) {
  const todos = getAllTodos();
  const inputEditValue = document.getElementById("edit-todo-value");
  const formEditValue = document.querySelector(".edit-todo-form");
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((todo) => todo.id === todoId);

  // show modal edit todo
  showModal();
  closeModalBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  //   console.log(todo.title);
  inputEditValue.focus();
  inputEditValue.value = todo.title;

  // form edit todo : submit
  formEditValue.addEventListener("submit", (e) => {
    e.preventDefault();
    todo.title = inputEditValue.value;
    // console.log(editedTodo);
    saveAllTodos(todos);
    filterTodos();
    // console.log(todos);
    closeModal();
  });
}

// localStorage -> web API
function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));

  return savedTodos;
}
function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
