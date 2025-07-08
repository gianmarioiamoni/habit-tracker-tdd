// Utility functions for habit domain

export function generateId(): string {
  return "habit_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

export function isValidDateFormat(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) {
    return false;
  }

  const date = new Date(dateString);
  return (
    date instanceof Date &&
    !isNaN(date.getTime()) &&
    date.toISOString().split("T")[0] === dateString
  );
}

export function isDateInFuture(dateString: string): boolean {
  const [year, month, day] = dateString.split("-").map(Number);
  const inputDate = new Date(year, month - 1, day); // month is 0-indexed

  const today = new Date();
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return inputDate > todayDate;
}

export function formatDateToISO(date: Date): string {
  return date.toISOString().split("T")[0];
}
