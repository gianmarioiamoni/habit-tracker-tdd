import { createHabit } from "@/domain/habit/createHabit";
import { CreateHabitRequest } from "@/domain/habit/Habit";

describe("createHabit", () => {
  it("should create a habit with valid name", () => {
    const request: CreateHabitRequest = { name: "Read daily" };

    const habit = createHabit(request);

    expect(habit.name).toBe("Read daily");
    expect(habit.id).toBeDefined();
    expect(habit.id.length).toBeGreaterThan(0);
    expect(habit.createdAt).toBeInstanceOf(Date);
    expect(habit.isArchived).toBe(false);
    expect(habit.completions).toEqual([]);
  });

  it("should create habits with unique IDs", () => {
    const request: CreateHabitRequest = { name: "Exercise" };

    const habit1 = createHabit(request);
    const habit2 = createHabit(request);

    expect(habit1.id).not.toBe(habit2.id);
  });

  it("should throw error for empty name", () => {
    const request: CreateHabitRequest = { name: "" };

    expect(() => createHabit(request)).toThrow("Habit name cannot be empty");
  });

  it("should throw error for whitespace-only name", () => {
    const request: CreateHabitRequest = { name: "   " };

    expect(() => createHabit(request)).toThrow("Habit name cannot be empty");
  });

  it("should throw error for name longer than 100 characters", () => {
    const longName = "a".repeat(101);
    const request: CreateHabitRequest = { name: longName };

    expect(() => createHabit(request)).toThrow(
      "Habit name cannot exceed 100 characters"
    );
  });

  it("should trim whitespace from habit name", () => {
    const request: CreateHabitRequest = { name: "  Read daily  " };

    const habit = createHabit(request);

    expect(habit.name).toBe("Read daily");
  });
});
