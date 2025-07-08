import { Habit } from "./Habit";
import { HabitRepository } from "./HabitRepository";

const STORAGE_KEY = "habit-tracker-habits";

export const createLocalStorageHabitRepository = (): HabitRepository => {
  const getStoredHabits = (): Habit[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);

      // Convert date strings back to Date objects
      return parsed.map((habit: any) => ({
        ...habit,
        createdAt: new Date(habit.createdAt),
      }));
    } catch (error) {
      console.error("Error reading habits from localStorage:", error);
      return [];
    }
  };

  const saveHabits = (habits: Habit[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error("Error saving habits to localStorage:", error);
    }
  };

  const save = async (habit: Habit): Promise<void> => {
    const habits = getStoredHabits();
    const existingIndex = habits.findIndex((h) => h.id === habit.id);

    if (existingIndex >= 0) {
      habits[existingIndex] = habit;
    } else {
      habits.push(habit);
    }

    saveHabits(habits);
  };

  const findById = async (id: string): Promise<Habit | null> => {
    const habits = getStoredHabits();
    return habits.find((habit) => habit.id === id) || null;
  };

  const findAll = async (): Promise<Habit[]> => {
    return getStoredHabits();
  };

  const findActive = async (): Promise<Habit[]> => {
    const habits = getStoredHabits();
    return habits.filter((habit) => !habit.isArchived);
  };

  const findArchived = async (): Promise<Habit[]> => {
    const habits = getStoredHabits();
    return habits.filter((habit) => habit.isArchived);
  };

  const deleteHabit = async (id: string): Promise<void> => {
    const habits = getStoredHabits();
    const filtered = habits.filter((habit) => habit.id !== id);
    saveHabits(filtered);
  };

  return {
    save,
    findById,
    findAll,
    findActive,
    findArchived,
    delete: deleteHabit,
  };
};
