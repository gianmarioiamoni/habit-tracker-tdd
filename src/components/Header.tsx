export interface HeaderProps {
    title: string;
    description: string;
}

/**
 * Header component for the habit tracker page
 * Displays main title and description following SOLID principles
 */
export const Header = ({ title, description }: HeaderProps) => {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {title}
            </h1>
            <p className="text-gray-600">
                {description}
            </p>
        </div>
    );
}; 