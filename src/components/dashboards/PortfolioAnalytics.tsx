import React, { useState, useEffect } from 'react';
import { MetricCard } from '../common/MetricCard';
import { ChartContainer } from '../common/ChartContainer';
import { PieChart, DollarSign, TrendingUp, Target } from 'lucide-react';
import { Line, Doughnut, Scatter } from 'react-chartjs-2';

export function PortfolioAnalytics() {
  const [performanceData, setPerformanceData] = useState<number[]>([]);
  const [portfolioData, setPortfolioData] = useState<number[]>([]);

  useEffect(() => {
    const generateData = () => {
      const newPerformance = Array.from({ length: 30 }, (_, i) => {
        const base = 100;
        const volatility = 0.02;
        return base * Math.exp((Math.random() - 0.5) * volatility * Math.sqrt(i + 1));
      });
      
      const newPortfolio = [35, 25, 15, 12, 8, 5];
      
      setPerformanceData(newPerformance);
      setPortfolioData(newPortfolio);
    };

    generateData();
    const interval = setInterval(generateData, 5000);
    return () => clearInterval(interval);
  }, []);

  const performanceChartData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Portfolio Performance',
        data: performanceData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Benchmark (BTC)',
        data: Array.from({ length: 30 }, (_, i) => 100 + (Math.random() - 0.5) * 20),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const allocationData = {
    labels: ['Bitcoin', 'Ethereum', 'DeFi Tokens', 'Layer 2', 'Stablecoins', 'Others'],
    datasets: [
      {
        data: portfolioData,
        backgroundColor: [
          '#F7931A',
          '#627EEA',
          '#22C55E',
          '#A855F7',
          '#6B7280',
          '#EF4444'
        ],
        borderWidth: 2,
        borderColor: '#374151'
      }
    ]
  };

  const efficientFrontierData = {
    datasets: [
      {
        label: 'Current Portfolio',
        data: [{ x: 0.15, y: 0.22 }],
        backgroundColor: 'rgb(34, 197, 94)',
        pointRadius: 8,
      },
      {
        label: 'Efficient Frontier',
        data: Array.from({ length: 20 }, (_, i) => ({
          x: 0.05 + (i * 0.02),
          y: Math.sqrt(0.05 + (i * 0.02)) * 0.4
        })),
        backgroundColor: 'rgb(59, 130, 246)',
        pointRadius: 3,
        showLine: true,
        borderColor: 'rgb(59, 130, 246)',
      }
    ]
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

  const scatterOptions = {
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
        title: {
          display: true,
          text: 'Risk (Volatility)',
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.3)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Expected Return',
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.3)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Value"
          value="$2,847,562"
          change={12.5}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          title="24h Return"
          value="$34,250"
          change={2.3}
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          title="Alpha"
          value="0.087"
          change={0.012}
          changeType="absolute"
          icon={<Target className="w-6 h-6" />}
        />
        <MetricCard
          title="Sharpe Ratio"
          value="1.94"
          change={0.15}
          changeType="absolute"
          icon={<PieChart className="w-6 h-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Portfolio Performance (30d)">
          <div className="h-64">
            <Line data={performanceChartData} options={chartOptions} />
          </div>
        </ChartContainer>

        <ChartContainer title="Asset Allocation">
          <div className="h-64">
            <Doughnut data={allocationData} options={doughnutOptions} />
          </div>
        </ChartContainer>
      </div>

      {/* Efficient Frontier */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Efficient Frontier Analysis">
          <div className="h-64">
            <Scatter data={efficientFrontierData} options={scatterOptions} />
          </div>
        </ChartContainer>

        <ChartContainer title="Risk Metrics">
          <div className="space-y-4">
            {[
              { metric: 'Value at Risk (95%)', value: '$142,350', status: 'normal' },
              { metric: 'Expected Shortfall', value: '$198,420', status: 'normal' },
              { metric: 'Maximum Drawdown', value: '8.4%', status: 'warning' },
              { metric: 'Volatility (30d)', value: '15.2%', status: 'normal' },
              { metric: 'Beta', value: '0.73', status: 'good' },
              { metric: 'Correlation to BTC', value: '0.64', status: 'normal' }
            ].map((risk, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">{risk.metric}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">{risk.value}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    risk.status === 'good' ? 'bg-green-400' :
                    risk.status === 'warning' ? 'bg-yellow-400' :
                    'bg-blue-400'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Holdings Analysis */}
      <ChartContainer title="Top Holdings Analysis">
        <div className="space-y-4">
          {[
            { symbol: 'BTC', name: 'Bitcoin', allocation: 35, value: 996645, change: 2.3, weight: 'Optimal' },
            { symbol: 'ETH', name: 'Ethereum', allocation: 25, value: 711890, change: 4.1, weight: 'Optimal' },
            { symbol: 'MATIC', name: 'Polygon', allocation: 15, value: 427134, change: -1.2, weight: 'Overweight' },
            { symbol: 'UNI', name: 'Uniswap', allocation: 12, value: 341708, change: 6.7, weight: 'Optimal' },
            { symbol: 'AAVE', name: 'Aave', allocation: 8, value: 227805, change: 1.9, weight: 'Underweight' },
            { symbol: 'USDC', name: 'USD Coin', allocation: 5, value: 142379, change: 0.1, weight: 'Optimal' }
          ].map((holding, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 p-4 bg-gray-700 rounded-lg items-center">
              <div>
                <div className="font-semibold text-white">{holding.symbol}</div>
                <div className="text-sm text-gray-400">{holding.name}</div>
              </div>
              <div className="text-center">
                <div className="text-white font-medium">{holding.allocation}%</div>
                <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-400 h-2 rounded-full"
                    style={{ width: `${holding.allocation}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">${holding.value.toLocaleString()}</div>
              </div>
              <div className={`text-right font-medium ${
                holding.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {holding.change >= 0 ? '+' : ''}{holding.change}%
              </div>
              <div className="text-center">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  holding.weight === 'Optimal' ? 'bg-green-500 text-green-900' :
                  holding.weight === 'Overweight' ? 'bg-red-500 text-red-900' :
                  'bg-yellow-500 text-yellow-900'
                }`}>
                  {holding.weight}
                </span>
              </div>
              <div className="text-right">
                <button className="text-blue-400 hover:text-blue-300 text-sm">Rebalance</button>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>
    </div>
  );
}