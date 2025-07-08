import { render, screen, fireEvent } from '@testing-library/react';
import { HabitRow } from '@/components/habit-grid/HabitRow';
import { Habit } from '@/domain/habit/Habit';

// Mock HabitDayCell since we're focusing on HabitRow logic
jest.mock('@/components/habit-grid/HabitDayCell', () => ({
    HabitDayCell: ({ completed, onClick, dayLabel }: any) => (
        <button
            data-testid={`day-cell-${dayLabel}`}
            onClick={onClick}
            className={`day-cell ${completed ? 'completed' : 'incomplete'}`}
        >
            {dayLabel}
        </button>
    )
}));

describe('HabitRow', () => {
    const mockHabit: Habit = {
        id: 'habit-1',
        name: 'Morning Exercise',
        createdAt: new Date('2024-01-01')
    };

    const defaultDayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const defaultWeekDays = [
        new Date('2024-01-01'),
        new Date('2024-01-02'),
        new Date('2024-01-03'),
        new Date('2024-01-04'),
        new Date('2024-01-05'),
        new Date('2024-01-06'),
        new Date('2024-01-07')
    ];
    const defaultWeekCompletions = [true, false, true, null, false, true, null];

    const mockOnToggleDay = jest.fn();
    const mockOnArchiveHabit = jest.fn();

    const defaultProps = {
        habit: mockHabit,
        weekCompletions: defaultWeekCompletions,
        weekDays: defaultWeekDays,
        dayLabels: defaultDayLabels,
        onToggleDay: mockOnToggleDay,
        onArchiveHabit: mockOnArchiveHabit
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('should render habit name', () => {
            render(<HabitRow {...defaultProps} />);

            expect(screen.getByText('Morning Exercise')).toBeInTheDocument();
        });

        it('should render habit creation date', () => {
            render(<HabitRow {...defaultProps} />);

            expect(screen.getByText(/Created 1\/1\/2024/)).toBeInTheDocument();
        });

        it('should render archive button', () => {
            render(<HabitRow {...defaultProps} />);

            const archiveButton = screen.getByRole('button', { name: '🗂️' });
            expect(archiveButton).toBeInTheDocument();
            expect(archiveButton).toHaveTextContent('🗂️');
        });

        it('should render day cells for each day', () => {
            render(<HabitRow {...defaultProps} />);

            defaultDayLabels.forEach(dayLabel => {
                expect(screen.getByTestId(`day-cell-${dayLabel}`)).toBeInTheDocument();
            });
        });

        it('should display habit name with truncate styling', () => {
            render(<HabitRow {...defaultProps} />);

            const habitName = screen.getByText('Morning Exercise');
            expect(habitName).toHaveClass('font-medium', 'text-gray-900', 'truncate');
            expect(habitName).toHaveAttribute('title', 'Morning Exercise');
        });
    });

    describe('User interactions', () => {
        it('should call onArchiveHabit when archive button is clicked', () => {
            render(<HabitRow {...defaultProps} />);

            const archiveButton = screen.getByRole('button', { name: '🗂️' });
            fireEvent.click(archiveButton);

            expect(mockOnArchiveHabit).toHaveBeenCalledTimes(1);
            expect(mockOnArchiveHabit).toHaveBeenCalledWith('habit-1');
        });

        it('should call onToggleDay when day cell is clicked', () => {
            render(<HabitRow {...defaultProps} />);

            const mondayCell = screen.getByTestId('day-cell-Mon');
            fireEvent.click(mondayCell);

            expect(mockOnToggleDay).toHaveBeenCalledTimes(1);
            expect(mockOnToggleDay).toHaveBeenCalledWith('habit-1', '2024-01-01');
        });

        it('should not interfere with other habits when archive is clicked', () => {
            render(<HabitRow {...defaultProps} />);

            const archiveButton = screen.getByRole('button', { name: '🗂️' });
            fireEvent.click(archiveButton);

            expect(mockOnArchiveHabit).toHaveBeenCalledWith('habit-1');
            expect(mockOnToggleDay).not.toHaveBeenCalled();
        });
    });

    describe('Styling', () => {
        it('should apply correct container classes', () => {
            render(<HabitRow {...defaultProps} />);

            const container = screen.getByText('Morning Exercise').closest('div')?.parentElement?.parentElement;
            expect(container).toHaveClass('grid', 'grid-cols-8', 'gap-4', 'p-4', 'hover:bg-gray-50', 'transition-colors');
        });

        it('should style archive button correctly', () => {
            render(<HabitRow {...defaultProps} />);

            const archiveButton = screen.getByRole('button', { name: '🗂️' });
            expect(archiveButton).toHaveClass('text-gray-400', 'hover:text-red-600', 'transition-colors', 'ml-2');
        });

        it('should style creation date correctly', () => {
            render(<HabitRow {...defaultProps} />);

            const creationDate = screen.getByText(/Created 1\/1\/2024/);
            expect(creationDate).toHaveClass('text-xs', 'text-gray-500');
        });
    });

    describe('Edge cases', () => {
        it('should handle long habit names gracefully', () => {
            const longNameHabit = {
                ...mockHabit,
                name: 'This is a very long habit name that should be truncated when displayed in the grid to prevent layout issues'
            };

            const longNameProps = {
                ...defaultProps,
                habit: longNameHabit
            };

            render(<HabitRow {...longNameProps} />);

            const habitName = screen.getByText(longNameHabit.name);
            expect(habitName).toHaveClass('truncate');
            expect(habitName).toHaveAttribute('title', longNameHabit.name);
        });

        it('should handle null completions in weekCompletions', () => {
            const allNullCompletions = [null, null, null, null, null, null, null];
            const nullProps = {
                ...defaultProps,
                weekCompletions: allNullCompletions
            };

            render(<HabitRow {...nullProps} />);

            // Should render without crashing
            expect(screen.getByText('Morning Exercise')).toBeInTheDocument();
            defaultDayLabels.forEach(dayLabel => {
                expect(screen.getByTestId(`day-cell-${dayLabel}`)).toBeInTheDocument();
            });
        });

        it('should handle different date formats correctly', () => {
            const customDate = new Date('2023-12-25');
            const customHabit = {
                ...mockHabit,
                createdAt: customDate
            };

            const customProps = {
                ...defaultProps,
                habit: customHabit
            };

            render(<HabitRow {...customProps} />);

            expect(screen.getByText(/Created 12\/25\/2023/)).toBeInTheDocument();
        });

        it('should handle empty habit name', () => {
            const emptyNameHabit = {
                ...mockHabit,
                name: ''
            };

            const emptyProps = {
                ...defaultProps,
                habit: emptyNameHabit
            };

            render(<HabitRow {...emptyProps} />);

            const habitName = screen.getByTitle('');
            expect(habitName).toBeInTheDocument();
            expect(habitName).toHaveClass('truncate');
        });
    });

    describe('Accessibility', () => {
        it('should have proper button accessibility attributes', () => {
            render(<HabitRow {...defaultProps} />);

            const archiveButton = screen.getByRole('button', { name: '🗂️' });
            expect(archiveButton).toHaveAttribute('title', 'Archive habit');
        });

        it('should have proper title attribute for habit name', () => {
            render(<HabitRow {...defaultProps} />);

            const habitName = screen.getByText('Morning Exercise');
            expect(habitName).toHaveAttribute('title', 'Morning Exercise');
        });
    });
}); 