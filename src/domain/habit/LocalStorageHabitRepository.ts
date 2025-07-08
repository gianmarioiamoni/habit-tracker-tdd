import { Habit } from "./Habit";
import { HabitRepository } from "./HabitRepository";

const STORAGE_KEY = "habit-tracker-habits";

export class LocalStorageHabitRepository implements HabitRepository {
  private getStoredHabits(): Habit[] {
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
  }

  private saveHabits(habits: Habit[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch (error) {
      console.error("Error saving habits to localStorage:", error);
    }
  }

  async save(habit: Habit): Promise<void> {
    const habits = this.getStoredHabits();
    const existingIndex = habits.findIndex((h) => h.id === habit.id);

    if (existingIndex >= 0) {
      habits[existingIndex] = habit;
    } else {
      habits.push(habit);
    }

    this.saveHabits(habits);
  }

  async findById(id: string): Promise<Habit | null> {
    const habits = this.getStoredHabits();
    return habits.find((habit) => habit.id === id) || null;
  }

  async findAll(): Promise<Habit[]> {
    return this.getStoredHabits();
  }

  async findActive(): Promise<Habit[]> {
    const habits = this.getStoredHabits();
    return habits.filter((habit) => !habit.isArchived);
  }

  async findArchived(): Promise<Habit[]> {
    const habits = this.getStoredHabits();
    return habits.filter((habit) => habit.isArchived);
  }

  async delete(id: string): Promise<void> {
    const habits = this.getStoredHabits();
    const filtered = habits.filter((habit) => habit.id !== id);
    this.saveHabits(filtered);
  }
}
