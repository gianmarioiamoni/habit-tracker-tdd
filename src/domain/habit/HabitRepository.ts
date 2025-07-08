import { Habit } from "./Habit";

// Repository interface following Dependency Inversion Principle
export interface HabitRepository {
  save(habit: Habit): Promise<void>;
  findById(id: string): Promise<Habit | null>;
  findAll(): Promise<Habit[]>;
  findActive(): Promise<Habit[]>;
  findArchived(): Promise<Habit[]>;
  delete(id: string): Promise<void>;
}
