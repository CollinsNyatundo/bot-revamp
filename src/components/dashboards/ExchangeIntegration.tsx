import React, { useState, useEffect } from 'react';
import { MetricCard } from '../common/MetricCard';
import { ChartContainer } from '../common/ChartContainer';
import { ArrowLeftRight, Wifi, Clock, Activity } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';

export function ExchangeIntegration() {
  const [latencyData, setLatencyData] = useState<number[]>([]);
  const [volumeData, setVolumeData] = useState<number[]>([]);

  useEffect(() => {
    const generateData = () => {
      const newLatency = Array.from({ length: 20 }, () => Math.random() * 50 + 10);
      const newVolume = Array.from({ length: 8 }, () => Math.random() * 1000000 + 500000);
      
      setLatencyData(newLatency);
      setVolumeData(newVolume);
    };

    generateData();
    const interval = setInterval(generateData, 3000);
    return () => clearInterval(interval);
  }, []);

  const latencyChartData = {
    labels: Array.from({ length: 20 }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: 'Latency (ms)',
        data: latencyData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const volumeChartData = {
    labels: ['Binance', 'Coinbase', 'Kraken', 'Bitfinex', 'Huobi', 'KuCoin', 'FTX', 'Bybit'],
    datasets: [
      {
        label: 'Volume (24h)',
        data: volumeData,
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        borderColor: 'rgb(34, 197, 94)',
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

  const exchanges = [
    { name: 'Binance', status: 'connected', latency: 12, uptime: '99.9%', orders: 1250 },
    { name: 'Coinbase Pro', status: 'connected', latency: 18, uptime: '99.8%', orders: 890 },
    { name: 'Kraken', status: 'connected', latency: 25, uptime: '99.7%', orders: 450 },
    { name: 'Bitfinex', status: 'warning', latency: 45, uptime: '98.5%', orders: 320 },
    { name: 'Huobi', status: 'connected', latency: 30, uptime: '99.2%', orders: 180 },
    { name: 'KuCoin', status: 'error', latency: 0, uptime: '0%', orders: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Connection Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Connections"
          value="5/6"
          change={-1}
          changeType="absolute"
          icon={<Wifi className="w-6 h-6" />}
        />
        <MetricCard 
          title="Avg Latency"
          value="24ms"
          change={-8}
          changeType="absolute"
          icon={<Clock className="w-6 h-6" />}
        />
        <MetricCard
          title="Orders Today"
          value="3,090"
          change={15.2}
          icon={<ArrowLeftRight className="w-6 h-6" />}
        />
        <MetricCard
          title="Data Quality"
          value="98.7%"
          change={0.3}
          icon={<Activity className="w-6 h-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Latency Monitoring">
          <div className="h-64">
            <Line data={latencyChartData} options={chartOptions} />
          </div>
        </ChartContainer>

        <ChartContainer title="Exchange Volume (24h)">
          <div className="h-64">
            <Bar data={volumeChartData} options={chartOptions} />
          </div>
        </ChartContainer>
      </div>

      {/* Exchange Status */}
      <ChartContainer title="Exchange Connection Status">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exchanges.map((exchange, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-white">{exchange.name}</h4>
                <div className={`w-3 h-3 rounded-full ${
                  exchange.status === 'connected' ? 'bg-green-400' :
                  exchange.status === 'warning' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`}></div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Latency</span>
                  <span className="text-white">{exchange.latency}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-white">{exchange.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Orders</span>
                  <span className="text-white">{exchange.orders.toLocaleString()}</span>
                </div>
                <div className="mt-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    exchange.status === 'connected' ? 'bg-green-500 text-green-900' :
                    exchange.status === 'warning' ? 'bg-yellow-500 text-yellow-900' :
                    'bg-red-500 text-red-900'
                  }`}>
                    {exchange.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>

      {/* Order Book */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Order Book - BTC/USDT">
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-4 text-sm font-semibold text-gray-400 border-b border-gray-600 pb-2">
              <span>Price</span>
              <span className="text-center">Size</span>
              <span className="text-right">Total</span>
            </div>
            {/* Sell Orders */}
            {[
              { price: 43250.50, size: 0.234, total: 0.234 },
              { price: 43245.25, size: 0.567, total: 0.801 },
              { price: 43240.00, size: 0.123, total: 0.924 },
              { price: 43235.75, size: 0.890, total: 1.814 }
            ].map((order, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 text-sm py-1 text-red-400">
                <span>{order.price.toFixed(2)}</span>
                <span className="text-center">{order.size.toFixed(3)}</span>
                <span className="text-right">{order.total.toFixed(3)}</span>
              </div>
            ))}
            <div className="border-t border-gray-600 pt-2 mt-2">
              <div className="text-center text-lg font-bold text-white">43,234.50</div>
            </div>
            {/* Buy Orders */}
            {[
              { price: 43230.25, size: 0.456, total: 0.456 },
              { price: 43225.00, size: 0.789, total: 1.245 },
              { price: 43220.75, size: 0.321, total: 1.566 },
              { price: 43215.50, size: 0.654, total: 2.220 }
            ].map((order, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 text-sm py-1 text-green-400">
                <span>{order.price.toFixed(2)}</span>
                <span className="text-center">{order.size.toFixed(3)}</span>
                <span className="text-right">{order.total.toFixed(3)}</span>
              </div>
            ))}
          </div>
        </ChartContainer>

        <ChartContainer title="Arbitrage Opportunities">
          <div className="space-y-4">
            {[
              { pair: 'BTC/USDT', exchange1: 'Binance', price1: 43234.50, exchange2: 'Coinbase', price2: 43287.25, profit: 0.12 },
              { pair: 'ETH/USDT', exchange1: 'Kraken', price1: 2654.30, exchange2: 'Bitfinex', price2: 2661.85, profit: 0.28 },
              { pair: 'ADA/USDT', exchange1: 'Huobi', price1: 0.4521, exchange2: 'Binance', price2: 0.4534, profit: 0.29 }
            ].map((opportunity, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{opportunity.pair}</h4>
                  <span className="text-green-400 font-bold">+{opportunity.profit}%</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">{opportunity.exchange1}</div>
                    <div className="text-white font-medium">${opportunity.price1.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">{opportunity.exchange2}</div>
                    <div className="text-white font-medium">${opportunity.price2.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>
    </div>
  );
}