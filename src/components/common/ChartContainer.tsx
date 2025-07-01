import React, { useState } from 'react';
import { Maximize2, Download, Settings, MoreHorizontal } from 'lucide-react';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  subtitle?: string;
  fullscreenEnabled?: boolean;
  downloadEnabled?: boolean;
  settingsEnabled?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'cyan';
}

export function ChartContainer({ 
  title, 
  children, 
  className = '', 
  actions,
  subtitle,
  fullscreenEnabled = true,
  downloadEnabled = true,
  settingsEnabled = true,
  color = 'blue'
}: ChartContainerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const colorVariants = {
    blue: {
      gradient: 'from-blue-500/10 via-blue-600/5 to-purple-500/10',
      border: 'border-blue-500/20',
      accent: 'text-blue-400',
      headerBg: 'bg-blue-500/5',
    },
    green: {
      gradient: 'from-green-500/10 via-emerald-600/5 to-teal-500/10',
      border: 'border-green-500/20',
      accent: 'text-green-400',
      headerBg: 'bg-green-500/5',
    },
    purple: {
      gradient: 'from-purple-500/10 via-violet-600/5 to-fuchsia-500/10',
      border: 'border-purple-500/20',
      accent: 'text-purple-400',
      headerBg: 'bg-purple-500/5',
    },
    orange: {
      gradient: 'from-orange-500/10 via-amber-600/5 to-yellow-500/10',
      border: 'border-orange-500/20',
      accent: 'text-orange-400',
      headerBg: 'bg-orange-500/5',
    },
    red: {
      gradient: 'from-red-500/10 via-rose-600/5 to-pink-500/10',
      border: 'border-red-500/20',
      accent: 'text-red-400',
      headerBg: 'bg-red-500/5',
    },
    cyan: {
      gradient: 'from-cyan-500/10 via-sky-600/5 to-blue-500/10',
      border: 'border-cyan-500/20',
      accent: 'text-cyan-400',
      headerBg: 'bg-cyan-500/5',
    },
  };

  const currentColor = colorVariants[color];

  return (
    <div 
      className={`
        relative group
        bg-gradient-to-br ${currentColor.gradient}
        backdrop-blur-md
        rounded-2xl
        border ${currentColor.border}
        transition-all duration-500 ease-out
        hover:scale-[1.02]
        hover:shadow-2xl
        hover:border-opacity-40
        overflow-hidden
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient animation */}
      <div className={`
        absolute inset-0 
        bg-gradient-to-br ${currentColor.gradient}
        opacity-0 
        group-hover:opacity-100 
        transition-opacity duration-500
        rounded-2xl
      `} />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      {/* Header */}
      <div className={`
        relative z-10
        ${currentColor.headerBg}
        backdrop-blur-sm
        border-b ${currentColor.border}
        transition-all duration-300
      `}>
        <div className="p-6">
        <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h3 className={`
                  text-lg font-semibold text-white 
                  transition-all duration-300
                  ${isHovered ? 'scale-105' : ''}
                `}>
                  {title}
                </h3>
                
                {/* Animated status indicator */}
                <div className="relative">
                  <div className={`
                    w-2 h-2 rounded-full ${currentColor.accent.replace('text-', 'bg-')}
                    animate-pulse
                  `} />
                  <div className={`
                    absolute inset-0 w-2 h-2 rounded-full ${currentColor.accent.replace('text-', 'bg-')}
                    animate-ping opacity-20
                  `} />
                </div>
              </div>
              
              {subtitle && (
                <p className="text-sm text-gray-400 mt-1 transition-colors duration-300 group-hover:text-gray-300">
                  {subtitle}
                </p>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              {actions}
              
              {/* Default action buttons */}
              <div className={`
                flex items-center space-x-1 
                transition-all duration-300
                ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}
              `}>
                {settingsEnabled && (
                  <button 
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 hover:scale-110"
                    onClick={() => setShowActions(!showActions)}
                  >
                    <Settings className="w-4 h-4 text-gray-400 hover:text-white" />
                  </button>
                )}
                
                {downloadEnabled && (
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 hover:scale-110">
                    <Download className="w-4 h-4 text-gray-400 hover:text-white" />
                  </button>
                )}
                
                {fullscreenEnabled && (
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 hover:scale-110">
                    <Maximize2 className="w-4 h-4 text-gray-400 hover:text-white" />
                  </button>
                )}
                
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 hover:scale-110">
                  <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className={`
          transition-all duration-300
          ${isHovered ? 'transform translate-y-0' : ''}
        `}>
        {children}
        </div>
      </div>

      {/* Footer gradient line */}
      <div className={`
        absolute bottom-0 left-0 right-0 h-1
        bg-gradient-to-r ${currentColor.gradient.replace('/10', '/40').replace('/5', '/20')}
        opacity-0 group-hover:opacity-100
        transition-opacity duration-500
      `} />
      
      {/* Corner accent */}
      <div className={`
        absolute top-4 right-4 w-3 h-3
        border-t-2 border-r-2 ${currentColor.border}
        opacity-20 group-hover:opacity-60
        transition-opacity duration-300
      `} />
    </div>
  );
}