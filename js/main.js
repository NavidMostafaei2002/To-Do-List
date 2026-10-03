let allTodos = [];

// render todos in DOM
const renderTodosHandler = () => {};

// add todo to allTodos array
const addTodoHandler = () => {
  const titleInputValue = document.querySelector("#title-input");
  const descInputValue = document.querySelector("#desck-input");
  const priorityInputValue = document.querySelector("#priority-input");

  const task = {
    id: crypto.randomUUID(),
    title: titleInputValue.value,
    description: descInputValue.value,
    priority: priorityInputValue.value,
    isEditing: false,
    isCompleted: false,
  };

  allTodos.push(task);

  titleInputValue.value = "";
  descInputValue.value = "";
  renderTodos();
};

// delete todo from allTodos array
const deleteTodoHandler = (todoId) => {
  renderTodos();
};

// mark todo as complete in allTodos array
const completeTodoHandler = (todoId) => {
  renderTodos();
};

// edit todo in allTodos array
const editTodoHandler = (todoId) => {
  renderTodos();
};
