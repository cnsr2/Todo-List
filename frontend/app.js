const TODO_LIST = {
  todoList: [],
  todo: {},
  selectedTodo: '',
};
class Todo {
  constructor(text) {
    this.text = text;
    this.isDone = false;
  }
}
getTodoList();

async function getTodoList() {
  const RESPONSE = await fetch('http://localhost:5500/');
  const DATA = await RESPONSE.json();
  TODO_LIST.todoList = DATA;
  screen();
}

async function addTodo() {
  await fetch('http://localhost:5500/addtodo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(TODO_LIST.todo),
  });
  TODO_LIST.todo = {};
}
async function deleteTodo(id) {
  console.log(TODO_LIST.selectedTodo);
  await fetch(`http://localhost:5500/deletetodo/${id}`, {
    method: 'POST',
  });
  //  TODO_LIST.selectedTodo = '';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const todo = new Todo(todoInput.value);
  TODO_LIST.todo = todo;
  addTodo();
  setTimeout(() => {
    getTodoList();
  }, 200);
});

mainUL.addEventListener('click', (e) => {
  //  TODO_LIST.selectedTodo = e.target.parentElement.id;
  deleteTodo(e.target.parentElement.id);
  setTimeout(() => {
    getTodoList();
  }, 200);
});

function screen() {
  console.log(TODO_LIST.todoList);
  mainUL.innerHTML = TODO_LIST.todoList
    .map((todo) => {
      return `
  <li id="${todo._id}"> ${todo.text} <span> ${todo.isDone} </span> <a> X </a> </li>
  `;
    })
    .join('');
}
