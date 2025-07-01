import React, { useState, useEffect } from 'react';
import { MetricCard } from '../common/MetricCard';
import { ChartContainer } from '../common/ChartContainer';
import { Bell, AlertTriangle, Info, CheckCircle, X, Filter, Search } from 'lucide-react';

interface Notification {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  source: string;
  timestamp: string;
  read: boolean;
}

export function NotificationsCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info' | 'success'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [preferences, setPreferences] = useState({
    tradingSignals: true,
    systemAlerts: true,
    complianceWarnings: true,
    accountActivity: false,
    emailNotifications: true,
    pushNotifications: true
  });

  useEffect(() => {
    // Initialize with sample notifications
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        type: 'critical',
        title: 'System Alert',
        message: 'Database connection pool exhausted - immediate attention required',
        source: 'System Health',
        timestamp: '2024-01-15 14:30:00',
        read: false
      },
      {
        id: '2',
        type: 'warning',
        title: 'Risk Threshold Exceeded',
        message: 'Portfolio VaR has exceeded the configured threshold of $150,000',
        source: 'Risk Management',
        timestamp: '2024-01-15 14:15:00',
        read: false
      },
      {
        id: '3',
        type: 'info',
        title: 'Trading Signal',
        message: 'Strong buy signal detected for BTC/USDT - Confidence: 87%',
        source: 'AI Model',
        timestamp: '2024-01-15 14:00:00',
        read: true
      },
      {
        id: '4',
        type: 'success',
        title: 'Order Executed',
        message: 'Successfully executed limit buy order for 0.5 BTC at $43,250',
        source: 'Trading Engine',
        timestamp: '2024-01-15 13:45:00',
        read: true
      },
      {
        id: '5',
        type: 'warning',
        title: 'Compliance Alert',
        message: 'Transaction requires additional documentation for regulatory compliance',
        source: 'Compliance',
        timestamp: '2024-01-15 13:30:00',
        read: false
      }
    ];
    setNotifications(sampleNotifications);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: ['info', 'warning', 'success'][Math.floor(Math.random() * 3)] as any,
        title: 'New Alert',
        message: `System update: ${new Date().toLocaleTimeString()}`,
        source: 'System',
        timestamp: new Date().toLocaleString(),
        read: false
      };
      setNotifications(prev => [newNotification, ...prev]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.type === filter;
    const matchesSearch = searchTerm === '' || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.type === 'critical' && !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getNotificationBg = (type: string, read: boolean) => {
    const opacity = read ? '10' : '20';
    switch (type) {
      case 'critical': return `bg-red-900/${opacity} border-red-500`;
      case 'warning': return `bg-yellow-900/${opacity} border-yellow-500`;
      case 'success': return `bg-green-900/${opacity} border-green-500`;
      default: return `bg-blue-900/${opacity} border-blue-500`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Notification Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Unread Notifications"
          value={unreadCount.toString()}
          icon={<Bell className="w-6 h-6" />}
        />
        <MetricCard
          title="Critical Alerts"
          value={criticalCount.toString()}
          icon={<AlertTriangle className="w-6 h-6" />}
        />
        <MetricCard
          title="Total Today"
          value={notifications.filter(n => n.timestamp.includes('2024-01-15')).length.toString()}
          icon={<Info className="w-6 h-6" />}
        />
        <MetricCard
          title="Response Time"
          value="2.3 min"
          change={-15}
          changeType="absolute"
          icon={<CheckCircle className="w-6 h-6" />}
        />
      </div>

      {/* Notifications Feed and Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartContainer 
            title="Real-time Alerts Feed"
            actions={
              <div className="flex items-center space-x-2">
                <button
                  onClick={markAllAsRead}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Mark All Read
                </button>
              </div>
            }
          >
            {/* Filters */}
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                </select>
              </div>
              <div className="flex items-center space-x-2 flex-1">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border-l-4 ${getNotificationBg(notification.type, notification.read)} ${
                    !notification.read ? 'shadow-lg' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-semibold ${!notification.read ? 'text-white' : 'text-gray-300'}`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{notification.source}</span>
                          <span>{notification.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-400 hover:text-blue-300 text-xs"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => dismissNotification(notification.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartContainer>
        </div>

        <ChartContainer title="Notification Preferences">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Categories</h4>
              <div className="space-y-3">
                {Object.entries(preferences).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, [key]: !value }))}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        value ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-600 pt-4">
              <h4 className="text-sm font-semibold text-white mb-3">Delivery Methods</h4>
              <div className="space-y-3">
                {Object.entries(preferences).slice(4).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, [key]: !value }))}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        value ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Save Preferences
            </button>
          </div>
        </ChartContainer>
      </div>

      {/* Notification History */}
      <ChartContainer title="Notification History">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-medium">Recent Activity Summary</h4>
            <button className="text-blue-400 hover:text-blue-300 text-sm">
              Export History
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { period: 'Last Hour', count: 5, critical: 1 },
              { period: 'Last 24 Hours', count: 23, critical: 3 },
              { period: 'Last Week', count: 156, critical: 12 },
              { period: 'Last Month', count: 642, critical: 45 }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-400">{stat.period}</div>
                <div className="text-xl font-bold text-white">{stat.count}</div>
                <div className="text-xs text-red-400">{stat.critical} critical</div>
              </div>
            ))}
          </div>
        </div>
      </ChartContainer>
    </div>
  );
}