import { Habit, CreateHabitRequest, HabitWeekStatus, WeekData } from "./Habit";
import { HabitRepository } from "./HabitRepository";
import { createHabit } from "./createHabit";
import { toggleHabitDay } from "./toggleHabitDay";
import { getCurrentWeek } from "./getCurrentWeek";
import { formatDateToISO } from "./utils";

export type HabitServiceType = {
  createHabit(request: CreateHabitRequest): Promise<Habit>;
  getActiveHabits(): Promise<Habit[]>;
  getArchivedHabits(): Promise<Habit[]>;
  toggleHabitCompletion(habitId: string, date: string): Promise<Habit | null>;
  archiveHabit(habitId: string): Promise<Habit | null>;
  unarchiveHabit(habitId: string): Promise<Habit | null>;
  deleteHabit(habitId: string): Promise<void>;
  getHabitsWeekStatus(referenceDate?: Date): Promise<HabitWeekStatus[]>;
};

export const createHabitService = (
  repository: HabitRepository
): HabitServiceType => {
  const mapHabitToWeekStatus = (
    habit: Habit,
    weekData: WeekData
  ): HabitWeekStatus => {
    const weekCompletions = weekData.days.map((day) => {
      const dateString = formatDateToISO(day);
      const completion = habit.completions.find((c) => c.date === dateString);
      return completion ? completion.completed : null;
    });

    return {
      habit,
      weekCompletions,
    };
  };

  const createHabitFn = async (request: CreateHabitRequest): Promise<Habit> => {
    const habit = createHabit(request);
    await repository.save(habit);
    return habit;
  };

  const getActiveHabits = async (): Promise<Habit[]> => {
    return repository.findActive();
  };

  const getArchivedHabits = async (): Promise<Habit[]> => {
    return repository.findArchived();
  };

  const toggleHabitCompletion = async (
    habitId: string,
    date: string
  ): Promise<Habit | null> => {
    const habit = await repository.findById(habitId);
    if (!habit) return null;

    const updatedHabit = toggleHabitDay(habit, date);
    await repository.save(updatedHabit);
    return updatedHabit;
  };

  const archiveHabit = async (habitId: string): Promise<Habit | null> => {
    const habit = await repository.findById(habitId);
    if (!habit) return null;

    const archivedHabit = { ...habit, isArchived: true };
    await repository.save(archivedHabit);
    return archivedHabit;
  };

  const unarchiveHabit = async (habitId: string): Promise<Habit | null> => {
    const habit = await repository.findById(habitId);
    if (!habit) return null;

    const unarchivedHabit = { ...habit, isArchived: false };
    await repository.save(unarchivedHabit);
    return unarchivedHabit;
  };

  const deleteHabit = async (habitId: string): Promise<void> => {
    await repository.delete(habitId);
  };

  const getHabitsWeekStatus = async (
    referenceDate?: Date
  ): Promise<HabitWeekStatus[]> => {
    const habits = await getActiveHabits();
    const weekData = getCurrentWeek(referenceDate);

    return habits.map((habit) => mapHabitToWeekStatus(habit, weekData));
  };

  return {
    createHabit: createHabitFn,
    getActiveHabits,
    getArchivedHabits,
    toggleHabitCompletion,
    archiveHabit,
    unarchiveHabit,
    deleteHabit,
    getHabitsWeekStatus,
  };
};
