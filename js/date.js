const getTodayJalali = () => {
  const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(new Date())

  const get = (type) => parts.find((p) => p.type === type)?.value ?? ""
  return `${get("weekday")}، ${get("day")} ${get("month")} ${get("year")}`
}

const renderDate = () => {
  const today = getTodayJalali()
  const sidebarDate = document.getElementById("sidebar-date")
  const mobileDate = document.getElementById("mobile-date")

  if (sidebarDate) sidebarDate.textContent = today
  if (mobileDate) mobileDate.textContent = `امروز، ${today}`
}

renderDate()