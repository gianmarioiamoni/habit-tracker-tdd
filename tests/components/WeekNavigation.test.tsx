import { render, screen, fireEvent } from '@testing-library/react';
import { WeekNavigation } from '@/components/WeekNavigation';

describe('WeekNavigation', () => {
    const mockOnPreviousWeek = jest.fn();
    const mockOnNextWeek = jest.fn();
    const mockOnGoToCurrentWeek = jest.fn();

    const defaultProps = {
        currentWeekLabel: 'Jan 1 - Jan 7',
        onPreviousWeek: mockOnPreviousWeek,
        onNextWeek: mockOnNextWeek,
        onGoToCurrentWeek: mockOnGoToCurrentWeek
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('should render all navigation buttons', () => {
            render(<WeekNavigation {...defaultProps} />);

            expect(screen.getByRole('button', { name: /previous week/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /this week/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /next week/i })).toBeInTheDocument();
        });

        it('should display current week label', () => {
            render(<WeekNavigation {...defaultProps} />);

            expect(screen.getByText('Jan 1 - Jan 7')).toBeInTheDocument();
        });

        it('should render with custom week label', () => {
            const customProps = {
                ...defaultProps,
                currentWeekLabel: 'Dec 25 - Dec 31'
            };

            render(<WeekNavigation {...customProps} />);

            expect(screen.getByText('Dec 25 - Dec 31')).toBeInTheDocument();
        });
    });

    describe('User interactions', () => {
        it('should call onPreviousWeek when previous button is clicked', () => {
            render(<WeekNavigation {...defaultProps} />);

            const previousButton = screen.getByRole('button', { name: /previous week/i });
            fireEvent.click(previousButton);

            expect(mockOnPreviousWeek).toHaveBeenCalledTimes(1);
        });

        it('should call onNextWeek when next button is clicked', () => {
            render(<WeekNavigation {...defaultProps} />);

            const nextButton = screen.getByRole('button', { name: /next week/i });
            fireEvent.click(nextButton);

            expect(mockOnNextWeek).toHaveBeenCalledTimes(1);
        });

        it('should call onGoToCurrentWeek when this week button is clicked', () => {
            render(<WeekNavigation {...defaultProps} />);

            const thisWeekButton = screen.getByRole('button', { name: /this week/i });
            fireEvent.click(thisWeekButton);

            expect(mockOnGoToCurrentWeek).toHaveBeenCalledTimes(1);
        });

        it('should not interfere with other callbacks when clicking buttons', () => {
            render(<WeekNavigation {...defaultProps} />);

            const previousButton = screen.getByRole('button', { name: /previous week/i });
            fireEvent.click(previousButton);

            expect(mockOnPreviousWeek).toHaveBeenCalledTimes(1);
            expect(mockOnNextWeek).not.toHaveBeenCalled();
            expect(mockOnGoToCurrentWeek).not.toHaveBeenCalled();
        });
    });

    describe('Styling and layout', () => {
        it('should apply correct container classes', () => {
            render(<WeekNavigation {...defaultProps} />);

            const container = screen.getByRole('button', { name: /previous week/i }).closest('div')?.parentElement;
            expect(container).toHaveClass('flex', 'items-center', 'justify-between', 'mb-6');
        });

        it('should have correct button styling for navigation buttons', () => {
            render(<WeekNavigation {...defaultProps} />);

            const previousButton = screen.getByRole('button', { name: /previous week/i });
            expect(previousButton).toHaveClass(
                'flex', 'items-center', 'px-3', 'py-2', 'text-sm', 'text-gray-900',
                'bg-white', 'border', 'border-gray-300', 'rounded-lg',
                'hover:bg-gray-50', 'transition-colors'
            );

            const nextButton = screen.getByRole('button', { name: /next week/i });
            expect(nextButton).toHaveClass(
                'flex', 'items-center', 'px-3', 'py-2', 'text-sm', 'text-gray-900',
                'bg-white', 'border', 'border-gray-300', 'rounded-lg',
                'hover:bg-gray-50', 'transition-colors'
            );
        });

        it('should have distinct styling for this week button', () => {
            render(<WeekNavigation {...defaultProps} />);

            const thisWeekButton = screen.getByRole('button', { name: /this week/i });
            expect(thisWeekButton).toHaveClass(
                'px-4', 'py-2', 'text-sm', 'bg-blue-600', 'text-white',
                'rounded-lg', 'hover:bg-blue-700', 'transition-colors'
            );
        });

        it('should style week label correctly', () => {
            render(<WeekNavigation {...defaultProps} />);

            const weekLabel = screen.getByText('Jan 1 - Jan 7');
            expect(weekLabel).toHaveClass('text-sm', 'text-gray-900', 'font-medium');
        });
    });

    describe('Accessibility', () => {
        it('should have proper button text for screen readers', () => {
            render(<WeekNavigation {...defaultProps} />);

            expect(screen.getByRole('button', { name: /← previous week/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /this week/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /next week →/i })).toBeInTheDocument();
        });
    });
}); 