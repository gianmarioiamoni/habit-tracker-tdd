'use client';

import { HabitWeekStatus } from '@/domain/habit/Habit';
import { HabitGridHeader } from './HabitGridHeader';
import { HabitRow } from './HabitRow';

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
            <HabitGridHeader dayLabels={dayLabels} weekDays={weekDays} />

            <div className="divide-y divide-gray-200">
                {habitsWeekStatus.map(({ habit, weekCompletions }) => (
                    <HabitRow
                        key={habit.id}
                        habit={habit}
                        weekCompletions={weekCompletions}
                        weekDays={weekDays}
                        dayLabels={dayLabels}
                        onToggleDay={onToggleDay}
                        onArchiveHabit={onArchiveHabit}
                    />
                ))}
            </div>
        </div>
    );
} 