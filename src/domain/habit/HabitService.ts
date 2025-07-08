import { Habit, CreateHabitRequest, HabitWeekStatus, WeekData } from "./Habit";
import { HabitRepository } from "./HabitRepository";
import { createHabit } from "./createHabit";
import { toggleHabitDay } from "./toggleHabitDay";
import { getCurrentWeek } from "./getCurrentWeek";
import { formatDateToISO } from "./utils";

export class HabitService {
  constructor(private repository: HabitRepository) {}

  async createHabit(request: CreateHabitRequest): Promise<Habit> {
    const habit = createHabit(request);
    await this.repository.save(habit);
    return habit;
  }

  async getActiveHabits(): Promise<Habit[]> {
    return this.repository.findActive();
  }

  async getArchivedHabits(): Promise<Habit[]> {
    return this.repository.findArchived();
  }

  async toggleHabitCompletion(
    habitId: string,
    date: string
  ): Promise<Habit | null> {
    const habit = await this.repository.findById(habitId);
    if (!habit) return null;

    const updatedHabit = toggleHabitDay(habit, date);
    await this.repository.save(updatedHabit);
    return updatedHabit;
  }

  async archiveHabit(habitId: string): Promise<Habit | null> {
    const habit = await this.repository.findById(habitId);
    if (!habit) return null;

    const archivedHabit = { ...habit, isArchived: true };
    await this.repository.save(archivedHabit);
    return archivedHabit;
  }

  async unarchiveHabit(habitId: string): Promise<Habit | null> {
    const habit = await this.repository.findById(habitId);
    if (!habit) return null;

    const unarchivedHabit = { ...habit, isArchived: false };
    await this.repository.save(unarchivedHabit);
    return unarchivedHabit;
  }

  async deleteHabit(habitId: string): Promise<void> {
    await this.repository.delete(habitId);
  }

  async getHabitsWeekStatus(referenceDate?: Date): Promise<HabitWeekStatus[]> {
    const habits = await this.getActiveHabits();
    const weekData = getCurrentWeek(referenceDate);

    return habits.map((habit) => this.mapHabitToWeekStatus(habit, weekData));
  }

  private mapHabitToWeekStatus(
    habit: Habit,
    weekData: WeekData
  ): HabitWeekStatus {
    const weekCompletions = weekData.days.map((day) => {
      const dateString = formatDateToISO(day);
      const completion = habit.completions.find((c) => c.date === dateString);
      return completion ? completion.completed : null;
    });

    return {
      habit,
      weekCompletions,
    };
  }
}
