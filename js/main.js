let allTodos = []
const STORAGE_KEY = "quera-todos"

const SEED_TODOS = [
  { id: "seed-1", title: "جلسه با مدیران پروژه", description: "جلسه با محسن یگانه و مریم جلالی", priority: "high", completed: false },
  { id: "seed-2", title: "خرید میوه و سبزیجات و لبنیات برای خانه", description: "سوپرمارکت یاران دریایی", priority: "medium", completed: false },
  { id: "seed-3", title: "تماس با جمشید", description: "باید در مورد کارهای باقیمانده از پروژه قبلی صحبت کنیم.", priority: "low", completed: false },
  { id: "seed-4", title: "خرید میوه و سبزیجات و لبنیات برای خانه", description: "", priority: "medium", completed: true },
  { id: "seed-5", title: "تماس با مبل فروشی در مورد تاخیر در ارسال", description: "", priority: "high", completed: true },
  { id: "seed-6", title: "جلسه با مرتضی در مورد مصاحبه با کارآموز ادمین پنل", description: "", priority: "low", completed: true },
]

const loadTodos = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === null ? structuredClone(SEED_TODOS) : JSON.parse(saved)
  } catch {
    return []
  }
}

const saveTodos = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allTodos))
}


const addForm = document.getElementById("add-form")
const openFormBtn = document.getElementById("open-add-form")
const titleInput = document.getElementById("todo-title")
const descInput = document.getElementById("todo-desc")
const tagsBtn = document.getElementById("tags-btn")
const priorityPicker = document.getElementById("priority-picker")
const selectedChip = document.getElementById("selected-priority")
const submitBtn = document.getElementById("submit-todo")
const cancelBtn = document.getElementById("cancel-todo")

const todosList = document.getElementById("todos-list")
const doneList = document.getElementById("done-list")
const emptyState = document.getElementById("empty-state")
const todoCountText = document.getElementById("todo-count-text")
const doneCountText = document.getElementById("done-count-text")
  


const toFa = (n) => n.toLocaleString("fa-IR")

const createId = () => {
  return "todo-" + Date.now()
}

