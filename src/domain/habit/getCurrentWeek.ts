import { WeekData } from "./Habit";

export function getCurrentWeek(referenceDate?: Date): WeekData {
  const date = referenceDate || new Date();

  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = date.getDay();

  // Calculate days to subtract to get to Monday
  // If Sunday (0), subtract 6 days; if Monday (1), subtract 0 days, etc.
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  // Calculate the start of the week (Monday) using milliseconds approach
  const startDate = new Date(
    date.getTime() - daysToSubtract * 24 * 60 * 60 * 1000
  );
  startDate.setUTCHours(0, 0, 0, 0);

  // Calculate the end of the week (Sunday)
  const endDate = new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);
  endDate.setUTCHours(23, 59, 59, 999);

  // Generate all 7 days of the week
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    day.setUTCHours(0, 0, 0, 0);
    days.push(day);
  }

  return {
    startDate,
    endDate,
    days,
  };
}
