import React, { useEffect, useState } from 'react';
import { useError } from '../contexts/ErrorContext';
import type { ErrorNotification } from '../contexts/ErrorContext';

/**
 * Individual notification component
 */
interface NotificationProps {
  notification: ErrorNotification;
  onDismiss: (id: string) => void;
}

const NotificationItem: React.FC<NotificationProps> = ({ notification, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsLeaving(true);
    setTimeout(() => onDismiss(notification.id), 300); // Match animation duration
  };

  const getNotificationStyles = (type: ErrorNotification['type']) => {
    const baseStyles = "border rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 ease-out";
    
    switch (type) {
      case 'error':
        return `${baseStyles} bg-red-50/95 border-red-200 text-red-800`;
      case 'warning':
        return `${baseStyles} bg-orange-50/95 border-orange-200 text-orange-800`;
      case 'success':
        return `${baseStyles} bg-green-50/95 border-green-200 text-green-800`;
      case 'info':
      default:
        return `${baseStyles} bg-blue-50/95 border-blue-200 text-blue-800`;
    }
  };

  const getIconForType = (type: ErrorNotification['type']) => {
    switch (type) {
      case 'error':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'success':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`
        ${getNotificationStyles(notification.type)}
        transform transition-all duration-300 ease-out
        ${isVisible && !isLeaving 
          ? 'translate-x-0 opacity-100 scale-100' 
          : isLeaving 
            ? 'translate-x-full opacity-0 scale-95'
            : 'translate-x-full opacity-0 scale-95'
        }
      `}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            {getIconForType(notification.type)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {notification.title && (
              <h4 className="font-semibold mb-1">{notification.title}</h4>
            )}
            <p className="text-sm opacity-90">{notification.message}</p>

            {/* Action buttons */}
            {notification.actions && notification.actions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {notification.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`
                      px-3 py-1 text-xs font-medium rounded transition-colors duration-200
                      ${action.variant === 'primary'
                        ? notification.type === 'error'
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : notification.type === 'warning'
                            ? 'bg-orange-600 hover:bg-orange-700 text-white'
                            : notification.type === 'success'
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                        : notification.type === 'error'
                          ? 'bg-red-100 hover:bg-red-200 text-red-800'
                          : notification.type === 'warning'
                            ? 'bg-orange-100 hover:bg-orange-200 text-orange-800'
                            : notification.type === 'success'
                              ? 'bg-green-100 hover:bg-green-200 text-green-800'
                              : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                      }
                    `}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black/5 transition-colors duration-200"
            aria-label="Dismiss notification"
          >
            <svg className="w-4 h-4 opacity-60 hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Notification System Component
 * 
 * Displays a stack of notifications in the top-right corner of the screen.
 * Supports different types (error, warning, success, info) with appropriate
 * styling and icons. Includes smooth animations for entering/leaving.
 * 
 * Features:
 * - Auto-dismiss with configurable duration
 * - Manual dismiss
 * - Action buttons
 * - Accessibility support (ARIA labels, keyboard navigation)
 * - Responsive design
 * - Smooth animations
 */
const NotificationSystem: React.FC = () => {
  const { state, hideNotification } = useError();
  const { notifications } = state;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && notifications.length > 0) {
        // Dismiss the most recent notification on Escape
        hideNotification(notifications[notifications.length - 1].id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [notifications, hideNotification]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <>
      {/* Notification Container */}
      <div
        className="fixed top-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] space-y-2"
        role="region"
        aria-label="Notifications"
        aria-live="polite"
      >
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onDismiss={hideNotification}
          />
        ))}
      </div>

      {/* Notification overlay for mobile */}
      {notifications.length > 0 && (
        <div className="sm:hidden fixed inset-0 z-40 pointer-events-none">
          <div className="absolute top-4 left-4 right-4">
            {notifications.map((notification) => (
              <div key={`mobile-${notification.id}`} className="mb-2">
                <NotificationItem
                  notification={notification}
                  onDismiss={hideNotification}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

/**
 * Hook for showing success notifications
 */
export const useSuccessNotification = () => {
  const { showNotification } = useError();

  return (message: string, title?: string, duration: number = 4000) => {
    return showNotification({
      title: title || 'Success',
      message,
      type: 'success',
      duration,
    });
  };
};

/**
 * Hook for showing error notifications
 */
export const useErrorNotification = () => {
  const { showNotification } = useError();

  return (message: string, title?: string, actions?: ErrorNotification['actions']) => {
    return showNotification({
      title: title || 'Error',
      message,
      type: 'error',
      duration: 0, // Persistent by default for errors
      actions,
    });
  };
};

/**
 * Hook for showing warning notifications
 */
export const useWarningNotification = () => {
  const { showNotification } = useError();

  return (message: string, title?: string, duration: number = 6000) => {
    return showNotification({
      title: title || 'Warning',
      message,
      type: 'warning',
      duration,
    });
  };
};

/**
 * Hook for showing info notifications
 */
export const useInfoNotification = () => {
  const { showNotification } = useError();

  return (message: string, title?: string, duration: number = 5000) => {
    return showNotification({
      title: title || 'Information',
      message,
      type: 'info',
      duration,
    });
  };
};

export default NotificationSystem;