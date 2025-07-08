export interface HabitGridHeaderProps {
    dayLabels: readonly string[];
    weekDays: readonly Date[];
}

/**
 * Header component for the habit grid displaying day labels and dates
 * Follows SOLID principles with single responsibility for grid header rendering
 */
export const HabitGridHeader = ({ dayLabels, weekDays }: HabitGridHeaderProps) => {
    return (
        <div className="grid grid-cols-8 gap-4 p-4 bg-gray-50 border-b border-gray-200">
            <div className="font-medium text-gray-700">Habit</div>
            {dayLabels.map((label, index) => (
                <div key={index} className="text-center">
                    <div className="text-sm font-medium text-gray-700">{label}</div>
                    <div className="text-xs text-gray-700 font-medium">{weekDays[index]?.getDate()}</div>
                </div>
            ))}
        </div>
    );
}; 