'use client';

import { HabitForm } from '@/components/HabitForm';
import { HabitGrid } from '@/components/HabitGrid';
import { Header } from '@/components/Header';
import { Notification } from '@/components/Notification';
import { WeekNavigation } from '@/components/WeekNavigation';
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
                <Header
                    title="Habit Tracker"
                    description="Track your daily habits and build consistency"
                />

                {successMessage && (
                    <Notification
                        message={successMessage}
                        type="success"
                        onDismiss={dismissSuccess}
                    />
                )}

                {error && (
                    <Notification
                        message={error}
                        type="error"
                        onDismiss={dismissError}
                    />
                )}

                <HabitForm onSubmit={handleCreateHabit} isLoading={isLoading} />

                <WeekNavigation
                    currentWeekLabel={formatWeekRange(currentWeek)}
                    onPreviousWeek={() => handleWeekNavigation('prev')}
                    onNextWeek={() => handleWeekNavigation('next')}
                    onGoToCurrentWeek={goToCurrentWeek}
                />

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