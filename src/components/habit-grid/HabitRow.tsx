import { Habit } from '@/domain/habit/Habit';
import { HabitDayCell } from './HabitDayCell';
import { formatDateToISO } from '@/domain/habit/utils';

export interface HabitRowProps {
    habit: Habit;
    weekCompletions: readonly (boolean | null)[];
    weekDays: readonly Date[];
    dayLabels: readonly string[];
    onToggleDay: (habitId: string, date: string) => void;
    onArchiveHabit: (habitId: string) => void;
}

/**
 * Row component representing a single habit with day cells and actions
 * Follows SOLID principles with single responsibility for habit row rendering
 */
export const HabitRow = ({
    habit,
    weekCompletions,
    weekDays,
    dayLabels,
    onToggleDay,
    onArchiveHabit
}: HabitRowProps) => {
    return (
        <div className="grid grid-cols-8 gap-4 p-4 hover:bg-gray-50 transition-colors">
            {/* Habit name and actions */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-medium text-gray-900 truncate" title={habit.name}>
                        {habit.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                        Created {habit.createdAt.toLocaleDateString()}
                    </p>
                </div>
                <button
                    onClick={() => onArchiveHabit(habit.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                    title="Archive habit"
                >
                    🗂️
                </button>
            </div>

            {/* Day cells */}
            {weekDays.map((date, dayIndex) => (
                <HabitDayCell
                    key={date.toISOString()}
                    completed={weekCompletions[dayIndex]}
                    date={date}
                    dayLabel={dayLabels[dayIndex]}
                    onClick={() => onToggleDay(habit.id, formatDateToISO(date))}
                />
            ))}
        </div>
    );
}; 