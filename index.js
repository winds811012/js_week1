var todoData = [];

var addBtn = document.getElementById("addTodo");
var todoThing = document.getElementById("newTodo");
var clearBtn = document.getElementById("clearTask");
var todoList = document.getElementById("todoList");
var taskCount = document.getElementById("taskCount");

addBtn.addEventListener("click", addTodo);
clearBtn.addEventListener("click", clearAll);
todoList.addEventListener("click", actions);
//渲染畫面
function render() {
  var str = "";
  todoData.forEach((item, index, array) => {
    str += `<li class="list-group-item">
    <div class="d-flex">
    <div class="form-check" data-action="complete" data-id="${item.id}">
    <input type="checkbox" class="form-check-input" ${
      item.completed ? "checked" : ""
    }>
    <label class="form-check-label ${item.completed ? "completed" : ""}"> ${
      item.title
    }</label>
    </div>
    <button type="button" class="close ml-auto remove" aria-label="Close" data-action="remove" data-id="${
      item.id
    }">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    </li>`;
  });
  todoList.innerHTML = str;
  taskCount.innerText = todoData.length;
}

//新增事項
function addTodo() {
  if (todoThing.value != "") {
    todoData.push({
      id: Math.floor(Date.now()),
      title: todoThing.value,
      completed: false,
    });
  }
  render();
  todoThing.value = "";
}

function deleteTodo(id) {
  var rmIndex = null;

  todoData.forEach((item, index, array) => {
    if (item.id == id) {
      rmIndex = index;
    }
  });
  todoData.splice(rmIndex, 1);
  render();
}

function clearAll() {
  todoData.length = 0;
  render();
}

function completeTask(id) {
  todoData.forEach((item, index, array) => {
    if (item.id == id) {
      item.completed = item.completed ? false : true;
    }
  });
  render();
}
//判斷點擊哪個動作
function actions(e) {
  var id = e.target.parentNode.dataset.id;
  var action = e.target.parentNode.dataset.action;
  if (action === "complete") {
    completeTask(id);
  } else if (action === "remove") {
    deleteTodo(id);
  }
}
