import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface Dashboard {
  id: string;
  name: string;
  icon: string;
  color?: string;
  description?: string;
  category?: string;
  priority?: number;
}

interface SidebarProps {
  dashboards: Dashboard[];
  activeDashboard: string;
  onDashboardChange: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ 
  dashboards, 
  activeDashboard, 
  onDashboardChange, 
  collapsed,
  onToggleCollapse 
}: SidebarProps) {
  const { systemHealth, isConnected, portfolioValue } = useData();
  const [showStatusPopover, setShowStatusPopover] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [userProfile] = useState({
    name: 'Alex Chen',
    role: 'Senior Trader',
    avatar: null,
    status: 'online',
    lastActive: '2 min ago'
  });

  const getSystemStatus = () => {
    if (!isConnected) return { 
      text: 'System Offline', 
      color: 'bg-red-400', 
      textColor: 'text-red-400',
      borderColor: 'border-red-500/30'
    };
    if (systemHealth.cpu > 80 || systemHealth.memory > 85) return { 
      text: 'Degraded Performance', 
      color: 'bg-yellow-400', 
      textColor: 'text-yellow-400',
      borderColor: 'border-yellow-500/30'
    };
    return { 
      text: 'System Online', 
      color: 'bg-green-400', 
      textColor: 'text-green-400',
      borderColor: 'border-green-500/30'
    };
  };

  const systemStatus = getSystemStatus();

  const handleStatusClick = () => {
    if (collapsed) {
      setShowStatusPopover(!showStatusPopover);
    } else {
      onDashboardChange('system-health');
    }
  };

  // Group dashboards by category
  const dashboardCategories = [
    {
      name: 'Trading',
      items: dashboards.filter(d => ['ai-model', 'trading-command', 'risk-management'].includes(d.id))
    },
    {
      name: 'Analytics',
      items: dashboards.filter(d => ['market-intelligence', 'portfolio-analytics', 'blockchain-analytics'].includes(d.id))
    },
    {
      name: 'Management',
      items: dashboards.filter(d => ['strategy-development', 'compliance-reporting', 'exchange-integration'].includes(d.id))
    },
    {
      name: 'System',
      items: dashboards.filter(d => ['system-health', 'notifications', 'user-profile', 'settings'].includes(d.id))
    }
  ];

  return (
    <div className={`
      relative group
      bg-gradient-to-b from-gray-900/98 via-gray-800/95 to-gray-900/98
      backdrop-blur-2xl
      border-r border-white/15
      transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)
      flex flex-col
      ${collapsed ? 'w-20' : 'w-80'}
      shadow-2xl
      before:absolute before:inset-0 before:bg-gradient-to-b before:from-blue-500/5 before:via-purple-500/5 before:to-cyan-500/5 before:opacity-0 before:transition-opacity before:duration-700 hover:before:opacity-100
    `}>
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Sidebar border gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-cyan-500/30 opacity-60" />

      {/* Header Section */}
      <div className="relative z-10 p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Icons.Bot className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  AI Trading
                </h1>
                <p className="text-xs text-gray-400 font-medium">
                  Professional Suite
                </p>
              </div>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className={`
              p-2.5 rounded-xl 
              bg-white/5 backdrop-blur-sm border border-white/10 
              hover:bg-white/10 hover:border-white/20
              transition-all duration-300 
              hover:scale-110 hover:rotate-180
              ${collapsed ? 'mx-auto' : ''}
            `}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icons.Menu className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Quick Stats Bar (when expanded) */}
        {!collapsed && (
          <div className="mt-4 grid grid-cols-2 gap-3 animate-fade-in animation-delay-300">
            <div className="glass-card p-3 text-center">
              <div className="text-xs text-gray-400">Portfolio</div>
              <div className="text-sm font-bold text-green-400">
                ${(portfolioValue / 1000000).toFixed(2)}M
              </div>
            </div>
            <div className="glass-card p-3 text-center">
              <div className="text-xs text-gray-400">Active</div>
              <div className="text-sm font-bold text-blue-400">
                {dashboards.length} Tools
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {dashboardCategories.map((category, categoryIndex) => (
          <div 
            key={category.name}
            className="animate-fade-in"
            style={{ animationDelay: `${categoryIndex * 100}ms` }}
          >
            {!collapsed && (
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                {category.name}
              </h3>
            )}
            
            <div className="space-y-1">
              {category.items.map((dashboard, index) => {
                const IconComponent = Icons[dashboard.icon as keyof typeof Icons] as React.ComponentType<any>;
                const isActive = activeDashboard === dashboard.id;
                const isHovered = hoveredItem === dashboard.id;
                
                return (
                  <div
                    key={dashboard.id}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(dashboard.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <button
                      onClick={() => onDashboardChange(dashboard.id)}
                      className={`
                        group/item w-full flex items-center px-4 py-3 text-sm font-medium rounded-2xl 
                        transition-all duration-300 ease-out
                        ${isActive
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10'
                        }
                        ${isHovered ? 'scale-105 shadow-lg' : ''}
                        relative overflow-hidden
                        focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900
                      `}
                      title={collapsed ? dashboard.name : dashboard.description}
                      aria-label={`Navigate to ${dashboard.name}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {/* Background shimmer effect */}
                      <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover/item:translate-x-full transition-transform duration-700" />
                      </div>
                      
                      {/* Icon */}
                      <div className={`
                        relative flex-shrink-0 transition-all duration-300
                        ${isActive ? 'scale-110' : 'group-hover/item:scale-110'}
                        ${isActive ? 'text-blue-400' : 'group-hover/item:text-blue-400'}
                      `}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      {/* Label */}
                      {!collapsed && (
                        <div className="ml-4 flex-1 text-left">
                          <span className="block truncate font-medium">
                            {dashboard.name}
                          </span>
                          {dashboard.description && (
                            <span className="block text-xs text-gray-400 truncate mt-0.5">
                              {dashboard.description}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full animate-pulse" />
                      )}
                      
                      {/* Notification badge (example) */}
                      {dashboard.id === 'notifications' && !collapsed && (
                        <div className="ml-2 flex-shrink-0">
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                        </div>
                      )}
                    </button>

                    {/* Tooltip for collapsed state */}
                    {collapsed && isHovered && (
                      <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 z-50 animate-fade-in">
                        <div className="bg-gray-800 border border-gray-600 rounded-xl py-2 px-4 shadow-xl min-w-max">
                          <div className="font-medium text-white">{dashboard.name}</div>
                          {dashboard.description && (
                            <div className="text-xs text-gray-400 mt-1">{dashboard.description}</div>
                          )}
                        </div>
                        {/* Tooltip arrow */}
                        <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-800" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="relative z-10 p-4 border-t border-white/10">
        {!collapsed ? (
          <div className="glass-card p-4 animate-fade-in">
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={`
                  absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800
                  ${userProfile.status === 'online' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}
                `} />
              </div>
              
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white truncate">{userProfile.name}</div>
                <div className="text-xs text-gray-400">{userProfile.role}</div>
                <div className="text-xs text-gray-500">Active {userProfile.lastActive}</div>
              </div>
              
              {/* Settings */}
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Icons.Settings className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className={`
                absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800
                ${userProfile.status === 'online' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}
              `} />
            </div>
          </div>
        )}
      </div>

      {/* System Status Bar */}
      <div className="relative z-10 p-4 border-t border-white/10">
        <button
          onClick={handleStatusClick}
          className={`
            w-full p-4 rounded-2xl
            bg-gradient-to-r from-white/5 to-white/10
            backdrop-blur-sm border ${systemStatus.borderColor}
            hover:from-white/10 hover:to-white/15
            transition-all duration-300 hover:scale-105
            ${collapsed ? 'text-center' : ''}
            group/status
          `}
          title={collapsed ? systemStatus.text : 'Click to view system health details'}
        >
          <div className="flex items-center space-x-3">
            {/* Status Indicator */}
            <div className="relative flex-shrink-0">
              <div className={`w-3 h-3 ${systemStatus.color} rounded-full animate-pulse`} />
              <div className={`absolute inset-0 w-3 h-3 ${systemStatus.color} rounded-full animate-ping opacity-20`} />
            </div>
            
            {!collapsed && (
              <div className="flex-1 text-left">
                <div className={`text-sm font-semibold ${systemStatus.textColor} group-hover/status:text-white transition-colors`}>
                  {systemStatus.text}
                </div>
                <div className="text-xs text-gray-400 mt-1 space-x-4">
                  <span>CPU: {Math.round(systemHealth.cpu)}%</span>
                  <span>Mem: {Math.round(systemHealth.memory)}%</span>
                  <span>Latency: {Math.round(systemHealth.latency)}ms</span>
                </div>
              </div>
            )}
            
            {!collapsed && (
              <Icons.ChevronRight className="w-4 h-4 text-gray-400 group-hover/status:text-white transition-all duration-300 group-hover/status:translate-x-1" />
            )}
          </div>
        </button>

        {/* Status Popover for Collapsed State */}
        {collapsed && showStatusPopover && (
          <div className="absolute bottom-full left-full ml-3 mb-2 z-50 animate-fade-in">
            <div className="bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-2xl p-4 shadow-xl min-w-64">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-3 h-3 ${systemStatus.color} rounded-full animate-pulse`} />
                <span className={`text-sm font-semibold ${systemStatus.textColor}`}>
                  {systemStatus.text}
                </span>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">CPU Usage</span>
                  <span className="text-white">{Math.round(systemHealth.cpu)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Memory</span>
                  <span className="text-white">{Math.round(systemHealth.memory)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Latency</span>
                  <span className="text-white">{Math.round(systemHealth.latency)}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-white">{systemHealth.uptime}</span>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setShowStatusPopover(false);
                  onDashboardChange('system-health');
                }}
                className="w-full mt-3 btn-primary text-xs py-2"
              >
                View Details
              </button>
            </div>
            {/* Popover arrow */}
            <div className="absolute right-full top-6 border-4 border-transparent border-r-gray-800" />
          </div>
        )}
      </div>
    </div>
  );
}