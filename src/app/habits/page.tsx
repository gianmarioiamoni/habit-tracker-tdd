'use client';

import { HabitForm } from '@/components/HabitForm';
import { HabitGrid } from '@/components/HabitGrid';
import { useHabitsPage } from '@/hooks/useHabitsPage';
import { createHabitServiceWithLocalStorage } from '@/lib/habitServiceFactory';
import { formatWeekRange } from '@/lib/dateUtils';

// Initialize service with localStorage repository
const habitService = createHabitServiceWithLocalStorage();

export default function HabitsPage() {
    const {
        habitsWeekStatus,
        isLoading,
        currentWeek,
        error,
        successMessage,
        handleCreateHabit,
        handleToggleDay,
        handleArchiveHabit,
        handleWeekNavigation,
        goToCurrentWeek,
        dismissError,
        dismissSuccess,
    } = useHabitsPage(habitService);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Habit Tracker
                    </h1>
                    <p className="text-gray-600">
                        Track your daily habits and build consistency
                    </p>
                </div>

                {/* Success notification */}
                {successMessage && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="text-green-600 mr-3">✅</div>
                            <p className="text-green-800">{successMessage}</p>
                        </div>
                        <button
                            onClick={dismissSuccess}
                            className="text-green-600 hover:text-green-800 transition-colors"
                            title="Dismiss notification"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Error notification */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="text-red-600 mr-3">⚠️</div>
                            <p className="text-red-800">{error}</p>
                        </div>
                        <button
                            onClick={dismissError}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Dismiss error"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Add new habit form */}
                <HabitForm onSubmit={handleCreateHabit} isLoading={isLoading} />

                {/* Week navigation */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => handleWeekNavigation('prev')}
                            className="flex items-center px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            ← Previous Week
                        </button>
                        <button
                            onClick={goToCurrentWeek}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            This Week
                        </button>
                        <button
                            onClick={() => handleWeekNavigation('next')}
                            className="flex items-center px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Next Week →
                        </button>
                    </div>
                    <div className="text-sm text-gray-900 font-medium">
                        {formatWeekRange(currentWeek)}
                    </div>
                </div>

                {/* Habits grid */}
                <HabitGrid
                    habitsWeekStatus={habitsWeekStatus}
                    weekDays={currentWeek.days}
                    onToggleDay={handleToggleDay}
                    onArchiveHabit={handleArchiveHabit}
                />
            </div>
        </div>
    );
} 