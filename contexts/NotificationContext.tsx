
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Notification as NotificationType } from '../types';
import Notification from '../components/common/Notification';

interface NotificationContextType {
  addNotification: (type: NotificationType['type'], message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const addNotification = useCallback((type: NotificationType['type'], message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(currentNotifications => currentNotifications.filter(n => n.id !== id));
    }, 5000); // Auto-dismiss after 5 seconds
  }, []);

  const removeNotification = (id: number) => {
    setNotifications(currentNotifications => currentNotifications.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="fixed top-5 right-5 z-50 space-y-2">
        {notifications.map(notification => (
          <Notification key={notification.id} notification={notification} onClose={() => removeNotification(notification.id)} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
