'use client';

interface HabitDayCellProps {
    completed: boolean | null; // null = no data for this day
    date: Date;
    onClick: () => void;
    dayLabel: string;
}

export function HabitDayCell({ completed, date, onClick, dayLabel }: HabitDayCellProps) {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isFuture = date > today;

    const getCellStyle = () => {
        if (isFuture) {
            return 'bg-gray-100 cursor-not-allowed opacity-50';
        }

        if (completed === true) {
            return 'bg-green-500 hover:bg-green-600 cursor-pointer text-white';
        }

        if (completed === false) {
            return 'bg-red-200 hover:bg-red-300 cursor-pointer';
        }

        // null case - no data
        return 'bg-gray-50 hover:bg-gray-100 cursor-pointer border-2 border-dashed border-gray-300';
    };

    const handleClick = () => {
        if (!isFuture) {
            onClick();
        }
    };

    return (
        <div className="flex flex-col items-center">
            <span className="text-xs font-medium text-gray-600 mb-1">{dayLabel}</span>
            <button
                onClick={handleClick}
                disabled={isFuture}
                className={`w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-sm font-medium transition-all duration-200 ${getCellStyle()} ${isToday ? 'ring-2 ring-blue-400 ring-offset-1' : ''
                    }`}
                title={isFuture ? 'Cannot mark future dates' : completed ? 'Mark as incomplete' : 'Mark as completed'}
            >
                {completed === true && '✓'}
                {completed === false && '✗'}
                {completed === null && '○'}
            </button>
            <span className="text-xs text-gray-500 mt-1">
                {date.getDate()}
            </span>
        </div>
    );
} 