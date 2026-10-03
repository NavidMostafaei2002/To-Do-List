let allTodos = [];

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
    "#unCompleteTodosContainer",
  );
  const completeTodosContainer = document.querySelector(
    "#completeTodosContainer",
  );

  unCompleteTodosContainer.innerHTML = "";
  completeTodosContainer.innerHTML = "";

  allTodos.forEach((todo) => {
    const todohtml = `<div
            class="rounded-xl border border-[var(--btn-bg-muted)] bg-[var(--card)] relative p-4 after:absolute after:right-0 after:top-2 after:h-3/4 after:w-1 after:rounded-l-full after:bg-[var(${todo.priority})] cursor-default">
            <div class="flex items-center gap-3">
              <input
                type="checkbox" ${todo.isCompleted ? "checked" : ""}
                class="size-[18px] shrink-0 accent-[var(--color-primary-blue)]" />
              <span
                class="text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">${todo.title}</span>
              <span
                class="inline-flex items-center gap-1 rounded-md px-2 py-px text-[11px] bg-[var(--color-secondary-green)] text-[var(--color-primary-green)]">پایین</span>
              <button
                class="ms-auto px-1 text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]"
                aria-label="گزینه‌ها">
                ⋮
              </button>
            </div>
            <p class="mt-2 ps-8 text-xs text-[var(--color-primary-muted)]">
              ${todo.description}
            </p>
            <div
              class="rounded-xl border border-[var(--btn-bg-muted)] bg-[var(--card)] absolute end-8 top-6 z-10 gap-1 p-1 shadow-md">
              <button onclick="editTodoHandler('${todo.id}')"
                class="rounded p-1.5 text-[var(--color-primary)] cursor-pointer"
                aria-label="ویرایش">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                  class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

              </button>
              <button onclick="editTodoHandler('${todo.id}')"
                class="rounded p-1.5 text-[var(--error)] cursor-pointer"
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
          
          ${
            todo.isEditing
              ? `
                      <div
            id="add-form"
            class="rounded-xl border border-[var(--btn-bg-muted)] bg-[var(--card)] mt-3 shadow-sm">
            <div class="space-y-2 p-4">
              <input
                value="${todo.title}"
                placeholder="نام تسک"
                class="title-input w-full bg-transparent text-sm font-bold text-[var(--color-primary)] outline-none" />
              <input
                value="${todo.description}"
                placeholder="توضیحات"
                class="desc-input w-full bg-transparent text-xs text-[var(--color-primary-muted)] outline-none" />
              <div class="flex flex-col flex-wrap items-start px-4 gap-2 pt-2">
                <button
                  class="rounded-md border border-[var(--btn-bg-muted)] px-2 py-1 text-xs text-[var(--color-primary-muted)]">
                  تگ‌ها
                </button>
                <div
                  class="flex gap-2 rounded-lg border border-[var(--btn-bg-muted)] px-2 py-4">
                  <button
                    class="priority-input inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[11px] bg-[var(--color-secondary-red)] text-[var(--color-primary-red)]">
                    بالا</button><button
                    class="priority-input inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[11px] bg-[var(--color-secondary-yellow)] text-[var(--color-primary-yellow)]">
                    متوسط</button><button
                    class="priority-input inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-[11px] bg-[var(--color-secondary-green)] text-[var(--color-primary-green)]">
                    پایین
                  </button>
                </div>
              </div>
            </div>
            <div
              class="flex items-center gap-2 border-t border-[var(--btn-bg-muted)] p-3">
              <button onclick="editTodoHandler('${todo.id}')"
                class="rounded-lg bg-[var(--color-primary-blue)] px-4 py-1.5 text-[13px] text-white">
                ویرایش تسک
              </button>
              <button onclick="allTodos.find(todo => todo.id === '${todo.id}').isEditing = false; renderTodosHandler()"
                class="grid size-8 place-items-center rounded-lg bg-[var(--btn-bg-muted)] text-[var(--color-primary)]"
                aria-label="لغو">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                  class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12" />
                </svg>

              </button>
            </div>
          </div>
            `
              : ""
          }
          `;
  });
};

const showAddTodoFormHandler = () => {
  const addForm = document.querySelector("#addForm");

  addForm.hidden = false;
};

const hideAddTodoFormHandle = () => {
  const addForm = document.querySelector("#addForm");
  addForm.hidden = true;
};
