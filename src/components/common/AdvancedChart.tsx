import React, { useState, useRef, useEffect } from 'react';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { ChartContainer } from './ChartContainer';
import { BarChart3, LineChart, PieChart, Radar as RadarIcon, Maximize2, Download } from 'lucide-react';

interface AdvancedChartProps {
  title: string;
  data: any;
  type?: 'line' | 'bar' | 'doughnut' | 'radar';
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'cyan';
  height?: number;
  interactive?: boolean;
  showLegend?: boolean;
  subtitle?: string;
}

export function AdvancedChart({
  title,
  data,
  type = 'line',
  color = 'blue',
  height = 300,
  interactive = true,
  showLegend = true,
  subtitle
}: AdvancedChartProps) {
  const [chartType, setChartType] = useState(type);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const colorPalettes = {
    blue: ['#3b82f6', '#1d4ed8', '#1e40af'],
    green: ['#10b981', '#059669', '#047857'],
    purple: ['#8b5cf6', '#7c3aed', '#6d28d9'],
    orange: ['#f97316', '#ea580c', '#dc2626'],
    red: ['#ef4444', '#dc2626', '#b91c1c'],
    cyan: ['#06b6d4', '#0891b2', '#0e7490'],
  };

  const enhancedOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: showLegend,
        position: 'top' as const,
        labels: {
          color: '#d1d5db',
          font: {
            size: 12,
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#f3f4f6',
        bodyColor: '#d1d5db',
        borderColor: colorPalettes[color][0],
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
      },
    },
    scales: chartType !== 'doughnut' && chartType !== 'radar' ? {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
          drawBorder: false,
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
          drawBorder: false,
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 11,
          },
        },
      },
    } : {},
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        backgroundColor: colorPalettes[color][0],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  const enhancedData = {
    ...data,
    datasets: data.datasets.map((dataset: any, index: number) => ({
      ...dataset,
      backgroundColor: chartType === 'line' 
        ? `${colorPalettes[color][index % colorPalettes[color].length]}20`
        : colorPalettes[color][index % colorPalettes[color].length],
      borderColor: colorPalettes[color][index % colorPalettes[color].length],
      borderWidth: chartType === 'line' ? 3 : 1,
      fill: chartType === 'line' ? true : false,
    })),
  };

  const ChartComponent = {
    line: Line,
    bar: Bar,
    doughnut: Doughnut,
    radar: Radar,
  }[chartType];

  const chartIcons = {
    line: LineChart,
    bar: BarChart3,
    doughnut: PieChart,
    radar: RadarIcon,
  };

  const downloadChart = () => {
    // Implementation for chart download
    console.log('Download chart functionality');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const actions = interactive ? (
    <div className="flex items-center space-x-1">
      {/* Chart type selectors */}
      <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1">
        {Object.entries(chartIcons).map(([type, Icon]) => (
          <button
            key={type}
            onClick={() => setChartType(type as any)}
            className={`p-1.5 rounded transition-all duration-200 ${
              chartType === type 
                ? 'bg-white/20 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            title={`Switch to ${type} chart`}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
      
      <button
        onClick={downloadChart}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
        title="Download chart"
      >
        <Download className="w-4 h-4" />
      </button>
      
      <button
        onClick={toggleFullscreen}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
        title="Toggle fullscreen"
      >
        <Maximize2 className="w-4 h-4" />
      </button>
    </div>
  ) : null;

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full h-full max-w-7xl">
          <ChartContainer
            title={title}
            subtitle={subtitle}
            color={color}
            actions={actions}
            className="h-full"
          >
            <div className="h-full" ref={chartRef}>
              <ChartComponent data={enhancedData} options={enhancedOptions} />
            </div>
          </ChartContainer>
        </div>
      </div>
    );
  }

  return (
    <ChartContainer
      title={title}
      subtitle={subtitle}
      color={color}
      actions={actions}
    >
      <div style={{ height: `${height}px` }} ref={chartRef}>
        <ChartComponent data={enhancedData} options={enhancedOptions} />
      </div>
    </ChartContainer>
  );
} 