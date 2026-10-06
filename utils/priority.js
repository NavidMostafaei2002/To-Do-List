
const CHIP_BASE_CLASS =
  "inline-flex items-center gap-1 rounded-md px-2 py-px text-[11px]"

const PRIORITIES = {
  high: {
    label: "بالا",
    chip: "bg-[var(--color-secondary-red)] text-[var(--color-primary-red)]",
    bar: "after:bg-[var(--color-primary-red)]",
  },
  medium: {
    label: "متوسط",
    chip: "bg-[var(--color-secondary-yellow)] text-[var(--color-primary-yellow)]",
    bar: "after:bg-[var(--color-primary-yellow)]",
  },
  low: {
    label: "پایین",
    chip: "bg-[var(--color-secondary-green)] text-[var(--color-primary-green)]",
    bar: "after:bg-[var(--color-primary-green)]",
  },
}

const getPriority = (key) => PRIORITIES[key] ?? PRIORITIES.low