'use client';

import { HabitWeekStatus } from '@/domain/habit/Habit';
import { HabitDayCell } from './HabitDayCell';
import { formatDateToISO } from '@/domain/habit/utils';

interface HabitGridProps {
    habitsWeekStatus: HabitWeekStatus[];
    weekDays: readonly Date[];
    onToggleDay: (habitId: string, date: string) => void;
    onArchiveHabit: (habitId: string) => void;
}

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function HabitGrid({
    habitsWeekStatus,
    weekDays,
    onToggleDay,
    onArchiveHabit
}: HabitGridProps) {
    if (habitsWeekStatus.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">No habits yet</h3>
                <p className="text-gray-500">Add your first habit above to get started!</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header with day labels */}
            <div className="grid grid-cols-8 gap-4 p-4 bg-gray-50 border-b border-gray-200">
                <div className="font-medium text-gray-700">Habit</div>
                {dayLabels.map((label, index) => (
                    <div key={label} className="text-center">
                        <div className="text-sm font-medium text-gray-700">{label}</div>
                        <div className="text-xs text-gray-700 font-medium">{weekDays[index]?.getDate()}</div>
                    </div>
                ))}
            </div>

            {/* Habit rows */}
            <div className="divide-y divide-gray-200">
                {habitsWeekStatus.map(({ habit, weekCompletions }) => (
                    <div key={habit.id} className="grid grid-cols-8 gap-4 p-4 hover:bg-gray-50 transition-colors">
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
                ))}
            </div>
        </div>
    );
} 