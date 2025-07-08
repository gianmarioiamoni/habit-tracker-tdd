import { render, screen } from '@testing-library/react';
import { Header } from '@/components/Header';

describe('Header', () => {
    const defaultProps = {
        title: 'Test Title',
        description: 'Test description text'
    };

    it('should render title correctly', () => {
        render(<Header {...defaultProps} />);

        const title = screen.getByRole('heading', { name: 'Test Title' });
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass('text-3xl', 'font-bold', 'text-gray-900', 'mb-2');
    });

    it('should render description correctly', () => {
        render(<Header {...defaultProps} />);

        const description = screen.getByText('Test description text');
        expect(description).toBeInTheDocument();
        expect(description).toHaveClass('text-gray-600');
    });

    it('should apply correct container classes', () => {
        render(<Header {...defaultProps} />);

        const container = screen.getByRole('heading').parentElement;
        expect(container).toHaveClass('mb-8');
    });

    it('should render with custom title and description', () => {
        const customProps = {
            title: 'Custom Habit Tracker',
            description: 'Track your progress daily'
        };

        render(<Header {...customProps} />);

        expect(screen.getByRole('heading', { name: 'Custom Habit Tracker' })).toBeInTheDocument();
        expect(screen.getByText('Track your progress daily')).toBeInTheDocument();
    });

    it('should handle empty strings gracefully', () => {
        const emptyProps = {
            title: '',
            description: ''
        };

        render(<Header {...emptyProps} />);

        const title = screen.getByRole('heading');
        expect(title).toBeInTheDocument();
        expect(title.textContent).toBe('');

        // Check that paragraph element exists with gray text styling
        const container = title.parentElement;
        const paragraph = container?.querySelector('p');
        expect(paragraph).toBeInTheDocument();
        expect(paragraph).toHaveClass('text-gray-600');
    });
}); 