import React, { useState, useEffect } from 'react';
import { Bell, Settings, User, Menu, Search, Sun, Moon, Maximize2 } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface HeaderProps {
  title: string;
  onToggleSidebar: () => void;
}

export function Header({ title, onToggleSidebar }: HeaderProps) {
  const { portfolioValue, isConnected } = useData();
  const [notificationCount, setNotificationCount] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [time, setTime] = useState(new Date());
  const [portfolioChange, setPortfolioChange] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate portfolio change calculation
    const changePercent = (Math.random() - 0.5) * 4; // -2% to +2%
    setPortfolioChange(changePercent);
  }, [portfolioValue]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <header className="relative">
      {/* Enhanced background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-purple-500/8 to-cyan-500/8 animate-gradient-x" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-50" />
      
      {/* Enhanced border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/50 via-purple-400/50 to-transparent animate-shimmer" />
      
      <div className="relative z-10 px-6 py-4">
      <div className="flex items-center justify-between">
          {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
              title="Toggle sidebar"
              className="lg:hidden p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-110"
          >
            <Menu className="w-5 h-5" />
          </button>
            
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {title}
              </h1>
              
              {/* Live indicator */}
              <div className="flex items-center space-x-2" role="status" aria-label="System status">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-40" />
                </div>
                <span className="text-xs text-green-400 font-medium">LIVE</span>
              </div>
            </div>
          </div>

          {/* Center section - Portfolio Info */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search bar */}
            <div className="relative">
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 hover:bg-white/10 transition-all duration-300">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search assets..." 
                  className="bg-transparent text-white placeholder-gray-400 outline-none w-32 text-sm"
                />
              </div>
        </div>

            {/* Portfolio value */}
            <div className="glass-card p-3">
            <div className="text-right">
                <div className="text-xs text-gray-400 font-medium">Portfolio Value</div>
                <div className="flex items-center space-x-2">
                  <div className="text-lg font-bold text-white">
                ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className={`
                    text-xs font-semibold px-2 py-1 rounded-full
                    ${portfolioChange >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                  `}>
                    {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Time display */}
            <div className="glass-card p-3">
              <div className="text-center">
                <div className="text-xs text-gray-400 font-medium">Market Time</div>
                <div className="text-sm font-mono text-white">
                  {formatTime(time)}
                </div>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-3">
            {/* Connection status */}
            <div className={`
              flex items-center space-x-2 px-3 py-2 rounded-xl backdrop-blur-sm border transition-all duration-300
              ${isConnected 
                ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                : 'bg-red-500/10 border-red-500/30 text-red-400'
              }
            `}>
              <div className={`
                w-2 h-2 rounded-full
                ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}
              `} />
              <span className="text-sm font-medium hidden sm:block">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-1">
              {/* Theme toggle */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                title="Toggle theme"
                className="p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:rotate-12"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-400" />
                )}
              </button>

              {/* Notifications */}
              <button 
                title="Notifications"
                className="relative p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-110 group"
              >
                <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                {notificationCount > 0 && (
                  <>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs font-bold text-white flex items-center justify-center animate-bounce">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-20" />
                  </>
                )}
              </button>

              {/* Fullscreen */}
              <button 
                title="Toggle fullscreen"
                className="p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-110"
              >
                <Maximize2 className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </button>

              {/* Settings */}
              <button 
                title="Settings"
                className="p-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:rotate-90"
              >
                <Settings className="w-5 h-5 text-gray-400 hover:text-white transition-all duration-300" />
            </button>

              {/* User profile */}
              <button 
                title="User profile"
                className="relative p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-110 group"
              >
                <User className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800 animate-pulse" />
            </button>
            </div>
          </div>
        </div>

        {/* Mobile portfolio info */}
        <div className="md:hidden mt-4 flex justify-between items-center">
          <div className="glass-card p-3 flex-1 mr-2">
            <div className="text-xs text-gray-400">Portfolio</div>
            <div className="font-bold text-white">
              ${(portfolioValue / 1000).toFixed(0)}K
            </div>
          </div>
          <div className="glass-card p-3 flex-1 ml-2">
            <div className="text-xs text-gray-400">Change</div>
            <div className={`
              font-bold
              ${portfolioChange >= 0 ? 'text-green-400' : 'text-red-400'}
            `}>
              {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}