const sidebar = document.querySelector("aside")
const openSidebarBtn = document.querySelector('header button[aria-label="منو"]')
const closeSidebarBtn = document.querySelector(".sidebar-header button")

const overlay = document.createElement("div")
overlay.className = "fixed inset-0 z-40 hidden bg-black/50 md:hidden"
document.body.append(overlay)

const MOBILE_OPEN_CLASSES = [
  "max-md:fixed",
  "max-md:inset-y-0",
  "max-md:right-0",
  "max-md:z-50",
  "max-md:flex",
]

const openSidebar = () => {
  sidebar.classList.remove("hidden")
  sidebar.classList.add(...MOBILE_OPEN_CLASSES)
  overlay.classList.remove("hidden")
  document.body.classList.add("overflow-hidden")
}

const closeSidebar = () => {
  sidebar.classList.remove(...MOBILE_OPEN_CLASSES)
  sidebar.classList.add("hidden")
  overlay.classList.add("hidden")
  document.body.classList.remove("overflow-hidden")
}

openSidebarBtn.addEventListener("click", openSidebar)
closeSidebarBtn.addEventListener("click", closeSidebar)
overlay.addEventListener("click", closeSidebar)

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebar()
})

window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
  if (e.matches) closeSidebar()
})