import {
  createHabitService,
  HabitServiceType,
} from "@/domain/habit/HabitService";
import { createLocalStorageHabitRepository } from "@/domain/habit/LocalStorageHabitRepository";
import { createInMemoryHabitRepository } from "@/domain/habit/InMemoryHabitRepository";
import { HabitRepository } from "@/domain/habit/HabitRepository";

/**
 * Creates a habit service with localStorage persistence
 * @returns Configured habit service
 */
export const createHabitServiceWithLocalStorage = (): HabitServiceType => {
  const repository = createLocalStorageHabitRepository();
  return createHabitService(repository);
};

/**
 * Creates a habit service with in-memory storage (for testing)
 * @returns Configured habit service with in-memory repository
 */
export const createHabitServiceWithInMemory = (): HabitServiceType => {
  const repository = createInMemoryHabitRepository();
  return createHabitService(repository);
};

/**
 * Creates a habit service with custom repository
 * @param repository - Custom repository implementation
 * @returns Configured habit service
 */
export const createHabitServiceWithRepository = (
  repository: HabitRepository
): HabitServiceType => {
  return createHabitService(repository);
};
