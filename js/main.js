import { priorityOptions } from "../utils/priority.js";
let allTodos = [];
let selectedPriority = "normal";

// Priority
const priorityButtons = document.querySelectorAll(".priority-input");
priorityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedPriority = button.dataset.priority;

    priorityButtons.forEach((item) => {
      item.classList.remove("ring-2", "ring-[var(--color-primary-blue)]");
    });

    button.classList.add("ring-2", "ring-[var(--color-primary-blue)]");
  });
});
const priorityToggle = document.querySelector("#priorityToggle");
const priorityOptionsContainer = document.querySelector("#priorityOptions");

priorityToggle.addEventListener("click", () => {
  priorityOptionsContainer.classList.toggle("hidden");
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
    let todohtml;
    if (todo.isEditing) {
      todohtml = `<div
  class="rounded-xl border border-[var(--btn-bg-muted)] bg-[var(--card)] relative p-4">

  <div class="space-y-2">

    <input
      type="text"
      value="${todo.title}"
      placeholder="نام تسک"
      class="w-full bg-transparent text-sm font-bold text-[var(--color-primary)] outline-none"
    />

    <input
      type="text"
      value="${todo.description}"
      placeholder="توضیحات"
      class="w-full bg-transparent text-xs text-[var(--color-primary-muted)] outline-none"
    />

    <div class="flex flex-wrap items-center gap-2 pt-2">

      <button
        type="button"
        data-priority="high"
        class="inline-flex items-center gap-1 rounded-md px-2 py-px text-[11px] bg-[var(--color-secondary-red)] text-[var(--color-primary-red)]">
        بالا
      </button>

      <button
        type="button"
        data-priority="normal"
        class="inline-flex items-center gap-1 rounded-md px-2 py-px text-[11px] bg-[var(--color-secondary-yellow)] text-[var(--color-primary-yellow)]">
        متوسط
      </button>

      <button
        type="button"
        data-priority="low"
        class="inline-flex items-center gap-1 rounded-md px-2 py-px text-[11px] bg-[var(--color-secondary-green)] text-[var(--color-primary-green)]">
        پایین
      </button>

    </div>

  </div>

  <div
    class="flex items-center gap-2 border-t border-[var(--btn-bg-muted)] p-3 mt-3">

    <button
      type="button"
      class="rounded-lg bg-[var(--color-primary-blue)] px-4 py-1.5 text-[13px] text-white">
      ویرایش تسک
    </button>

    <button
      type="button"
      class="grid size-8 place-items-center rounded-lg bg-[var(--btn-bg-muted)] text-[var(--color-primary)]"
      aria-label="لغو">
      ×
    </button>

  </div>
</div>`;
    } else {
      todohtml = `
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
        <button data-todo-id="${todo.id}"
          class="todo-menu-button ms-auto px-1 text-[var(--color-primary)] cursor-pointer"
          aria-label="گزینه‌ها">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>

        </button>
      </div>

      <p class="mt-2 ps-8 text-xs text-[var(--color-primary-muted)]">
        ${todo.description}
      </p>
                  <div data-menu-id="${todo.id}"
            class="todo-menu rounded-xl border border-[var(--btn-bg-muted)] bg-[var(--card)] absolute end-10 top-6 z-10 gap-1 p-1 shadow-md hidden">
            <button data-todo-id="${todo.id}"
              class="todo-menu-button rounded p-1.5 text-[var(--color-primary)] cursor-pointer"
              aria-label="ویرایش">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>

            </button>
            <button data-todo-id="${todo.id}"
              class="todo-menu-button rounded p-1.5 text-[var(--error)] cursor-pointer"
              aria-label="حذف">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>

            </button>
          </div>
    </div>
  `;
    }
    unCompleteTodosContainer.insertAdjacentHTML("beforeend", todohtml);
  });

  const menuButtons = document.querySelectorAll(".todo-menu-button");

  menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const todoId = button.dataset.todoId;

      const menu = document.querySelector(`[data-menu-id="${todoId}"]`);

      menu.classList.toggle("hidden");
    });
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
