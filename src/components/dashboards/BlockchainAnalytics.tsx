import React, { useState, useEffect } from 'react';
import { MetricCard } from '../common/MetricCard';
import { ChartContainer } from '../common/ChartContainer';
import { Link2, Activity, Zap, Users } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';

export function BlockchainAnalytics() {
  const [networkData, setNetworkData] = useState<number[]>([]);
  const [gasData, setGasData] = useState<number[]>([]);

  useEffect(() => {
    const generateData = () => {
      const newNetwork = Array.from({ length: 24 }, () => Math.random() * 50 + 10);
      const newGas = Array.from({ length: 12 }, () => Math.random() * 200 + 20);
      
      setNetworkData(newNetwork);
      setGasData(newGas);
    };

    generateData();
    const interval = setInterval(generateData, 4000);
    return () => clearInterval(interval);
  }, []);

  const networkChartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Transaction Volume',
        data: networkData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const gasChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Average Gas Price (Gwei)',
        data: gasData,
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

  const networks = [
    { name: 'Ethereum', tps: 15.3, health: 98.5, nodes: 8234, validators: 450123 },
    { name: 'Polygon', tps: 42.7, health: 99.2, nodes: 3421, validators: 12456 },
    { name: 'Arbitrum', tps: 28.9, health: 97.8, nodes: 1876, validators: 5432 },
    { name: 'Optimism', tps: 22.1, health: 98.9, nodes: 1543, validators: 3876 },
    { name: 'BSC', tps: 31.5, health: 96.4, nodes: 2654, validators: 8765 },
    { name: 'Avalanche', tps: 18.7, health: 99.1, nodes: 1932, validators: 6543 }
  ];

  return (
    <div className="space-y-6">
      {/* Network Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Networks"
          value="15"
          change={2}
          changeType="absolute"
          icon={<Link2 className="w-6 h-6" />}
        />
        <MetricCard
          title="Total TPS"
          value="234.7"
          change={8.3}
          icon={<Activity className="w-6 h-6" />}
        />
        <MetricCard
          title="Avg Gas Fee"
          value="32 Gwei"
          change={-15.2}
          icon={<Zap className="w-6 h-6" />}
        />
        <MetricCard
          title="Active Validators"
          value="487K"
          change={5.7}
          icon={<Users className="w-6 h-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Network Activity (24h)">
          <div className="h-64">
            <Line data={networkChartData} options={chartOptions} />
          </div>
        </ChartContainer>

        <ChartContainer title="Gas Price Trends">
          <div className="h-64">
            <Bar data={gasChartData} options={chartOptions} />
          </div>
        </ChartContainer>
      </div>

      {/* Network Status */}
      <ChartContainer title="Network Health Status">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {networks.map((network, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-white">{network.name}</h4>
                <div className={`w-3 h-3 rounded-full ${
                  network.health >= 99 ? 'bg-green-400' :
                  network.health >= 97 ? 'bg-yellow-400' :
                  'bg-red-400'
                }`}></div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">TPS</span>
                  <span className="text-white">{network.tps}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Health</span>
                  <span className="text-white">{network.health}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Nodes</span>
                  <span className="text-white">{network.nodes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Validators</span>
                  <span className="text-white">{network.validators.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>

      {/* Cross-Chain Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Cross-Chain Bridge Activity">
          <div className="space-y-4">
            {[
              { from: 'Ethereum', to: 'Polygon', volume: 2450000, count: 1234 },
              { from: 'Ethereum', to: 'Arbitrum', volume: 1890000, count: 987 },
              { from: 'Polygon', to: 'Ethereum', volume: 1560000, count: 765 },
              { from: 'BSC', to: 'Ethereum', volume: 1230000, count: 543 },
              { from: 'Avalanche', to: 'Ethereum', volume: 890000, count: 432 }
            ].map((bridge, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    <span className="text-white font-medium">{bridge.from}</span>
                    <span className="text-gray-400 mx-2">→</span>
                    <span className="text-white font-medium">{bridge.to}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">${bridge.volume.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">{bridge.count} txns</div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>

        <ChartContainer title="DeFi Protocol Analytics">
          <div className="space-y-4">
            {[
              { protocol: 'Uniswap V3', tvl: 4.2, volume24h: 890, fees24h: 2.67, apy: 15.3 },
              { protocol: 'Aave', tvl: 8.9, volume24h: 234, fees24h: 1.23, apy: 8.7 },
              { protocol: 'Compound', tvl: 3.1, volume24h: 167, fees24h: 0.89, apy: 6.2 },
              { protocol: 'Curve', tvl: 6.7, volume24h: 445, fees24h: 1.78, apy: 12.4 },
              { protocol: 'MakerDAO', tvl: 9.8, volume24h: 89, fees24h: 0.34, apy: 4.1 }
            ].map((protocol, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{protocol.protocol}</h4>
                  <span className="text-green-400 font-bold">{protocol.apy}% APY</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">TVL</div>
                    <div className="text-white font-medium">${protocol.tvl}B</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Volume</div>
                    <div className="text-white font-medium">${protocol.volume24h}M</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Fees</div>
                    <div className="text-white font-medium">${protocol.fees24h}M</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Whale Activity */}
      <ChartContainer title="Whale Activity Monitor">
        <div className="space-y-4">
          {[
            {
              address: '0x1234...5678',
              action: 'Large Transfer',
              amount: '15,000 ETH',
              usdValue: '$41.2M',
              time: '5 minutes ago',
              impact: 'high'
            },
            {
              address: '0xabcd...efgh',
              action: 'Exchange Deposit',
              amount: '2,500 BTC',
              usdValue: '$108.1M',
              time: '18 minutes ago',
              impact: 'medium'
            },
            {
              address: '0x9876...5432',
              action: 'DeFi Interaction',
              amount: '50,000 USDC',
              usdValue: '$50.0K',
              time: '45 minutes ago',
              impact: 'low'
            }
          ].map((activity, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-mono text-sm text-blue-400">{activity.address}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.impact === 'high' ? 'bg-red-500 text-red-900' :
                    activity.impact === 'medium' ? 'bg-yellow-500 text-yellow-900' :
                    'bg-green-500 text-green-900'
                  }`}>
                    {activity.impact.toUpperCase()}
                  </span>
                </div>
                <div className="text-white font-medium">{activity.action}</div>
                <div className="text-sm text-gray-400">{activity.amount} ({activity.usdValue})</div>
              </div>
              <div className="text-right text-sm text-gray-400">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>
    </div>
  );
}