import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'chart' | 'metric' | 'text' | 'avatar' | 'list';
  count?: number;
  className?: string;
  animated?: boolean;
}

export function LoadingSkeleton({ 
  variant = 'card', 
  count = 1, 
  className = '',
  animated = true 
}: LoadingSkeletonProps) {
  const baseClasses = `
    bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 
    ${animated ? 'animate-pulse bg-size-200 animate-shimmer' : ''}
    rounded-lg
  `;

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={`${baseClasses} p-6 space-y-4 ${className}`}>
            <div className="flex items-center justify-between">
              <div className="h-4 bg-gray-600 rounded w-1/3"></div>
              <div className="h-6 w-6 bg-gray-600 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-8 bg-gray-600 rounded w-1/2"></div>
              <div className="h-3 bg-gray-600 rounded w-1/4"></div>
            </div>
          </div>
        );
      
      case 'chart':
        return (
          <div className={`${baseClasses} p-6 ${className}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 bg-gray-600 rounded w-1/3"></div>
              <div className="flex space-x-2">
                <div className="h-4 w-4 bg-gray-600 rounded"></div>
                <div className="h-4 w-4 bg-gray-600 rounded"></div>
              </div>
            </div>
            <div className="h-64 bg-gray-600 rounded"></div>
          </div>
        );
      
      case 'metric':
        return (
          <div className={`${baseClasses} p-4 ${className}`}>
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-gray-600 rounded w-2/3"></div>
                <div className="h-6 bg-gray-600 rounded w-1/2"></div>
                <div className="h-3 bg-gray-600 rounded w-1/3"></div>
              </div>
              <div className="h-8 w-8 bg-gray-600 rounded"></div>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`h-4 ${baseClasses} ${className}`} style={{
                width: `${Math.random() * 40 + 60}%`
              }}></div>
            ))}
          </div>
        );
      
      case 'avatar':
        return (
          <div className="flex items-center space-x-3">
            <div className={`h-12 w-12 ${baseClasses} rounded-full ${className}`}></div>
            <div className="space-y-2 flex-1">
              <div className={`h-4 ${baseClasses} w-1/2`}></div>
              <div className={`h-3 ${baseClasses} w-1/3`}></div>
            </div>
          </div>
        );
      
      case 'list':
        return (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className={`h-2 w-2 ${baseClasses} rounded-full`}></div>
                <div className={`h-4 ${baseClasses} flex-1`}></div>
                <div className={`h-4 ${baseClasses} w-16`}></div>
              </div>
            ))}
          </div>
        );
      
      default:
        return <div className={`${baseClasses} h-20 ${className}`}></div>;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-fade-in">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
}

// Specialized skeleton components
export function MetricCardSkeleton({ count = 1 }: { count?: number }) {
  return <LoadingSkeleton variant="metric" count={count} />;
}

export function ChartSkeleton({ className = '' }: { className?: string }) {
  return <LoadingSkeleton variant="chart" className={className} />;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Metrics row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCardSkeleton count={4} />
      </div>
      
      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      
      {/* Additional content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LoadingSkeleton variant="card" className="lg:col-span-2" />
        <LoadingSkeleton variant="list" />
      </div>
    </div>
  );
} 