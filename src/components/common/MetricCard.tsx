import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'percentage' | 'absolute';
  color?: 'blue' | 'green' | 'red' | 'purple' | 'cyan' | 'orange';
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  icon?: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = 'percentage',
  color = 'blue',
  trend = 'neutral',
  description,
  icon
}: MetricCardProps) {
  const getColorClasses = () => {
    const colors = {
      blue: 'from-blue-500/15 to-blue-600/25 border-blue-400/30 shadow-blue-500/20',
      green: 'from-green-500/15 to-green-600/25 border-green-400/30 shadow-green-500/20',
      red: 'from-red-500/15 to-red-600/25 border-red-400/30 shadow-red-500/20',
      purple: 'from-purple-500/15 to-purple-600/25 border-purple-400/30 shadow-purple-500/20',
      cyan: 'from-cyan-500/15 to-cyan-600/25 border-cyan-400/30 shadow-cyan-500/20',
      orange: 'from-orange-500/15 to-orange-600/25 border-orange-400/30 shadow-orange-500/20',
    };
    return colors[color];
  };

  const getIconColorClasses = () => {
    const colors = {
      blue: 'from-blue-400 to-blue-600 text-blue-100',
      green: 'from-green-400 to-green-600 text-green-100',
      red: 'from-red-400 to-red-600 text-red-100',
      purple: 'from-purple-400 to-purple-600 text-purple-100',
      cyan: 'from-cyan-400 to-cyan-600 text-cyan-100',
      orange: 'from-orange-400 to-orange-600 text-orange-100',
    };
    return colors[color];
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-gray-400';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    );
    if (trend === 'down') return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    );
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className={`
      relative overflow-hidden
      bg-gradient-to-br ${getColorClasses()}
      backdrop-blur-xl border-2 rounded-2xl p-6
      hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
      group cursor-pointer
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]
    `}>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">{title}</h3>
          {icon && (
            <div className={`p-3 rounded-xl bg-gradient-to-r ${getIconColorClasses()} shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
              {icon}
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-3">
          <span className="text-3xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300 tracking-tight">
            {value}
          </span>
        </div>

        {/* Change indicator */}
        {change !== undefined && (
          <div className={`flex items-center space-x-2 text-sm font-semibold ${getTrendColor()} bg-white/10 backdrop-blur-sm rounded-full px-3 py-1`}>
            {getTrendIcon()}
            <span>
              {change > 0 ? '+' : ''}{change}{changeType === 'percentage' ? '%' : ''}
            </span>
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-xs text-gray-300 mt-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            {description}
          </p>
        )}
      </div>

      {/* Animated corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}