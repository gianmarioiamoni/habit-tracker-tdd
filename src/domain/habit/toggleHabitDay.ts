import { Habit, HabitCompletion } from "./Habit";
import { isValidDateFormat, isDateInFuture } from "./utils";

export function toggleHabitDay(habit: Habit, date: string): Habit {
  if (!isValidDateFormat(date)) {
    throw new Error("Invalid date format. Expected YYYY-MM-DD");
  }

  if (isDateInFuture(date)) {
    throw new Error("Cannot mark future dates as completed");
  }

  const existingCompletion = habit.completions.find((c) => c.date === date);

  let newCompletions: HabitCompletion[];

  if (existingCompletion) {
    // Toggle existing completion
    newCompletions = habit.completions.map((completion) =>
      completion.date === date
        ? { ...completion, completed: !completion.completed }
        : completion
    );
  } else {
    // Add new completion
    newCompletions = [...habit.completions, { date, completed: true }];
  }

  return {
    ...habit,
    completions: newCompletions,
  };
}
