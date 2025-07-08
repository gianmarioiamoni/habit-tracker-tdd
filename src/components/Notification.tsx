export interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    onDismiss: () => void;
}

/**
 * Generic notification component for success and error messages
 * Follows SOLID principles with single responsibility and configurable type
 */
export const Notification = ({ message, type, onDismiss }: NotificationProps) => {
    const isSuccess = type === 'success';

    const baseClasses = "mb-6 border rounded-lg p-4 flex items-center justify-between";
    const typeClasses = isSuccess
        ? "bg-green-50 border-green-200"
        : "bg-red-50 border-red-200";

    const iconClasses = isSuccess
        ? "text-green-600"
        : "text-red-600";

    const textClasses = isSuccess
        ? "text-green-800"
        : "text-red-800";

    const buttonClasses = isSuccess
        ? "text-green-600 hover:text-green-800"
        : "text-red-600 hover:text-red-800";

    const icon = isSuccess ? "✅" : "⚠️";

    return (
        <div className={`${baseClasses} ${typeClasses}`}>
            <div className="flex items-center">
                <div className={`${iconClasses} mr-3`}>{icon}</div>
                <p className={textClasses}>{message}</p>
            </div>
            <button
                onClick={onDismiss}
                className={`${buttonClasses} transition-colors`}
                title={`Dismiss ${type}`}
            >
                ✕
            </button>
        </div>
    );
}; 