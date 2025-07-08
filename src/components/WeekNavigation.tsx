export interface WeekNavigationProps {
    currentWeekLabel: string;
    onPreviousWeek: () => void;
    onNextWeek: () => void;
    onGoToCurrentWeek: () => void;
}

/**
 * Week navigation component for moving between different weeks
 * Provides previous/next navigation and jump to current week functionality
 * Follows SOLID principles with single responsibility for week navigation
 */
export const WeekNavigation = ({
    currentWeekLabel,
    onPreviousWeek,
    onNextWeek,
    onGoToCurrentWeek
}: WeekNavigationProps) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
                <button
                    onClick={onPreviousWeek}
                    className="flex items-center px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    ← Previous Week
                </button>
                <button
                    onClick={onGoToCurrentWeek}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    This Week
                </button>
                <button
                    onClick={onNextWeek}
                    className="flex items-center px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Next Week →
                </button>
            </div>
            <div className="text-sm text-gray-900 font-medium">
                {currentWeekLabel}
            </div>
        </div>
    );
}; 