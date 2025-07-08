import { Habit } from "./Habit";
import { HabitRepository } from "./HabitRepository";

export class InMemoryHabitRepository implements HabitRepository {
  private habits: Habit[] = [];

  async save(habit: Habit): Promise<void> {
    const existingIndex = this.habits.findIndex((h) => h.id === habit.id);

    if (existingIndex >= 0) {
      this.habits[existingIndex] = habit;
    } else {
      this.habits.push(habit);
    }
  }

  async findById(id: string): Promise<Habit | null> {
    return this.habits.find((habit) => habit.id === id) || null;
  }

  async findAll(): Promise<Habit[]> {
    return [...this.habits];
  }

  async findActive(): Promise<Habit[]> {
    return this.habits.filter((habit) => !habit.isArchived);
  }

  async findArchived(): Promise<Habit[]> {
    return this.habits.filter((habit) => habit.isArchived);
  }

  async delete(id: string): Promise<void> {
    this.habits = this.habits.filter((habit) => habit.id !== id);
  }

  // Utility method for testing
  clear(): void {
    this.habits = [];
  }
}
