// Core domain types for habit tracking

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 6 = Saturday

export type HabitCompletion = {
  readonly date: string; // ISO date format (YYYY-MM-DD)
  readonly completed: boolean;
};

export type Habit = {
  readonly id: string;
  readonly name: string;
  readonly createdAt: Date;
  readonly isArchived: boolean;
  readonly completions: readonly HabitCompletion[];
};

export type CreateHabitRequest = {
  readonly name: string;
};

export type WeekData = {
  readonly startDate: Date;
  readonly endDate: Date;
  readonly days: readonly Date[];
};

// Utility type for habit status in a week
export type HabitWeekStatus = {
  readonly habit: Habit;
  readonly weekCompletions: readonly (boolean | null)[]; // null = no data for that day
};
