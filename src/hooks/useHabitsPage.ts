import { useState, useEffect, useCallback } from "react";
import { HabitWeekStatus } from "@/domain/habit/Habit";
import { getCurrentWeek } from "@/domain/habit/getCurrentWeek";
import { HabitServiceType } from "@/domain/habit/HabitService";

export type UseHabitsPageReturn = {
  // State
  habitsWeekStatus: HabitWeekStatus[];
  isLoading: boolean;
  currentWeek: ReturnType<typeof getCurrentWeek>;
  error: string | null;
  successMessage: string | null;

  // Actions
  loadHabits: () => Promise<void>;
  handleCreateHabit: (name: string) => Promise<void>;
  handleToggleDay: (habitId: string, date: string) => Promise<void>;
  handleArchiveHabit: (habitId: string) => Promise<void>;
  handleWeekNavigation: (direction: "prev" | "next") => Promise<void>;
  goToCurrentWeek: () => Promise<void>;
  dismissError: () => void;
  dismissSuccess: () => void;
};

/**
 * Custom hook for managing habits page state and operations
 * @param habitService - The habit service instance to use
 * @returns Object containing state and action handlers
 */
export const useHabitsPage = (
  habitService: HabitServiceType
): UseHabitsPageReturn => {
  const [habitsWeekStatus, setHabitsWeekStatus] = useState<HabitWeekStatus[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadHabits = useCallback(async () => {
    try {
      const weekStatus = await habitService.getHabitsWeekStatus();
      setHabitsWeekStatus(weekStatus);
    } catch (error) {
      console.error("Error loading habits:", error);
    }
  }, [habitService]);

  const handleCreateHabit = useCallback(
    async (name: string) => {
      setIsLoading(true);
      setError(null);
      setSuccessMessage(null);
      try {
        await habitService.createHabit({ name });
        await loadHabits(); // Reload to show new habit
        setSuccessMessage(`Habit "${name}" created successfully!`);
        // Auto-dismiss success message after 3 seconds
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (error) {
        console.error("Error creating habit:", error);
        setError("Failed to create habit. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [habitService, loadHabits]
  );

  const handleToggleDay = useCallback(
    async (habitId: string, date: string) => {
      setError(null);
      try {
        await habitService.toggleHabitCompletion(habitId, date);
        await loadHabits(); // Reload to show updated status
      } catch (error) {
        console.error("Error toggling habit completion:", error);
        if (error instanceof Error) {
          if (error.message.includes("future dates")) {
            setError("Cannot mark future dates as completed.");
          } else if (error.message.includes("Invalid date format")) {
            setError("Invalid date format.");
          } else {
            setError("Failed to update habit. Please try again.");
          }
        } else {
          setError("Failed to update habit. Please try again.");
        }
      }
    },
    [habitService, loadHabits]
  );

  const handleArchiveHabit = useCallback(
    async (habitId: string) => {
      if (confirm("Are you sure you want to archive this habit?")) {
        setError(null);
        try {
          await habitService.archiveHabit(habitId);
          await loadHabits(); // Reload to remove archived habit
        } catch (error) {
          console.error("Error archiving habit:", error);
          setError("Failed to archive habit. Please try again.");
        }
      }
    },
    [habitService, loadHabits]
  );

  const handleWeekNavigation = useCallback(
    async (direction: "prev" | "next") => {
      const currentDate = currentWeek.startDate;
      const newDate = new Date(currentDate);

      if (direction === "prev") {
        newDate.setDate(currentDate.getDate() - 7);
      } else {
        newDate.setDate(currentDate.getDate() + 7);
      }

      const newWeek = getCurrentWeek(newDate);
      setCurrentWeek(newWeek);

      try {
        const weekStatus = await habitService.getHabitsWeekStatus(newDate);
        setHabitsWeekStatus(weekStatus);
      } catch (error) {
        console.error("Error loading week data:", error);
      }
    },
    [habitService, currentWeek]
  );

  const goToCurrentWeek = useCallback(async () => {
    const thisWeek = getCurrentWeek();
    setCurrentWeek(thisWeek);
    await loadHabits();
  }, [loadHabits]);

  const dismissError = useCallback(() => {
    setError(null);
  }, []);

  const dismissSuccess = useCallback(() => {
    setSuccessMessage(null);
  }, []);

  // Load habits on hook initialization
  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  return {
    // State
    habitsWeekStatus,
    isLoading,
    currentWeek,
    error,
    successMessage,

    // Actions
    loadHabits,
    handleCreateHabit,
    handleToggleDay,
    handleArchiveHabit,
    handleWeekNavigation,
    goToCurrentWeek,
    dismissError,
    dismissSuccess,
  };
};
