import React, { useState, useEffect, createContext, useContext } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, TrendingUp, TrendingDown } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'trade';
  title: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  data?: any;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove if not persistent
    if (!notification.persistent) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll
    }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
      {notifications.map((notification, index) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
          index={index}
        />
      ))}
    </div>
  );
}

function NotificationItem({ 
  notification, 
  onClose, 
  index 
}: { 
  notification: Notification; 
  onClose: () => void;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  const handleClose = () => {
    setIsRemoving(true);
    setTimeout(onClose, 300);
  };

  const getNotificationConfig = () => {
    switch (notification.type) {
      case 'success':
        return {
          icon: CheckCircle,
          colors: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
          iconColor: 'text-green-400',
          textColor: 'text-green-100'
        };
      case 'error':
        return {
          icon: AlertCircle,
          colors: 'from-red-500/20 to-rose-500/20 border-red-500/30',
          iconColor: 'text-red-400',
          textColor: 'text-red-100'
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          colors: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
          iconColor: 'text-yellow-400',
          textColor: 'text-yellow-100'
        };
      case 'info':
        return {
          icon: Info,
          colors: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
          iconColor: 'text-blue-400',
          textColor: 'text-blue-100'
        };
      case 'trade':
        return {
          icon: notification.data?.type === 'buy' ? TrendingUp : TrendingDown,
          colors: notification.data?.type === 'buy' 
            ? 'from-green-500/20 to-emerald-500/20 border-green-500/30'
            : 'from-red-500/20 to-rose-500/20 border-red-500/30',
          iconColor: notification.data?.type === 'buy' ? 'text-green-400' : 'text-red-400',
          textColor: notification.data?.type === 'buy' ? 'text-green-100' : 'text-red-100'
        };
      default:
        return {
          icon: Info,
          colors: 'from-gray-500/20 to-gray-600/20 border-gray-500/30',
          iconColor: 'text-gray-400',
          textColor: 'text-gray-100'
        };
    }
  };

  const config = getNotificationConfig();
  const Icon = config.icon;

  return (
    <div
      className={`
        relative transform transition-all duration-300 ease-out
        ${isVisible && !isRemoving ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
        ${isRemoving ? '-translate-x-full opacity-0' : ''}
      `}
      style={{
        transitionDelay: `${index * 50}ms`
      }}
    >
      <div className={`
        bg-gradient-to-r ${config.colors}
        backdrop-blur-md
        border rounded-2xl
        p-4
        shadow-lg
        hover:shadow-xl
        transition-all duration-200
        group
        relative
        overflow-hidden
      `}>
        {/* Background shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>

        <div className="relative z-10 flex items-start space-x-3">
          {/* Icon */}
          <div className={`${config.iconColor} mt-0.5 animate-bounce-subtle`}>
            <Icon className="w-5 h-5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className={`font-semibold ${config.textColor} mb-1`}>
              {notification.title}
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              {notification.message}
            </p>
            
            {/* Trade-specific data */}
            {notification.type === 'trade' && notification.data && (
              <div className="mt-2 flex items-center space-x-4 text-xs">
                <span className="text-gray-400">
                  {notification.data.symbol}
                </span>
                <span className={config.textColor}>
                  {notification.data.amount} @ ${notification.data.price}
                </span>
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar for auto-dismiss */}
        {!notification.persistent && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/50 rounded-b-2xl overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${config.colors.includes('green') ? 'from-green-400 to-emerald-400' : config.colors.includes('red') ? 'from-red-400 to-rose-400' : 'from-blue-400 to-cyan-400'}`}
              style={{
                animation: `shrink ${notification.duration || 5000}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Utility hooks for common notifications
export function useTradeNotifications() {
  const { addNotification } = useNotifications();

  const notifyTrade = (type: 'buy' | 'sell', symbol: string, amount: number, price: number) => {
    addNotification({
      type: 'trade',
      title: `${type.toUpperCase()} Order Executed`,
      message: `Successfully ${type === 'buy' ? 'purchased' : 'sold'} ${symbol}`,
      duration: 7000,
      data: { type, symbol, amount, price }
    });
  };

  const notifyOrderFilled = (symbol: string, side: 'buy' | 'sell', amount: number) => {
    addNotification({
      type: 'success',
      title: 'Order Filled',
      message: `${side.toUpperCase()} order for ${amount} ${symbol} has been filled`,
      duration: 5000
    });
  };

  const notifyPriceAlert = (symbol: string, price: number, condition: 'above' | 'below') => {
    addNotification({
      type: 'warning',
      title: 'Price Alert Triggered',
      message: `${symbol} is now ${condition} $${price.toLocaleString()}`,
      duration: 8000
    });
  };

  return { notifyTrade, notifyOrderFilled, notifyPriceAlert };
}

// CSS for animation
const styles = `
@keyframes shrink {
  from { width: 100%; }
  to { width: 0%; }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
} 