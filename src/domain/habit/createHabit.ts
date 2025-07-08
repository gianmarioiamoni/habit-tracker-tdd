import { Habit, CreateHabitRequest } from "./Habit";
import { generateId } from "./utils";

export function createHabit(request: CreateHabitRequest): Habit {
  const trimmedName = request.name.trim();

  if (trimmedName === "") {
    throw new Error("Habit name cannot be empty");
  }

  if (trimmedName.length > 100) {
    throw new Error("Habit name cannot exceed 100 characters");
  }

  return {
    id: generateId(),
    name: trimmedName,
    createdAt: new Date(),
    isArchived: false,
    completions: [],
  };
}
