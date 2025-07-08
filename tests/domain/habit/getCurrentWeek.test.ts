import { getCurrentWeek } from "@/domain/habit/getCurrentWeek";

describe("getCurrentWeek", () => {
  it("should return current week starting from Monday", () => {
    // Wednesday, January 3, 2024 (middle of week)
    const testDate = new Date("2024-01-03");

    const weekData = getCurrentWeek(testDate);

    // Week should start on Monday, January 1, 2024
    expect(weekData.startDate.toISOString().split("T")[0]).toBe("2024-01-01");
    // Week should end on Sunday, January 7, 2024
    expect(weekData.endDate.toISOString().split("T")[0]).toBe("2024-01-07");
    expect(weekData.days).toHaveLength(7);
  });

  it("should return week starting from Monday when date is Sunday", () => {
    // Sunday, January 7, 2024
    const testDate = new Date("2024-01-07");

    const weekData = getCurrentWeek(testDate);

    // Week should start on Monday, January 1, 2024
    expect(weekData.startDate.toISOString().split("T")[0]).toBe("2024-01-01");
    expect(weekData.endDate.toISOString().split("T")[0]).toBe("2024-01-07");
  });

  it("should return week starting from Monday when date is Monday", () => {
    // Monday, January 1, 2024
    const testDate = new Date("2024-01-01");

    const weekData = getCurrentWeek(testDate);

    expect(weekData.startDate.toISOString().split("T")[0]).toBe("2024-01-01");
    expect(weekData.endDate.toISOString().split("T")[0]).toBe("2024-01-07");
  });

  it("should return all seven days of the week in correct order", () => {
    const testDate = new Date("2024-01-03");

    const weekData = getCurrentWeek(testDate);

    const expectedDates = [
      "2024-01-01", // Monday
      "2024-01-02", // Tuesday
      "2024-01-03", // Wednesday
      "2024-01-04", // Thursday
      "2024-01-05", // Friday
      "2024-01-06", // Saturday
      "2024-01-07", // Sunday
    ];

    weekData.days.forEach((day, index) => {
      expect(day.toISOString().split("T")[0]).toBe(expectedDates[index]);
    });
  });

  it("should handle edge case across month boundary", () => {
    // Wednesday, January 31, 2024
    const testDate = new Date("2024-01-31");

    const weekData = getCurrentWeek(testDate);

    // Week should start on Monday, January 29, 2024
    expect(weekData.startDate.toISOString().split("T")[0]).toBe("2024-01-29");
    // Week should end on Sunday, February 4, 2024
    expect(weekData.endDate.toISOString().split("T")[0]).toBe("2024-02-04");
  });

  it("should use current date when no date provided", () => {
    const weekData = getCurrentWeek();

    expect(weekData.startDate).toBeInstanceOf(Date);
    expect(weekData.endDate).toBeInstanceOf(Date);
    expect(weekData.days).toHaveLength(7);

    // Verify it's actually this week
    const now = new Date();
    const daysDiff =
      Math.abs(weekData.days[3].getTime() - now.getTime()) /
      (1000 * 60 * 60 * 24);
    expect(daysDiff).toBeLessThan(7); // Should be within the current week
  });
});
