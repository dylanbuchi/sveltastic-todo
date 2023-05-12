export function formatDateISO(date: Date) {
  return date?.toISOString().slice(0, 10);
}

export function isDateInPast(date: Date) {
  return date.getTime() < Date.now();
}

export function isDateOlderThanOneDay(date: Date) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let diff = today.getTime() - date.getTime();

  let days = diff / (1000 * 60 * 60 * 24); // convert the difference to days

  return days >= 1;
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
