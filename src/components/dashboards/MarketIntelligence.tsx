import React, { useState, useEffect } from 'react';
import { MetricCard } from '../common/MetricCard';
import { ChartContainer } from '../common/ChartContainer';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, DollarSign, BarChart3 } from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useData } from '../../contexts/DataContext';

export function MarketIntelligence() {
  const { marketData } = useData();
  const [marketSentiment, setMarketSentiment] = useState(0);
  const [fearGreedIndex, setFearGreedIndex] = useState(0);
  const [volatilityData, setVolatilityData] = useState<number[]>([]);
  const [correlationData, setCorrelationData] = useState<number[]>([]);

  useEffect(() => {
    // Simulate market intelligence data
    const generateData = () => {
      setMarketSentiment(Math.random() * 100);
      setFearGreedIndex(Math.random() * 100);
      setVolatilityData(Array.from({ length: 24 }, () => Math.random() * 50 + 10));
      setCorrelationData(Array.from({ length: 12 }, () => Math.random() * 2 - 1));
    };

    generateData();
    const interval = setInterval(generateData, 3000);
    return () => clearInterval(interval);
  }, []);

  const getSentimentColor = (value: number) => {
    if (value > 70) return 'green';
    if (value > 30) return 'orange';
    return 'red';
  };

  const getSentimentText = (value: number) => {
    if (value > 70) return 'Bullish';
    if (value > 30) return 'Neutral';
    return 'Bearish';
  };

  const volatilityChartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Market Volatility',
        data: volatilityData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const correlationChartData = {
    labels: ['BTC/ETH', 'BTC/ADA', 'BTC/SOL', 'ETH/ADA', 'ETH/SOL', 'ADA/SOL'],
    datasets: [
      {
        label: 'Correlation Index',
        data: correlationData.slice(0, 6),
        backgroundColor: [
          'rgba(59, 130, 246, 0.6)',
          'rgba(16, 185, 129, 0.6)',
          'rgba(139, 92, 246, 0.6)',
          'rgba(236, 72, 153, 0.6)',
          'rgba(245, 158, 11, 0.6)',
          'rgba(34, 197, 94, 0.6)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)',
          'rgb(245, 158, 11)',
          'rgb(34, 197, 94)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const sentimentChartData = {
    labels: ['Bullish', 'Neutral', 'Bearish'],
    datasets: [
      {
        data: [marketSentiment, 100 - Math.abs(marketSentiment - 50) * 2, 100 - marketSentiment],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
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

  return (
    <div className="space-y-6">
      {/* Key Market Intelligence Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Market Sentiment"
          value={getSentimentText(marketSentiment)}
          change={marketSentiment - 50}
          color={getSentimentColor(marketSentiment)}
          trend={marketSentiment > 50 ? 'up' : 'down'}
          description="Overall market sentiment analysis from multiple sources"
          icon={marketSentiment > 50 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
        />
        <MetricCard
          title="Fear & Greed Index"
          value={fearGreedIndex.toFixed(0)}
          change={fearGreedIndex - 50}
          color={fearGreedIndex > 70 ? 'red' : fearGreedIndex > 30 ? 'orange' : 'green'}
          trend={fearGreedIndex > 50 ? 'up' : 'down'}
          description="Market fear and greed indicator (0-100 scale)"
          icon={<Activity className="w-6 h-6" />}
        />
        <MetricCard
          title="Market Volatility"
          value={`${volatilityData[volatilityData.length - 1]?.toFixed(1) || '0.0'}%`}
          change={5.2}
          color="purple"
          trend="up"
          description="Current market volatility index"
          icon={<BarChart3 className="w-6 h-6" />}
        />
        <MetricCard
          title="Risk Level"
          value="Moderate"
          change={-2.1}
          color="cyan"
          trend="down"
          description="Overall market risk assessment"
          icon={<AlertTriangle className="w-6 h-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="Market Volatility (24h)"
          subtitle="Hourly volatility tracking across major assets"
          color="red"
        >
          <div className="h-64">
            <Line data={volatilityChartData} options={chartOptions} />
          </div>
        </ChartContainer>

        <ChartContainer 
          title="Market Sentiment Distribution"
          subtitle="Current sentiment breakdown"
          color="green"
        >
          <div className="h-64">
            <Doughnut 
              data={sentimentChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: '#d1d5db',
                      usePointStyle: true,
                      pointStyle: 'circle',
                    },
                  },
                },
              }} 
            />
          </div>
        </ChartContainer>
      </div>

      {/* Market Intelligence Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartContainer 
          title="Asset Correlation Matrix"
          subtitle="Cross-asset correlation analysis"
          color="blue"
        >
          <div className="h-64">
            <Bar 
              data={correlationChartData} 
              options={{
                ...chartOptions,
                scales: {
                  ...chartOptions.scales,
                  y: {
                    ...chartOptions.scales.y,
                    min: -1,
                    max: 1,
                  },
                },
              }} 
            />
          </div>
        </ChartContainer>

        <ChartContainer 
          title="Top Market Movers"
          subtitle="Biggest gainers and losers"
          color="purple"
          className="lg:col-span-2"
        >
          <div className="space-y-3">
            {marketData.slice(0, 8).map((asset, index) => (
              <div 
                key={index}
                className="group flex items-center justify-between p-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                    {asset.symbol.substring(0, 3)}
                  </div>
                <div>
                    <div className="font-semibold text-white group-hover:text-blue-100 transition-colors">
                      {asset.symbol}
                    </div>
                    <div className="text-sm text-gray-400">
                      Vol: ${(asset.volume / 1000000).toFixed(1)}M
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-white">
                    ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className={`
                    text-sm font-semibold px-3 py-1 rounded-full transition-all duration-300
                    ${asset.changePercent >= 0 
                      ? 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30' 
                      : 'bg-red-500/20 text-red-400 group-hover:bg-red-500/30'
                    }
                  `}>
                    {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Market Intelligence Insights */}
      <ChartContainer 
        title="AI Market Insights"
        subtitle="Real-time analysis and predictions"
        color="cyan"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Key Insights</h4>
            {[
              { 
                title: 'Bitcoin Dominance Rising', 
                description: 'BTC dominance increased by 2.3% indicating potential alt-coin weakness',
                confidence: 85,
                type: 'warning'
              },
              { 
                title: 'DeFi Sector Momentum', 
                description: 'Strong buying pressure detected in major DeFi tokens',
                confidence: 92,
                type: 'bullish'
              },
              { 
                title: 'Institutional Flow', 
                description: 'Large institutional purchases detected in ETH',
                confidence: 78,
                type: 'bullish'
              }
            ].map((insight, index) => (
              <div 
                key={index}
                className="group p-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start space-x-3">
                  <div className={`
                    w-3 h-3 rounded-full mt-2 animate-pulse
                    ${insight.type === 'bullish' ? 'bg-green-400' : 
                      insight.type === 'warning' ? 'bg-yellow-400' : 'bg-red-400'}
                  `} />
                  <div className="flex-1">
                    <h5 className="font-semibold text-white group-hover:text-blue-100 transition-colors">
                      {insight.title}
                    </h5>
                    <p className="text-sm text-gray-400 mt-1">
                      {insight.description}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-gray-500 mr-2">Confidence:</span>
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${insight.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 ml-2">{insight.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
                </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Market Signals</h4>
            <div className="space-y-3">
              {[
                { signal: 'RSI Oversold', asset: 'ADA', strength: 'Strong', color: 'green' },
                { signal: 'MACD Bullish Cross', asset: 'ETH', strength: 'Medium', color: 'blue' },
                { signal: 'Volume Spike', asset: 'SOL', strength: 'Strong', color: 'purple' },
                { signal: 'Support Break', asset: 'BTC', strength: 'Weak', color: 'red' }
              ].map((signal, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full bg-${signal.color}-400 animate-pulse`} />
                    <div>
                      <div className="text-sm font-semibold text-white">{signal.signal}</div>
                      <div className="text-xs text-gray-400">{signal.asset}</div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-${signal.color}-500/20 text-${signal.color}-400`}>
                    {signal.strength}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ChartContainer>
    </div>
  );
}