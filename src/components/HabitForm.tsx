'use client';

import { useState } from 'react';

interface HabitFormProps {
    onSubmit: (name: string) => void;
    isLoading?: boolean;
}

export function HabitForm({ onSubmit, isLoading = false }: HabitFormProps) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            setError('Habit name cannot be empty');
            return;
        }

        if (trimmedName.length > 100) {
            setError('Habit name cannot exceed 100 characters');
            return;
        }

        setError('');
        onSubmit(trimmedName);
        setName('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter habit name (e.g., Read daily, Exercise, Meditate)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white disabled:bg-gray-50 disabled:text-gray-700"
                        disabled={isLoading}
                        maxLength={100}
                    />
                    {error && (
                        <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !name.trim()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Adding...' : 'Add Habit'}
                </button>
            </div>
        </form>
    );
} 