const escapeHtml = (text) => {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

const ICONS = {
  dots: "M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z",
  edit: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10",
  trash: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z",
}

const icon = (path) => `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="${path}" />
  </svg>`

const CARD_BASE_CLASS =
  "relative rounded-xl border border-[var(--btn-bg-muted)] bg-[var(--card)] after:absolute after:right-0 after:top-2 after:h-3/4 after:w-1 after:rounded-l-full"

const menuTemplate = (withEdit) => `
  <div data-menu class="hidden rounded-xl border border-[var(--btn-bg-muted)] bg-[var(--card)] absolute end-8 top-6 z-10 gap-1 p-1 shadow-md">
    ${withEdit ? `<button data-action="edit" class="rounded p-1.5 text-[var(--color-primary)] cursor-pointer" aria-label="ویرایش">${icon(ICONS.edit)}</button>` : ""}
    <button data-action="delete" class="rounded p-1.5 text-[var(--error)] cursor-pointer" aria-label="حذف">${icon(ICONS.trash)}</button>
  </div>`

const todoCardTemplate = (todo) => {
  const p = getPriority(todo.priority)
  return `
    <div data-id="${todo.id}" class="${CARD_BASE_CLASS} ${p.bar} p-4">
      <div class="flex items-center gap-3">
        <input type="checkbox" data-action="toggle" class="size-[18px] shrink-0 cursor-pointer accent-[var(--color-primary-blue)]" />
        <span class="text-sm font-bold text-[var(--color-primary)]">${escapeHtml(todo.title)}</span>
        <span class="${CHIP_BASE_CLASS} ${p.chip}">${p.label}</span>
        <button data-action="menu" class="ms-auto cursor-pointer px-1 text-[var(--color-primary)]" aria-label="گزینه‌ها">⋮</button>
      </div>
      ${todo.description ? `<p class="mt-2 ps-8 text-xs text-[var(--color-primary-muted)]">${escapeHtml(todo.description)}</p>` : ""}
      ${menuTemplate(true)}
    </div>`
}

const doneCardTemplate = (todo) => {
  const p = getPriority(todo.priority)
  return `
    <div data-id="${todo.id}" class="${CARD_BASE_CLASS} ${p.bar} mt-3 flex flex-row items-center justify-between px-4 py-4">
      <div class="flex flex-row items-center gap-5">
        <input type="checkbox" data-action="toggle" id="todo-${todo.id}" class="size-[18px] shrink-0 cursor-pointer accent-[var(--color-primary-blue)]" checked />
        <label for="todo-${todo.id}">
          <p class="line-through decoration-1">${escapeHtml(todo.title)}</p>
        </label>
      </div>
      <button data-action="menu" class="mr-0 cursor-pointer" type="button" aria-label="گزینه‌ها">${icon(ICONS.dots)}</button>
      ${menuTemplate(false)}
    </div>`
}

const formAnchor = document.createComment("add-form-anchor")
addForm.before(formAnchor)

let editingId = null
let editedCard = null
let selectedPriority = null

const updateSubmitState = () => {
  submitBtn.disabled = titleInput.value.trim() === "" || selectedPriority === null
}

const setPriority = (key) => {
  selectedPriority = key
  priorityPicker.classList.add("hidden")
  priorityPicker.classList.remove("flex")

  if (key) {
    const p = getPriority(key)
    selectedChip.innerHTML = `<button type="button" class="${CHIP_BASE_CLASS} ${p.chip} cursor-pointer">× ${p.label}</button>`
  }
  selectedChip.classList.toggle("hidden", !key)
  tagsBtn.classList.toggle("hidden", Boolean(key))
  updateSubmitState()
}

const closeForm = () => {
  editedCard?.classList.remove("hidden")
  editedCard = null
  editingId = null
  formAnchor.after(addForm)
  addForm.classList.add("hidden")
  openFormBtn.classList.remove("hidden")
}

 const openForm = (todo = null) => {
  closeForm()

  editingId = todo ? todo.id : null
  titleInput.value = todo ? todo.title : ""
  descInput.value = todo ? todo.description : ""
  setPriority(todo ? todo.priority : null)
  submitBtn.textContent = todo ? "ویرایش تسک" : "اضافه کردن تسک"

  if (todo) {
    editedCard = todosList.querySelector(`[data-id="${todo.id}"]`)
    editedCard.classList.add("hidden")
    editedCard.after(addForm)
  } else {
    openFormBtn.classList.add("hidden")
  }

  addForm.classList.remove("hidden")
  titleInput.focus()
}

const closeAllMenus = (except = null) => {
  document.querySelectorAll("[data-menu]").forEach((menu) => {
    if (menu === except) return
    menu.classList.add("hidden")
    menu.classList.remove("flex")
  })
}

const toggleMenu = (card) => {
  const menu = card.querySelector("[data-menu]")
  closeAllMenus(menu)
  menu.classList.toggle("hidden")
  menu.classList.toggle("flex")
}


// render todos in DOM
const renderTodosHandler = () => {
  const pending = allTodos.filter((todo) => !todo.completed)
  const done = allTodos.filter((todo) => todo.completed)

  todosList.innerHTML = pending.map(todoCardTemplate).join("")
  doneList.innerHTML = done.map(doneCardTemplate).join("")

  todoCountText.innerHTML = pending.length
    ? `<span class="font-bold">${toFa(pending.length)}</span> تسک را باید انجام دهید.`
    : "تسکی برای امروز نداری!"
  doneCountText.innerHTML = done.length
    ? `<span class="font-bold">${toFa(done.length)}</span> تسک انجام شده است.`
    : "هنوز تسکی انجام نشده است."

  emptyState.classList.toggle("hidden", pending.length > 0)
}

// add todo to allTodos array
const addTodoHandler = () => {
  const title = titleInput.value.trim()
  if (!title || !selectedPriority) return

  allTodos.unshift({
    id: createId(),
    title,
    description: descInput.value.trim(),
    priority: selectedPriority,
    completed: false,
  })

  closeForm()
  saveTodos()
  renderTodosHandler()
}

// delete todo from allTodos array
const deleteTodoHandler = (todoId) => {
  allTodos = allTodos.filter((todo) => todo.id !== todoId)
  closeForm()
  saveTodos()
  renderTodosHandler()
}

// mark todo as complete in allTodos array
const completeTodoHandler = (todoId) => {
  const todo = allTodos.find((todo) => todo.id === todoId)
  if (!todo) return
  todo.completed = !todo.completed
  closeForm()
  saveTodos()
  renderTodosHandler()
}

// edit todo in allTodos array
const editTodoHandler = (todoId) => {
  const todo = allTodos.find((todo) => todo.id === todoId)
  const title = titleInput.value.trim()
  if (!todo || !title || !selectedPriority) return

  todo.title = title
  todo.description = descInput.value.trim()
  todo.priority = selectedPriority

  closeForm()
  saveTodos()
  renderTodosHandler()
}

openFormBtn.addEventListener("click", () => openForm())
cancelBtn.addEventListener("click", closeForm)
submitBtn.addEventListener("click", () => {
  editingId ? editTodoHandler(editingId) : addTodoHandler()
})

tagsBtn.addEventListener("click", () => {
  priorityPicker.classList.toggle("hidden")
  priorityPicker.classList.toggle("flex")
})
priorityPicker.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-priority]")
  if (btn) setPriority(btn.dataset.priority)
})
selectedChip.addEventListener("click", () => setPriority(null))

titleInput.addEventListener("input", updateSubmitState)
titleInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !submitBtn.disabled) submitBtn.click()
})

const listClickHandler = (e) => {
  const actionEl = e.target.closest("[data-action]")
  const card = actionEl?.closest("[data-id]")
  if (!card) return

  const todoId = card.dataset.id
  switch (actionEl.dataset.action) {
    case "menu":
      toggleMenu(card)
      break
    case "edit":
      openForm(allTodos.find((todo) => todo.id === todoId))
      break
    case "delete":
      deleteTodoHandler(todoId)
      break
  }
}

const listChangeHandler = (e) => {
  if (e.target.dataset.action !== "toggle") return
  completeTodoHandler(e.target.closest("[data-id]").dataset.id)
}

;[todosList, doneList].forEach((list) => {
  list.addEventListener("click", listClickHandler)
  list.addEventListener("change", listChangeHandler)
})

document.addEventListener("click", (e) => {
  if (!e.target.closest('[data-action="menu"], [data-menu]')) closeAllMenus()
})
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllMenus()
})



allTodos = loadTodos()
renderTodosHandler()
