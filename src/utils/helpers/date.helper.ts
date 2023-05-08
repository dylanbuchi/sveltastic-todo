export function formatDateISO(date: Date) {
  return date?.toISOString().slice(0, 10);
}

export function isDateInPast(date: Date) {
  return date.getTime() < Date.now();
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
