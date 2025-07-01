import React, { useState, useEffect } from 'react';
import { MetricCard } from '../common/MetricCard';
import { ChartContainer } from '../common/ChartContainer';
import { Brain, Cpu, Target, Zap } from 'lucide-react';
import { Line } from 'react-chartjs-2';

export function AIModelCenter() {
  const [modelPerformance, setModelPerformance] = useState<number[]>([]);
  const [accuracyData, setAccuracyData] = useState<number[]>([]);

  useEffect(() => {
    // Simulate real-time model performance data
    const generateData = () => {
      const newPerformance = Array.from({ length: 20 }, () => Math.random() * 0.3 + 0.7);
      const newAccuracy = Array.from({ length: 20 }, () => Math.random() * 0.15 + 0.85);
      
      setModelPerformance(newPerformance);
      setAccuracyData(newAccuracy);
    };

    generateData();
    const interval = setInterval(generateData, 5000);
    return () => clearInterval(interval);
  }, []);

  const performanceChartData = {
    labels: Array.from({ length: 20 }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: 'Model Performance',
        data: modelPerformance,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const accuracyChartData = {
    labels: Array.from({ length: 20 }, (_, i) => `${i + 1}`),
    datasets: [
      {
        label: 'Prediction Accuracy',
        data: accuracyData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
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
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Model Accuracy"
          value="94.2%"
          change={2.1}
          color="green"
          trend="up"
          description="Current ensemble model prediction accuracy"
          icon={<Target className="w-6 h-6" />}
        />
        <MetricCard
          title="Active Models"
          value="7"
          change={1}
          changeType="absolute"
          color="blue"
          trend="up"
          description="Number of models currently in production"
          icon={<Brain className="w-6 h-6" />}
        />
        <MetricCard
          title="Training Progress"
          value="87%"
          change={12}
          color="purple"
          trend="up"
          description="Current model training completion"
          icon={<Cpu className="w-6 h-6" />}
        />
        <MetricCard
          title="Ensemble Score"
          value="0.923"
          change={0.03}
          changeType="absolute"
          color="cyan"
          trend="up"
          description="Overall ensemble performance score"
          icon={<Zap className="w-6 h-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="Model Performance Over Time"
          subtitle="Real-time accuracy tracking"
          color="green"
        >
          <div className="h-64">
            <Line data={performanceChartData} options={chartOptions} />
          </div>
        </ChartContainer>

        <ChartContainer 
          title="Prediction Accuracy"
          subtitle="Ensemble prediction reliability"
          color="blue"
        >
          <div className="h-64">
            <Line data={accuracyChartData} options={chartOptions} />
          </div>
        </ChartContainer>
      </div>

      {/* Model Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer 
          title="Ensemble Model Weights"
          subtitle="Dynamic weight allocation"
          color="purple"
        >
          <div className="space-y-4">
            {[
              { name: 'LSTM Network', weight: 0.35, performance: 92.1 },
              { name: 'Random Forest', weight: 0.25, performance: 89.5 },
              { name: 'XGBoost', weight: 0.20, performance: 91.3 },
              { name: 'Neural Network', weight: 0.20, performance: 88.7 }
            ].map((model, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{model.name}</span>
                  <span className="text-green-400">{model.performance}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${model.weight * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">Weight: {(model.weight * 100).toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </ChartContainer>

        <ChartContainer title="Feature Importance Analysis">
          <div className="space-y-4">
            {[
              { feature: 'Price Momentum', importance: 0.28 },
              { feature: 'Volume Profile', importance: 0.22 },
              { feature: 'Social Sentiment', importance: 0.18 },
              { feature: 'Technical Indicators', importance: 0.16 },
              { feature: 'Market Correlation', importance: 0.12 },
              { feature: 'News Impact', importance: 0.04 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{item.feature}</span>
                  <span className="text-blue-400">{(item.importance * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.importance * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Training Status */}
      <ChartContainer title="Model Training Status">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { model: 'LSTM-v2.1', status: 'Training', progress: 87, eta: '2h 15m' },
            { model: 'Transformer-v1.3', status: 'Completed', progress: 100, eta: 'Done' },
            { model: 'CNN-LSTM-v2.0', status: 'Queued', progress: 0, eta: 'Pending' }
          ].map((item, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-white">{item.model}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.status === 'Training' ? 'bg-yellow-500 text-yellow-900' :
                  item.status === 'Completed' ? 'bg-green-500 text-green-900' :
                  'bg-gray-500 text-gray-900'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.status === 'Completed' ? 'bg-green-400' :
                      item.status === 'Training' ? 'bg-yellow-400' :
                      'bg-gray-500'
                    }`}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{item.progress}%</span>
                  <span>ETA: {item.eta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>
    </div>
  );
}