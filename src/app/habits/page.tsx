'use client';

import { useState, useEffect } from 'react';
import { HabitService } from '@/domain/habit/HabitService';
import { LocalStorageHabitRepository } from '@/domain/habit/LocalStorageHabitRepository';
import { HabitWeekStatus } from '@/domain/habit/Habit';
import { getCurrentWeek } from '@/domain/habit/getCurrentWeek';
import { HabitForm } from '@/components/HabitForm';
import { HabitGrid } from '@/components/HabitGrid';

// Initialize service with localStorage repository
const habitRepository = new LocalStorageHabitRepository();
const habitService = new HabitService(habitRepository);

export default function HabitsPage() {
    const [habitsWeekStatus, setHabitsWeekStatus] = useState<HabitWeekStatus[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Load habits on component mount
    useEffect(() => {
        loadHabits();
    }, []);

    const loadHabits = async () => {
        try {
            const weekStatus = await habitService.getHabitsWeekStatus();
            setHabitsWeekStatus(weekStatus);
        } catch (error) {
            console.error('Error loading habits:', error);
        }
    };

    const handleCreateHabit = async (name: string) => {
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
            console.error('Error creating habit:', error);
            setError('Failed to create habit. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleDay = async (habitId: string, date: string) => {
        setError(null);
        try {
            await habitService.toggleHabitCompletion(habitId, date);
            await loadHabits(); // Reload to show updated status
        } catch (error) {
            console.error('Error toggling habit completion:', error);
            if (error instanceof Error) {
                if (error.message.includes('future dates')) {
                    setError('Cannot mark future dates as completed.');
                } else if (error.message.includes('Invalid date format')) {
                    setError('Invalid date format.');
                } else {
                    setError('Failed to update habit. Please try again.');
                }
            } else {
                setError('Failed to update habit. Please try again.');
            }
        }
    };

    const handleArchiveHabit = async (habitId: string) => {
        if (confirm('Are you sure you want to archive this habit?')) {
            setError(null);
            try {
                await habitService.archiveHabit(habitId);
                await loadHabits(); // Reload to remove archived habit
            } catch (error) {
                console.error('Error archiving habit:', error);
                setError('Failed to archive habit. Please try again.');
            }
        }
    };

    const handleWeekNavigation = async (direction: 'prev' | 'next') => {
        const currentDate = currentWeek.startDate;
        const newDate = new Date(currentDate);

        if (direction === 'prev') {
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
            console.error('Error loading week data:', error);
        }
    };

    const goToCurrentWeek = async () => {
        const thisWeek = getCurrentWeek();
        setCurrentWeek(thisWeek);
        await loadHabits();
    };

    const formatWeekRange = () => {
        const start = currentWeek.startDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        const end = currentWeek.endDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        return `${start} - ${end}`;
    };

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
                            onClick={() => setSuccessMessage(null)}
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
                            onClick={() => setError(null)}
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
                        {formatWeekRange()}
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