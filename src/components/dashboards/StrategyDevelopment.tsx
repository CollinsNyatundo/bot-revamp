import React, { useState, useEffect } from 'react';
import { MetricCard } from '../common/MetricCard';
import { ChartContainer } from '../common/ChartContainer';
import { Target, TrendingUp, BarChart3, Zap } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';

export function StrategyDevelopment() {
  const [backtestData, setBacktestData] = useState<number[]>([]);
  const [performanceData, setPerformanceData] = useState<number[]>([]);

  useEffect(() => {
    const generateData = () => {
      let cumulative = 100;
      const newBacktest = Array.from({ length: 252 }, () => {
        cumulative *= (1 + (Math.random() - 0.48) * 0.03);
        return cumulative;
      });
      
      const newPerformance = Array.from({ length: 12 }, () => Math.random() * 40 - 10);
      
      setBacktestData(newBacktest);
      setPerformanceData(newPerformance);
    };

    generateData();
    const interval = setInterval(generateData, 6000);
    return () => clearInterval(interval);
  }, []);

  const backtestChartData = {
    labels: Array.from({ length: 252 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Strategy Performance',
        data: backtestData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Buy & Hold',
        data: Array.from({ length: 252 }, (_, i) => 100 * Math.pow(1.001, i)),
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const performanceChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Returns (%)',
        data: performanceData,
        backgroundColor: performanceData.map(val => val >= 0 ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)'),
        borderColor: performanceData.map(val => val >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(156, 163, 175)',
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.3)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          maxTicksLimit: 10,
        },
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.3)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
      },
    },
  };

  const strategies = [
    {
      name: 'Mean Reversion Bot',
      status: 'Active',
      performance: 24.7,
      sharpe: 1.83,
      maxDrawdown: 8.2,
      winRate: 67.3
    },
    {
      name: 'Momentum Breakout',
      status: 'Testing',
      performance: 18.9,
      sharpe: 1.45,
      maxDrawdown: 12.1,
      winRate: 59.8
    },
    {
      name: 'Arbitrage Scanner',
      status: 'Active',
      performance: 31.2,
      sharpe: 2.14,
      maxDrawdown: 4.6,
      winRate: 78.9
    },
    {
      name: 'DCA Plus',
      status: 'Paused',
      performance: 15.6,
      sharpe: 1.22,
      maxDrawdown: 15.8,
      winRate: 55.4
    }
  ];

  return (
    <div className="space-y-6">
      {/* Strategy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Strategies"
          value="12"
          change={2}
          changeType="absolute"
          icon={<Target className="w-6 h-6" />}
        />
        <MetricCard
          title="Best Performer"
          value="31.2%"
          change={4.8}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          title="Avg Sharpe Ratio"
          value="1.68"
          change={0.12}
          changeType="absolute"
          icon={<BarChart3 className="w-6 h-6" />}
        />
        <MetricCard
          title="Win Rate"
          value="65.4%"
          change={3.2}
          icon={<Zap className="w-6 h-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Backtest Results (1 Year)">
          <div className="h-64">
            <Line data={backtestChartData} options={chartOptions} />
          </div>
        </ChartContainer>

        <ChartContainer title="Monthly Performance">
          <div className="h-64">
            <Bar data={performanceChartData} options={chartOptions} />
          </div>
        </ChartContainer>
      </div>

      {/* Strategy Comparison */}
      <ChartContainer title="Strategy Performance Comparison">
        <div className="space-y-4">
          {strategies.map((strategy, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-white">{strategy.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                    strategy.status === 'Active' ? 'bg-green-500 text-green-900' :
                    strategy.status === 'Testing' ? 'bg-yellow-500 text-yellow-900' :
                    'bg-gray-500 text-gray-900'
                  }`}>
                    {strategy.status}
                  </span>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    strategy.performance >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {strategy.performance >= 0 ? '+' : ''}{strategy.performance}%
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Sharpe Ratio</div>
                  <div className="text-white font-medium">{strategy.sharpe}</div>
                </div>
                <div>
                  <div className="text-gray-400">Max Drawdown</div>
                  <div className="text-white font-medium">{strategy.maxDrawdown}%</div>
                </div>
                <div>
                  <div className="text-gray-400">Win Rate</div>
                  <div className="text-white font-medium">{strategy.winRate}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>

      {/* Monte Carlo Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Monte Carlo Simulation">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">85.6%</div>
              <div className="text-gray-400">Probability of Positive Return</div>
            </div>
            <div className="space-y-3">
              {[
                { percentile: '95th', value: 45.2, color: 'green' },
                { percentile: '75th', value: 28.7, color: 'green' },
                { percentile: '50th', value: 18.4, color: 'blue' },
                { percentile: '25th', value: 8.9, color: 'yellow' },
                { percentile: '5th', value: -12.3, color: 'red' }
              ].map((percentile, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-400">{percentile.percentile} Percentile</span>
                  <span className={`font-medium ${
                    percentile.color === 'green' ? 'text-green-400' :
                    percentile.color === 'blue' ? 'text-blue-400' :
                    percentile.color === 'yellow' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {percentile.value >= 0 ? '+' : ''}{percentile.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>

        <ChartContainer title="Walk-Forward Analysis">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-xl font-bold text-white">78%</div>
                <div className="text-sm text-gray-400">In-Sample Accuracy</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-xl font-bold text-white">72%</div>
                <div className="text-sm text-gray-400">Out-of-Sample Accuracy</div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { period: 'Q1 2024', inSample: 76, outSample: 68 },
                { period: 'Q4 2023', inSample: 81, outSample: 74 },
                { period: 'Q3 2023', inSample: 75, outSample: 71 },
                { period: 'Q2 2023', inSample: 79, outSample: 73 },
                { period: 'Q1 2023', inSample: 77, outSample: 69 }
              ].map((period, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{period.period}</span>
                    <span className="text-gray-400">In: {period.inSample}% | Out: {period.outSample}%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full"
                        style={{ width: `${period.inSample}%` }}
                      ></div>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full"
                        style={{ width: `${period.outSample}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>
      </div>

      {/* Parameter Optimization */}
      <ChartContainer title="Parameter Optimization Results">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { parameter: 'RSI Period', current: 14, optimal: 21, improvement: 12.3 },
            { parameter: 'SMA Fast', current: 20, optimal: 18, improvement: 8.7 },
            { parameter: 'SMA Slow', current: 50, optimal: 55, improvement: 5.2 },
            { parameter: 'Stop Loss %', current: 5, optimal: 7, improvement: 15.8 }
          ].map((param, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-3">{param.parameter}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current</span>
                  <span className="text-white">{param.current}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Optimal</span>
                  <span className="text-green-400 font-medium">{param.optimal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Improvement</span>
                  <span className="text-green-400 font-medium">+{param.improvement}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>
    </div>
  );
}