import { Habit } from "./Habit";
import { HabitRepository } from "./HabitRepository";

type InMemoryHabitRepositoryType = HabitRepository & {
  clear(): void;
};

export const createInMemoryHabitRepository =
  (): InMemoryHabitRepositoryType => {
    let habits: Habit[] = [];

    const save = async (habit: Habit): Promise<void> => {
      const existingIndex = habits.findIndex((h) => h.id === habit.id);

      if (existingIndex >= 0) {
        habits[existingIndex] = habit;
      } else {
        habits.push(habit);
      }
    };

    const findById = async (id: string): Promise<Habit | null> => {
      return habits.find((habit) => habit.id === id) || null;
    };

    const findAll = async (): Promise<Habit[]> => {
      return [...habits];
    };

    const findActive = async (): Promise<Habit[]> => {
      return habits.filter((habit) => !habit.isArchived);
    };

    const findArchived = async (): Promise<Habit[]> => {
      return habits.filter((habit) => habit.isArchived);
    };

    const deleteHabit = async (id: string): Promise<void> => {
      habits = habits.filter((habit) => habit.id !== id);
    };

    // Utility method for testing
    const clear = (): void => {
      habits = [];
    };

    return {
      save,
      findById,
      findAll,
      findActive,
      findArchived,
      delete: deleteHabit,
      clear,
    };
  };
