export function toInternationalDateFormat(date: number | Date): string {
  return new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function checkDateisValid(date?: unknown): date is Date {
  return date instanceof Date && !isNaN(Number(date));
}
