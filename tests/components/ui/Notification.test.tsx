import { render, screen, fireEvent } from '@testing-library/react';
import { Notification } from '@/components/ui/Notification';

describe('Notification', () => {
    const mockOnDismiss = jest.fn();

    beforeEach(() => {
        mockOnDismiss.mockClear();
    });

    describe('Success notifications', () => {
        const successProps = {
            message: 'Operation completed successfully',
            type: 'success' as const,
            onDismiss: mockOnDismiss
        };

        it('should render success message correctly', () => {
            render(<Notification {...successProps} />);

            expect(screen.getByText('Operation completed successfully')).toBeInTheDocument();
            expect(screen.getByText('✅')).toBeInTheDocument();
        });

        it('should apply correct success styles', () => {
            render(<Notification {...successProps} />);

            const container = screen.getByText('Operation completed successfully').closest('div')?.parentElement;
            expect(container).toHaveClass('bg-green-50', 'border-green-200');

            const messageText = screen.getByText('Operation completed successfully');
            expect(messageText).toHaveClass('text-green-800');
        });

        it('should call onDismiss when dismiss button is clicked', () => {
            render(<Notification {...successProps} />);

            const dismissButton = screen.getByRole('button');
            fireEvent.click(dismissButton);

            expect(mockOnDismiss).toHaveBeenCalledTimes(1);
        });
    });

    describe('Error notifications', () => {
        const errorProps = {
            message: 'An error occurred',
            type: 'error' as const,
            onDismiss: mockOnDismiss
        };

        it('should render error message correctly', () => {
            render(<Notification {...errorProps} />);

            expect(screen.getByText('An error occurred')).toBeInTheDocument();
            expect(screen.getByText('⚠️')).toBeInTheDocument();
        });

        it('should apply correct error styles', () => {
            render(<Notification {...errorProps} />);

            const container = screen.getByText('An error occurred').closest('div')?.parentElement;
            expect(container).toHaveClass('bg-red-50', 'border-red-200');

            const messageText = screen.getByText('An error occurred');
            expect(messageText).toHaveClass('text-red-800');
        });

        it('should call onDismiss when dismiss button is clicked', () => {
            render(<Notification {...errorProps} />);

            const dismissButton = screen.getByRole('button');
            fireEvent.click(dismissButton);

            expect(mockOnDismiss).toHaveBeenCalledTimes(1);
        });
    });

    describe('Common functionality', () => {
        it('should have consistent layout structure', () => {
            render(<Notification message="Test" type="success" onDismiss={mockOnDismiss} />);

            const container = screen.getByText('Test').closest('div')?.parentElement;
            expect(container).toHaveClass('mb-6', 'border', 'rounded-lg', 'p-4', 'flex', 'items-center', 'justify-between');
        });

        it('should render dismiss button with correct accessibility attributes', () => {
            render(<Notification message="Test" type="error" onDismiss={mockOnDismiss} />);

            const dismissButton = screen.getByRole('button');
            expect(dismissButton).toHaveAttribute('title', 'Dismiss error');
            expect(dismissButton).toHaveClass('transition-colors');
        });

        it('should handle long messages correctly', () => {
            const longMessage = 'This is a very long error message that should still be displayed correctly without breaking the layout or functionality of the notification component';

            render(<Notification message={longMessage} type="error" onDismiss={mockOnDismiss} />);

            expect(screen.getByText(longMessage)).toBeInTheDocument();
        });
    });
}); 