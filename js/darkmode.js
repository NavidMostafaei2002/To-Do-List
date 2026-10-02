const THEME_KEY = "quera-theme"
const lightBtn = document.getElementById("light-btn")
const darkBtn = document.getElementById("dark-btn")

const ACTIVE_CLASSES = [
  "bg-[var(--bg-primary)]",
  "text-[var(--color-primary)]",
  "shadow-sm",
]

const INACTIVE_CLASSES = ["text-[var(--color-primary-muted)]"]

const setActiveButton = (btn, isActive) => {
  btn.classList.remove(...(isActive ? INACTIVE_CLASSES : ACTIVE_CLASSES))
  btn.classList.add(...(isActive ? ACTIVE_CLASSES : INACTIVE_CLASSES))
}

const applyTheme = (theme) => {
  const isDark = theme === "dark"
  document.documentElement.classList.toggle("dark", isDark)
  setActiveButton(lightBtn, !isDark)
  setActiveButton(darkBtn, isDark)
  localStorage.setItem(THEME_KEY, theme)
}

lightBtn.addEventListener("click", () => applyTheme("light"))
darkBtn.addEventListener("click", () => applyTheme("dark"))

applyTheme(localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light")