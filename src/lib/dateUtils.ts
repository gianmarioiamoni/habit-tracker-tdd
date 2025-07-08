import { WeekData } from "@/domain/habit/Habit";

/**
 * Formats a week range into a readable string format
 * @param weekData - The week data containing start and end dates
 * @returns Formatted string like "Jul 7 - Jul 14, 2025"
 */
export const formatWeekRange = (weekData: WeekData): string => {
  const start = weekData.startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const end = weekData.endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${start} - ${end}`;
};

/**
 * Formats a date into a short weekday string
 * @param date - The date to format
 * @returns Short weekday string like "Mon", "Tue", etc.
 */
export const formatShortWeekday = (date: Date): string => {
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

/**
 * Formats a date for display purposes
 * @param date - The date to format
 * @returns Formatted date string like "Jul 7, 2025"
 */
export const formatDisplayDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
