import React, { useState, useEffect } from 'react';
import { MetricCard } from '../common/MetricCard';
import { ChartContainer } from '../common/ChartContainer';
import { Shield, AlertTriangle, TrendingDown, DollarSign } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';

export function RiskManagementHub() {
  const [riskData, setRiskData] = useState<number[]>([]);

  useEffect(() => {
    const generateRiskData = () => {
      const newData = Array.from({ length: 24 }, () => Math.random() * 0.08 + 0.02);
      setRiskData(newData);
    };

    generateRiskData();
    const interval = setInterval(generateRiskData, 3000);
    return () => clearInterval(interval);
  }, []);

  const varChartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'VaR (1-day, 95%)',
        data: riskData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const exposureData = {
    labels: ['Bitcoin', 'Ethereum', 'Altcoins', 'DeFi', 'Stablecoins'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#F7931A',
          '#627EEA',
          '#22C55E',
          '#A855F7',
          '#6B7280'
        ],
        borderWidth: 2,
        borderColor: '#374151'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.3)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.3)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          callback: function(value: any) {
            return (value * 100).toFixed(1) + '%';
          }
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgb(156, 163, 175)',
          padding: 20,
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Portfolio VaR (1d)"
          value="$142,350"
          change={-5.2}
          icon={<Shield className="w-6 h-6" />}
        />
        <MetricCard
          title="Sharpe Ratio"
          value="1.82"
          change={0.15}
          changeType="absolute"
          icon={<TrendingDown className="w-6 h-6" />}
        />
        <MetricCard
          title="Max Drawdown"
          value="8.4%"
          change={-1.2}
          icon={<AlertTriangle className="w-6 h-6" />}
        />
        <MetricCard
          title="Beta"
          value="0.73"
          change={-0.05}
          changeType="absolute"
          icon={<DollarSign className="w-6 h-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Value at Risk (VaR) - 24H">
          <div className="h-64">
            <Line data={varChartData} options={chartOptions} />
          </div>
        </ChartContainer>

        <ChartContainer title="Portfolio Exposure">
          <div className="h-64">
            <Doughnut data={exposureData} options={doughnutOptions} />
          </div>
        </ChartContainer>
      </div>

      {/* Risk Matrix */}
      <ChartContainer title="Risk Assessment Matrix">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { asset: 'BTC/USDT', risk: 'Medium', score: 6.2, color: 'yellow' },
            { asset: 'ETH/USDT', risk: 'High', score: 7.8, color: 'red' },
            { asset: 'ADA/USDT', risk: 'Low', score: 3.4, color: 'green' },
            { asset: 'SOL/USDT', risk: 'High', score: 8.1, color: 'red' },
            { asset: 'DOT/USDT', risk: 'Medium', score: 5.9, color: 'yellow' },
            { asset: 'AVAX/USDT', risk: 'Medium', score: 6.7, color: 'yellow' }
          ].map((item, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">{item.asset}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.color === 'red' ? 'bg-red-500 text-red-900' :
                  item.color === 'yellow' ? 'bg-yellow-500 text-yellow-900' :
                  'bg-green-500 text-green-900'
                }`}>
                  {item.risk}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Risk Score</span>
                  <span className="text-white font-medium">{item.score}/10</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.color === 'red' ? 'bg-red-400' :
                      item.color === 'yellow' ? 'bg-yellow-400' :
                      'bg-green-400'
                    }`}
                    style={{ width: `${(item.score / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>

      {/* Risk Alerts */}
      <ChartContainer title="Active Risk Alerts">
        <div className="space-y-4">
          {[
            { 
              type: 'Critical', 
              message: 'ETH position exceeds 30% portfolio allocation limit',
              time: '2 minutes ago',
              severity: 'high'
            },
            { 
              type: 'Warning', 
              message: 'Correlation between BTC and ETH positions increased to 0.89',
              time: '15 minutes ago',
              severity: 'medium'
            },
            { 
              type: 'Info', 
              message: 'VaR threshold breached for SOL/USDT position',
              time: '1 hour ago',
              severity: 'low'
            }
          ].map((alert, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              alert.severity === 'high' ? 'bg-red-900/20 border-red-500' :
              alert.severity === 'medium' ? 'bg-yellow-900/20 border-yellow-500' :
              'bg-blue-900/20 border-blue-500'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-sm font-semibold ${
                      alert.severity === 'high' ? 'text-red-400' :
                      alert.severity === 'medium' ? 'text-yellow-400' :
                      'text-blue-400'
                    }`}>
                      {alert.type}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{alert.message}</p>
                </div>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>
    </div>
  );
}