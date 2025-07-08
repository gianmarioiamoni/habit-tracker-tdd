import { render, screen } from '@testing-library/react';
import { HabitGridHeader } from '@/components/HabitGridHeader';

describe('HabitGridHeader', () => {
    const defaultDayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const defaultWeekDays = [
        new Date('2024-01-01'), // Monday
        new Date('2024-01-02'), // Tuesday  
        new Date('2024-01-03'), // Wednesday
        new Date('2024-01-04'), // Thursday
        new Date('2024-01-05'), // Friday
        new Date('2024-01-06'), // Saturday
        new Date('2024-01-07')  // Sunday
    ];

    const defaultProps = {
        dayLabels: defaultDayLabels,
        weekDays: defaultWeekDays
    };

    describe('Rendering', () => {
        it('should render habit column header', () => {
            render(<HabitGridHeader {...defaultProps} />);

            expect(screen.getByText('Habit')).toBeInTheDocument();
        });

        it('should render all day labels', () => {
            render(<HabitGridHeader {...defaultProps} />);

            defaultDayLabels.forEach(label => {
                expect(screen.getByText(label)).toBeInTheDocument();
            });
        });

        it('should render dates for each day', () => {
            render(<HabitGridHeader {...defaultProps} />);

            // Check that all dates (1-7) are rendered
            expect(screen.getByText('1')).toBeInTheDocument(); // Jan 1
            expect(screen.getByText('2')).toBeInTheDocument(); // Jan 2
            expect(screen.getByText('3')).toBeInTheDocument(); // Jan 3
            expect(screen.getByText('4')).toBeInTheDocument(); // Jan 4
            expect(screen.getByText('5')).toBeInTheDocument(); // Jan 5
            expect(screen.getByText('6')).toBeInTheDocument(); // Jan 6
            expect(screen.getByText('7')).toBeInTheDocument(); // Jan 7
        });

        it('should render with custom day labels', () => {
            const customDayLabels = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];
            const customProps = {
                ...defaultProps,
                dayLabels: customDayLabels
            };

            render(<HabitGridHeader {...customProps} />);

            // Check unique labels individually
            expect(screen.getByText('L')).toBeInTheDocument();
            expect(screen.getAllByText('M')).toHaveLength(2); // Two 'M' labels
            expect(screen.getByText('G')).toBeInTheDocument();
            expect(screen.getByText('V')).toBeInTheDocument();
            expect(screen.getByText('S')).toBeInTheDocument();
            expect(screen.getByText('D')).toBeInTheDocument();
        });
    });

    describe('Styling', () => {
        it('should apply correct container styles', () => {
            render(<HabitGridHeader {...defaultProps} />);

            const container = screen.getByText('Habit').parentElement;
            expect(container).toHaveClass('grid', 'grid-cols-8', 'gap-4', 'p-4', 'bg-gray-50', 'border-b', 'border-gray-200');
        });

        it('should style habit header correctly', () => {
            render(<HabitGridHeader {...defaultProps} />);

            const habitHeader = screen.getByText('Habit');
            expect(habitHeader).toHaveClass('font-medium', 'text-gray-700');
        });

        it('should style day columns correctly', () => {
            render(<HabitGridHeader {...defaultProps} />);

            const mondayLabel = screen.getByText('Mon');
            expect(mondayLabel.parentElement).toHaveClass('text-center');
            expect(mondayLabel).toHaveClass('text-sm', 'font-medium', 'text-gray-700');
        });

        it('should style date numbers correctly', () => {
            render(<HabitGridHeader {...defaultProps} />);

            const dateElement = screen.getByText('1');
            expect(dateElement).toHaveClass('text-xs', 'text-gray-700', 'font-medium');
        });
    });

    describe('Edge cases', () => {
        it('should handle empty arrays gracefully', () => {
            const emptyProps = {
                dayLabels: [] as string[],
                weekDays: [] as Date[]
            };

            render(<HabitGridHeader {...emptyProps} />);

            expect(screen.getByText('Habit')).toBeInTheDocument();
            // Should not crash and still render the habit header
        });

        it('should handle mismatched array lengths', () => {
            const mismatchedProps = {
                dayLabels: ['Mon', 'Tue'],
                weekDays: [new Date('2024-01-01')]
            };

            render(<HabitGridHeader {...mismatchedProps} />);

            expect(screen.getByText('Mon')).toBeInTheDocument();
            expect(screen.getByText('Tue')).toBeInTheDocument();
            expect(screen.getByText('1')).toBeInTheDocument();
        });

        it('should handle cross-month dates correctly', () => {
            const crossMonthDays = [
                new Date('2024-01-29'), // January 29
                new Date('2024-01-30'), // January 30
                new Date('2024-01-31'), // January 31
                new Date('2024-02-01'), // February 1
                new Date('2024-02-02'), // February 2
                new Date('2024-02-03'), // February 3
                new Date('2024-02-04')  // February 4
            ];

            const crossMonthProps = {
                ...defaultProps,
                weekDays: crossMonthDays
            };

            render(<HabitGridHeader {...crossMonthProps} />);

            expect(screen.getByText('29')).toBeInTheDocument();
            expect(screen.getByText('31')).toBeInTheDocument();
            expect(screen.getByText('1')).toBeInTheDocument();
            expect(screen.getByText('4')).toBeInTheDocument();
        });
    });
}); 