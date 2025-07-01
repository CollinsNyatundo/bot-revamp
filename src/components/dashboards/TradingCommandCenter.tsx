import React, { useState, useEffect } from 'react';
import { MetricCard } from '../common/MetricCard';
import { ChartContainer } from '../common/ChartContainer';
import { Command, DollarSign, TrendingUp, Zap } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import { useData } from '../../contexts/DataContext';

export function TradingCommandCenter() {
  const { marketData, portfolioValue } = useData();
  const [pnlData, setPnlData] = useState<number[]>([]);
  const [volumeData, setVolumeData] = useState<number[]>([]);

  useEffect(() => {
    const generateData = () => {
      let cumulative = 0;
      const newPnl = Array.from({ length: 24 }, () => {
        cumulative += (Math.random() - 0.5) * 5000;
        return cumulative;
      });
      
      const newVolume = Array.from({ length: 12 }, () => Math.random() * 500000 + 100000);
      
      setPnlData(newPnl);
      setVolumeData(newVolume);
    };

    generateData();
    const interval = setInterval(generateData, 2000);
    return () => clearInterval(interval);
  }, []);

  const pnlChartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'P&L ($)',
        data: pnlData,
        borderColor: pnlData[pnlData.length - 1] >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
        backgroundColor: pnlData[pnlData.length - 1] >= 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const volumeChartData = {
    labels: Array.from({ length: 12 }, (_, i) => `${i + 1}h`),
    datasets: [
      {
        label: 'Trading Volume ($)',
        data: volumeData,
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
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
        },
      },
    },
  };

  const activeOrders = [
    { id: '001', pair: 'BTC/USDT', type: 'Limit Buy', amount: 0.5, price: 42800, status: 'Open' },
    { id: '002', pair: 'ETH/USDT', type: 'Stop Loss', amount: 2.0, price: 2600, status: 'Open' },
    { id: '003', pair: 'ADA/USDT', type: 'Limit Sell', amount: 1000, price: 0.48, status: 'Partial' },
    { id: '004', pair: 'SOL/USDT', type: 'Market Buy', amount: 10, price: 125.30, status: 'Filled' }
  ];

  const positions = [
    { symbol: 'BTC', size: 2.5, entry: 41200, current: 43234, pnl: 5085, pnlPercent: 4.9 },
    { symbol: 'ETH', size: 15.0, entry: 2580, current: 2654, pnl: 1110, pnlPercent: 2.9 },
    { symbol: 'ADA', size: 5000, entry: 0.42, current: 0.45, pnl: 150, pnlPercent: 7.1 },
    { symbol: 'SOL', size: 25, entry: 118.50, current: 125.30, pnl: 170, pnlPercent: 5.7 }
  ];

  return (
    <div className="space-y-6">
      {/* Trading Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Today's P&L"
          value={`$${pnlData[pnlData.length - 1]?.toFixed(0) || '0'}`}
          change={12.5}
          color="green"
          trend="up"
          description="Profit and loss for current trading session"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          title="Active Orders"
          value="23"
          change={-2}
          changeType="absolute"
          color="blue"
          trend="down"
          description="Number of pending orders in the market"
          icon={<Command className="w-6 h-6" />}
        />
        <MetricCard
          title="Win Rate"
          value="68.4%"
          change={2.1}
          color="purple"
          trend="up"
          description="Percentage of profitable trades"
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <MetricCard
          title="Execution Speed"
          value="45ms"
          change={-8}
          changeType="absolute"
          color="cyan"
          trend="up"
          description="Average order execution latency"
          icon={<Zap className="w-6 h-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="P&L Chart (24h)"
          subtitle="Cumulative profit and loss tracking"
          color="green"
        >
          <div className="h-64">
            <Line data={pnlChartData} options={chartOptions} />
          </div>
        </ChartContainer>

        <ChartContainer 
          title="Trading Volume"
          subtitle="Hourly trading volume analysis"
          color="blue"
        >
          <div className="h-64">
            <Bar data={volumeChartData} options={chartOptions} />
          </div>
        </ChartContainer>
      </div>

      {/* Market Overview */}
      <ChartContainer 
        title="Market Overview"
        subtitle="Real-time market data and price movements"
        color="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketData.slice(0, 6).map((market, index) => (
            <div 
              key={index} 
              className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {/* Background shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl" />
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-white group-hover:text-blue-100 transition-colors">
                    {market.symbol}
                  </h4>
                  <div className={`
                    text-sm font-bold px-2 py-1 rounded-full transition-all duration-300
                    ${market.changePercent >= 0 
                      ? 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30' 
                      : 'bg-red-500/20 text-red-400 group-hover:bg-red-500/30'
                    }
                  `}>
                    {market.changePercent >= 0 ? '+' : ''}{market.changePercent.toFixed(2)}%
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                    ${market.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Vol: ${(market.volume / 1000000).toFixed(1)}M
                  </div>
                  
                  {/* Trend indicator */}
                  <div className={`
                    w-full h-1 rounded-full overflow-hidden transition-all duration-500
                    ${market.changePercent >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}
                  `}>
                    <div className={`
                      h-full rounded-full transition-all duration-1000 ease-out
                      ${market.changePercent >= 0 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-400' 
                        : 'bg-gradient-to-r from-red-500 to-rose-400'
                      }
                      group-hover:w-full w-0
                    `} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>

      {/* Active Orders and Positions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="Active Orders"
          subtitle="Currently pending trading orders"
          color="orange"
        >
          <div className="space-y-3">
            {activeOrders.map((order, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="font-medium text-white">{order.pair}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.type.includes('Buy') ? 'bg-green-500 text-green-900' :
                      order.type.includes('Sell') ? 'bg-red-500 text-red-900' :
                      'bg-yellow-500 text-yellow-900'
                    }`}>
                      {order.type}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {order.amount} @ ${order.price.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Open' ? 'bg-blue-500 text-blue-900' :
                    order.status === 'Partial' ? 'bg-yellow-500 text-yellow-900' :
                    'bg-green-500 text-green-900'
                  }`}>
                    {order.status}
                  </span>
                  <div className="mt-1">
                    <button className="text-red-400 hover:text-red-300 text-xs">Cancel</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>

        <ChartContainer title="Open Positions">
          <div className="space-y-3">
            {positions.map((position, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{position.symbol}</h4>
                    <div className="text-sm text-gray-400">Size: {position.size}</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${
                      position.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {position.pnl >= 0 ? '+' : ''}${position.pnl}
                    </div>
                    <div className={`text-sm ${
                      position.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent}%
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Entry</div>
                    <div className="text-white">${position.entry.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Current</div>
                    <div className="text-white">${position.current.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Quick Actions */}
      <ChartContainer title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { action: 'Emergency Stop', color: 'red', icon: '🛑' },
            { action: 'Close All Positions', color: 'orange', icon: '❌' },
            { action: 'Pause Trading', color: 'yellow', icon: '⏸️' },
            { action: 'Resume Trading', color: 'green', icon: '▶️' },
            { action: 'Risk Check', color: 'blue', icon: '🛡️' },
            { action: 'Export Data', color: 'purple', icon: '📊' }
          ].map((action, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg border-2 border-gray-600 hover:border-${action.color}-500 transition-colors text-center`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="text-sm text-white font-medium">{action.action}</div>
            </button>
          ))}
        </div>
      </ChartContainer>
    </div>
  );
}