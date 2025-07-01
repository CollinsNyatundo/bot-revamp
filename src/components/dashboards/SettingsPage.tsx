import React, { useState } from 'react';
import { MetricCard } from '../common/MetricCard';
import { ChartContainer } from '../common/ChartContainer';
import { Settings, Shield, Eye, Monitor, Key, Globe, Clock, Database } from 'lucide-react';

export function SettingsPage() {
  const [settings, setSettings] = useState({
    // Privacy Controls
    shareUsageData: false,
    personalizedRecommendations: true,
    cookieConsent: true,
    
    // Display Preferences
    theme: 'dark',
    fontSize: 'medium',
    dashboardDensity: 'comfortable',
    
    // System Configurations
    dataRefreshRate: 5,
    defaultCurrency: 'USD',
    timezone: 'UTC',
    
    // Security Settings
    twoFactorEnabled: false,
    sessionTimeout: 30,
    loginNotifications: true
  });

  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Binance API', created: '2024-01-10', lastUsed: '2024-01-15', status: 'active' },
    { id: '2', name: 'Coinbase Pro API', created: '2024-01-08', lastUsed: '2024-01-14', status: 'active' },
    { id: '3', name: 'Kraken API', created: '2024-01-05', lastUsed: '2024-01-12', status: 'inactive' }
  ]);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const generateNewApiKey = () => {
    const newKey = {
      id: Date.now().toString(),
      name: 'New API Key',
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active'
    };
    setApiKeys(prev => [...prev, newKey]);
  };

  const revokeApiKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Settings Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Security Score"
          value="85%"
          change={5}
          icon={<Shield className="w-6 h-6" />}
        />
        <MetricCard
          title="Active API Keys"
          value={apiKeys.filter(key => key.status === 'active').length.toString()}
          icon={<Key className="w-6 h-6" />}
        />
        <MetricCard
          title="Data Refresh Rate"
          value={`${settings.dataRefreshRate}s`}
          icon={<Monitor className="w-6 h-6" />}
        />
        <MetricCard
          title="Session Timeout"
          value={`${settings.sessionTimeout}m`}
          icon={<Clock className="w-6 h-6" />}
        />
      </div>

      {/* Account Management and Privacy Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Account Management">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Change Password</div>
                    <div className="text-sm text-gray-400">Update your account password</div>
                  </div>
                </div>
              </button>

              <div className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-6 h-6 text-green-400" />
                    <div>
                      <div className="text-white font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-400">
                        {settings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('twoFactorEnabled', !settings.twoFactorEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.twoFactorEnabled ? 'bg-green-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Eye className="w-6 h-6 text-yellow-400" />
                    <div>
                      <div className="text-white font-medium">Login Notifications</div>
                      <div className="text-sm text-gray-400">Get notified of new logins</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('loginNotifications', !settings.loginNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.loginNotifications ? 'bg-green-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.loginNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Session Timeout (minutes)</label>
              <select
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={0}>Never</option>
              </select>
            </div>
          </div>
        </ChartContainer>

        <ChartContainer title="Privacy Controls">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Share Anonymous Usage Data</div>
                  <div className="text-sm text-gray-400">Help improve the platform</div>
                </div>
                <button
                  onClick={() => handleSettingChange('shareUsageData', !settings.shareUsageData)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.shareUsageData ? 'bg-green-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.shareUsageData ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Personalized Recommendations</div>
                  <div className="text-sm text-gray-400">AI-powered trading suggestions</div>
                </div>
                <button
                  onClick={() => handleSettingChange('personalizedRecommendations', !settings.personalizedRecommendations)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.personalizedRecommendations ? 'bg-green-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.personalizedRecommendations ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Cookie Consent</div>
                  <div className="text-sm text-gray-400">Allow cookies for better experience</div>
                </div>
                <button
                  onClick={() => handleSettingChange('cookieConsent', !settings.cookieConsent)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.cookieConsent ? 'bg-green-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.cookieConsent ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Review Cookie Settings
            </button>

            <div className="pt-4 border-t border-gray-600">
              <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Download My Data
              </button>
            </div>
          </div>
        </ChartContainer>
      </div>

      {/* Display Preferences and System Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Display Preferences">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Theme</label>
              <div className="grid grid-cols-3 gap-2">
                {['dark', 'light', 'auto'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => handleSettingChange('theme', theme)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      settings.theme === theme
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Font Size</label>
              <select
                value={settings.fontSize}
                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Dashboard Density</label>
              <select
                value={settings.dashboardDensity}
                onChange={(e) => handleSettingChange('dashboardDensity', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="compact">Compact</option>
                <option value="comfortable">Comfortable</option>
                <option value="spacious">Spacious</option>
              </select>
            </div>
          </div>
        </ChartContainer>

        <ChartContainer title="System Configuration">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Data Refresh Rate</label>
              <select
                value={settings.dataRefreshRate}
                onChange={(e) => handleSettingChange('dataRefreshRate', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value={1}>1 second</option>
                <option value={5}>5 seconds</option>
                <option value={10}>10 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Default Currency</label>
              <select
                value={settings.defaultCurrency}
                onChange={(e) => handleSettingChange('defaultCurrency', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
                <option value="BTC">BTC - Bitcoin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Tokyo">Tokyo</option>
              </select>
            </div>

            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Save Configuration
            </button>
          </div>
        </ChartContainer>
      </div>

      {/* API Key Management */}
      <ChartContainer 
        title="API Key Management"
        actions={
          <button
            onClick={generateNewApiKey}
            className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Generate New Key
          </button>
        }
      >
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Key className="w-5 h-5 text-blue-400" />
                  <span className="font-medium text-white">{apiKey.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    apiKey.status === 'active' ? 'bg-green-500 text-green-900' : 'bg-gray-500 text-gray-900'
                  }`}>
                    {apiKey.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>Created: {apiKey.created}</div>
                  <div>Last Used: {apiKey.lastUsed}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  Edit
                </button>
                <button
                  onClick={() => revokeApiKey(apiKey.id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Revoke
                </button>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>

      {/* Integration Settings */}
      <ChartContainer title="Integration Settings">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Exchange Integration', status: 'Connected', icon: Globe, color: 'green' },
            { name: 'Database Backup', status: 'Enabled', icon: Database, color: 'blue' },
            { name: 'External APIs', status: 'Active', icon: Key, color: 'green' },
            { name: 'Webhook Endpoints', status: 'Configured', icon: Settings, color: 'yellow' },
            { name: 'Cloud Storage', status: 'Synced', icon: Monitor, color: 'green' },
            { name: 'Notification Services', status: 'Active', icon: Eye, color: 'green' }
          ].map((integration, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <div className="flex items-center space-x-3 mb-2">
                <integration.icon className={`w-6 h-6 text-${integration.color}-400`} />
                <span className="font-medium text-white">{integration.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm text-${integration.color}-400`}>{integration.status}</span>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>
    </div>
  );
}