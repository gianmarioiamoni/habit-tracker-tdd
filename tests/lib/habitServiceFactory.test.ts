import {
  createHabitServiceWithLocalStorage,
  createHabitServiceWithInMemory,
  createHabitServiceWithRepository,
} from "@/lib/habitServiceFactory";
import { createInMemoryHabitRepository } from "@/domain/habit/InMemoryHabitRepository";

describe("habitServiceFactory", () => {
  describe("createHabitServiceWithLocalStorage", () => {
    it("should create a habit service with localStorage repository", () => {
      const service = createHabitServiceWithLocalStorage();

      expect(service).toBeDefined();
      expect(typeof service.createHabit).toBe("function");
      expect(typeof service.getActiveHabits).toBe("function");
      expect(typeof service.toggleHabitCompletion).toBe("function");
      expect(typeof service.archiveHabit).toBe("function");
      expect(typeof service.getHabitsWeekStatus).toBe("function");
    });

    it("should create a service that can create habits", async () => {
      const service = createHabitServiceWithLocalStorage();

      const habit = await service.createHabit({ name: "Test Habit" });

      expect(habit.name).toBe("Test Habit");
      expect(habit.id).toBeDefined();
      expect(habit.isArchived).toBe(false);
    });
  });

  describe("createHabitServiceWithInMemory", () => {
    it("should create a habit service with in-memory repository", () => {
      const service = createHabitServiceWithInMemory();

      expect(service).toBeDefined();
      expect(typeof service.createHabit).toBe("function");
      expect(typeof service.getActiveHabits).toBe("function");
      expect(typeof service.toggleHabitCompletion).toBe("function");
      expect(typeof service.archiveHabit).toBe("function");
      expect(typeof service.getHabitsWeekStatus).toBe("function");
    });

    it("should create a service that can create and retrieve habits", async () => {
      const service = createHabitServiceWithInMemory();

      await service.createHabit({ name: "Memory Habit" });
      const habits = await service.getActiveHabits();

      expect(habits).toHaveLength(1);
      expect(habits[0].name).toBe("Memory Habit");
    });

    it("should create isolated service instances", async () => {
      const service1 = createHabitServiceWithInMemory();
      const service2 = createHabitServiceWithInMemory();

      await service1.createHabit({ name: "Service 1 Habit" });

      const habits1 = await service1.getActiveHabits();
      const habits2 = await service2.getActiveHabits();

      expect(habits1).toHaveLength(1);
      expect(habits2).toHaveLength(0);
    });
  });

  describe("createHabitServiceWithRepository", () => {
    it("should create a habit service with custom repository", () => {
      const repository = createInMemoryHabitRepository();
      const service = createHabitServiceWithRepository(repository);

      expect(service).toBeDefined();
      expect(typeof service.createHabit).toBe("function");
      expect(typeof service.getActiveHabits).toBe("function");
      expect(typeof service.toggleHabitCompletion).toBe("function");
      expect(typeof service.archiveHabit).toBe("function");
      expect(typeof service.getHabitsWeekStatus).toBe("function");
    });

    it("should use the provided repository", async () => {
      const repository = createInMemoryHabitRepository();
      const service = createHabitServiceWithRepository(repository);

      // Add a habit directly to the repository
      await repository.save({
        id: "test-id",
        name: "Direct Habit",
        createdAt: new Date(),
        isArchived: false,
        completions: [],
      });

      const habits = await service.getActiveHabits();

      expect(habits).toHaveLength(1);
      expect(habits[0].name).toBe("Direct Habit");
    });
  });
});
