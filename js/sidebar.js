const sidebar = document.querySelector("aside")
const openSidebarBtn = document.querySelector('header button[aria-label="منو"]')
const closeSidebarBtn = document.querySelector(".sidebar-header button")
const logoutBtn = document.querySelector(".sidebar-bottom")

const overlay = document.createElement("div")
overlay.className = "fixed inset-0 z-40 bg-black/50 opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out md:hidden"
document.body.append(overlay)

const openSidebar = () => {
  sidebar.classList.remove("hidden")
  sidebar.classList.remove("max-md:translate-x-full")

  overlay.classList.add("opacity-100", "pointer-events-auto")
  
  document.body.classList.add("overflow-hidden")
}

const closeSidebar = () => {
 sidebar.classList.add("max-md:translate-x-full")
  
  overlay.classList.remove("opacity-100", "pointer-events-auto")
  
  document.body.classList.remove("overflow-hidden")
}

openSidebarBtn?.addEventListener("click", openSidebar)
closeSidebarBtn?.addEventListener("click", closeSidebar)
overlay.addEventListener("click", closeSidebar)

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebar()
})

window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
  if (e.matches) closeSidebar()
})

logoutBtn?.addEventListener("click", () => {
  if (!confirm("می‌خواهید از حساب خود خارج شوید؟")) return
  window.location.href = "./login.html"
})