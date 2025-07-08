import { toggleHabitDay } from "@/domain/habit/toggleHabitDay";
import { Habit } from "@/domain/habit/Habit";

describe("toggleHabitDay", () => {
  const mockHabit: Habit = {
    id: "habit-1",
    name: "Read daily",
    createdAt: new Date("2024-01-01"),
    isArchived: false,
    completions: [
      { date: "2024-01-01", completed: true },
      { date: "2024-01-02", completed: false },
    ],
  };

  it("should mark day as completed when not previously completed", () => {
    const result = toggleHabitDay(mockHabit, "2024-01-03");

    expect(result.completions).toContainEqual({
      date: "2024-01-03",
      completed: true,
    });
    expect(result.completions).toHaveLength(3);
  });

  it("should toggle existing completion from true to false", () => {
    const result = toggleHabitDay(mockHabit, "2024-01-01");

    const completion = result.completions.find((c) => c.date === "2024-01-01");
    expect(completion?.completed).toBe(false);
  });

  it("should toggle existing completion from false to true", () => {
    const result = toggleHabitDay(mockHabit, "2024-01-02");

    const completion = result.completions.find((c) => c.date === "2024-01-02");
    expect(completion?.completed).toBe(true);
  });

  it("should preserve all other habit properties", () => {
    const result = toggleHabitDay(mockHabit, "2024-01-03");

    expect(result.id).toBe(mockHabit.id);
    expect(result.name).toBe(mockHabit.name);
    expect(result.createdAt).toBe(mockHabit.createdAt);
    expect(result.isArchived).toBe(mockHabit.isArchived);
  });

  it("should throw error for invalid date format", () => {
    expect(() => toggleHabitDay(mockHabit, "invalid-date")).toThrow(
      "Invalid date format. Expected YYYY-MM-DD"
    );
  });

  it("should throw error for future dates", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateString = futureDate.toISOString().split("T")[0];

    expect(() => toggleHabitDay(mockHabit, futureDateString)).toThrow(
      "Cannot mark future dates as completed"
    );
  });

  it("should not mutate the original habit", () => {
    const originalCompletions = [...mockHabit.completions];

    toggleHabitDay(mockHabit, "2024-01-03");

    expect(mockHabit.completions).toEqual(originalCompletions);
  });
});
