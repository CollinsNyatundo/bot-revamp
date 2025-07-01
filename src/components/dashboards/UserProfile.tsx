import React, { useState } from 'react';
import { MetricCard } from '../common/MetricCard';
import { ChartContainer } from '../common/ChartContainer';
import { User, Activity, Settings, Edit, Shield, Clock } from 'lucide-react';

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-15 14:30:00'
  });

  const [preferences, setPreferences] = useState({
    defaultDashboard: 'ai-model',
    language: 'en',
    theme: 'dark',
    autoRefresh: true
  });

  const recentActivity = [
    { action: 'Login', timestamp: '2024-01-15 14:30:00', details: 'Successful login from 192.168.1.100' },
    { action: 'Trade', timestamp: '2024-01-15 13:45:00', details: 'Executed BTC/USDT buy order - 0.5 BTC' },
    { action: 'Setting Change', timestamp: '2024-01-15 12:20:00', details: 'Updated notification preferences' },
    { action: 'Trade', timestamp: '2024-01-15 11:15:00', details: 'Executed ETH/USDT sell order - 2.0 ETH' },
    { action: 'Login', timestamp: '2024-01-15 09:00:00', details: 'Successful login from 192.168.1.100' },
    { action: 'Setting Change', timestamp: '2024-01-14 16:30:00', details: 'Changed default dashboard to AI Model Center' }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Account Age"
          value="365 days"
          icon={<Clock className="w-6 h-6" />}
        />
        <MetricCard
          title="Total Logins"
          value="1,247"
          change={5.2}
          icon={<Activity className="w-6 h-6" />}
        />
        <MetricCard
          title="Active Sessions"
          value="2"
          icon={<Shield className="w-6 h-6" />}
        />
        <MetricCard
          title="Security Score"
          value="95%"
          change={2}
          icon={<User className="w-6 h-6" />}
        />
      </div>

      {/* Personal Information */}
      <ChartContainer 
        title="Personal Information"
        actions={
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              ) : (
                <div className="text-white font-medium">{userInfo.name}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              ) : (
                <div className="text-white font-medium">{userInfo.email}</div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Member Since</label>
              <div className="text-white font-medium">{userInfo.joinDate}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Last Login</label>
              <div className="text-white font-medium">{userInfo.lastLogin}</div>
            </div>
          </div>
        </div>
        {isEditing && (
          <div className="mt-6 flex space-x-3">
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </ChartContainer>

      {/* Activity History and Customization Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Recent Activity">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-between items-start p-3 bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activity.action === 'Login' ? 'bg-green-500 text-green-900' :
                      activity.action === 'Trade' ? 'bg-blue-500 text-blue-900' :
                      'bg-yellow-500 text-yellow-900'
                    }`}>
                      {activity.action}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{activity.details}</p>
                </div>
                <div className="text-xs text-gray-500 ml-4">
                  {activity.timestamp}
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>

        <ChartContainer title="Customization Options">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Default Dashboard</label>
              <select
                value={preferences.defaultDashboard}
                onChange={(e) => handlePreferenceChange('defaultDashboard', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="ai-model">AI Model Control</option>
                <option value="risk-management">Risk Management</option>
                <option value="trading-command">Trading Command</option>
                <option value="portfolio-analytics">Portfolio Analytics</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
              <select
                value={preferences.language}
                onChange={(e) => handlePreferenceChange('language', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Theme</label>
              <select
                value={preferences.theme}
                onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-400">Auto Refresh Data</label>
              <button
                onClick={() => handlePreferenceChange('autoRefresh', !preferences.autoRefresh)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.autoRefresh ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.autoRefresh ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="pt-4 border-t border-gray-600">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Preferences
              </button>
            </div>
          </div>
        </ChartContainer>
      </div>

      {/* Security Actions */}
      <ChartContainer title="Security Actions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <div className="text-white font-medium">Change Password</div>
            <div className="text-sm text-gray-400">Update your account password</div>
          </button>
          <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-center">
            <Settings className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <div className="text-white font-medium">Enable 2FA</div>
            <div className="text-sm text-gray-400">Add two-factor authentication</div>
          </button>
          <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <div className="text-white font-medium">View Sessions</div>
            <div className="text-sm text-gray-400">Manage active sessions</div>
          </button>
        </div>
      </ChartContainer>
    </div>
  );
}