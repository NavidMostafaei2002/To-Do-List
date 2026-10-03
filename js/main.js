import { priorityOptions } from "../utils/priority.js";
let allTodos = [];
let selectedPriority = "normal";

// Priority
const priorityButtons = document.querySelectorAll(".priority-input");

priorityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedPriority = button.dataset.priority;
  });
});

// add todo to allTodos array
const addTodoHandler = () => {
  const titleInputValue = document.querySelector(".title-input");
  const descInputValue = document.querySelector(".desc-input");
  const priorityInputValue = document.querySelector(".priority-input");

  const task = {
    id: crypto.randomUUID(),
    title: titleInputValue.value,
    description: descInputValue.value,
    priority: selectedPriority,
    isEditing: false,
    isCompleted: false,
  };

  allTodos.push(task);

  titleInputValue.value = "";
  descInputValue.value = "";
  renderTodosHandler();
};

// delete todo from allTodos array
const deleteTodoHandler = (todoId) => {
  renderTodosHandler();
};

// mark todo as complete in allTodos array
const completeTodoHandler = (todoId) => {
  renderTodosHandler();
};

// edit todo in allTodos array
const editTodoHandler = (todoId) => {
  renderTodosHandler();
};

// update todo
const updateTodosHandler = () => {};

// render todos in DOM
const renderTodosHandler = () => {
  const unCompleteTodosContainer = document.querySelector(
    "#uncompleteTodosContainer",
  );

  unCompleteTodosContainer.innerHTML = "";

  allTodos.forEach((todo) => {
    const priority = priorityOptions[todo.priority];

    const todohtml = `
      <div
        class="rounded-xl border border-[var(--btn-bg-muted)] bg-[var(--card)] relative p-4
        after:absolute after:right-0 after:top-2.5 after:h-3/4 after:w-1 after:rounded-l-full
        after:${priority.afterColor}">
        
        <div class="flex items-center gap-3">

          <input
            type="checkbox"
            class="size-[18px] shrink-0 accent-[var(--color-primary-blue)]"
          />

          <span
            class="text-sm font-bold text-[var(--color-primary)]">
            ${todo.title}
          </span>

          <span
            class="inline-flex items-center gap-1 rounded-md px-2 py-px text-[11px]
            ${priority.bgColor} ${priority.textColor}">
            ${priority.label}
          </span>

          <button
            class="ms-auto px-1 text-[var(--color-primary)]"
            aria-label="گزینه‌ها">
            ⋮
          </button>

        </div>

        <p class="mt-2 ps-8 text-xs text-[var(--color-primary-muted)]">
          ${todo.description}
        </p>

      </div>
    `;

    unCompleteTodosContainer.insertAdjacentHTML("beforeend", todohtml);
  });
};

const showAddTodoFormHandler = () => {
  const addForm = document.querySelector("#addForm");
  const emptyState = document.querySelector("#emptyState");
  addForm.hidden = false;
  emptyState.hidden = true;
};

const hideAddTodoFormHandle = () => {
  const addForm = document.querySelector("#addForm");
  const emptyState = document.querySelector("#emptyState");

  addForm.hidden = true;

  if (allTodos.length === 0) {
    emptyState.hidden = false;
  }
};

window.showAddTodoFormHandler = showAddTodoFormHandler;
window.hideAddTodoFormHandle = hideAddTodoFormHandle;
window.addTodoHandler = addTodoHandler;
