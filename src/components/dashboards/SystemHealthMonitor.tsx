import React, { useState, useEffect } from 'react';
import { MetricCard } from '../common/MetricCard';
import { ChartContainer } from '../common/ChartContainer';
import { Activity, Server, Database, Wifi } from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useData } from '../../contexts/DataContext';

export function SystemHealthMonitor() {
  const { systemHealth } = useData();
  const [performanceData, setPerformanceData] = useState<number[]>([]);
  const [errorData, setErrorData] = useState<number[]>([]);

  useEffect(() => {
    const generateData = () => {
      const newPerformance = Array.from({ length: 24 }, () => Math.random() * 100);
      const newError = Array.from({ length: 7 }, () => Math.floor(Math.random() * 50));
      
      setPerformanceData(newPerformance);
      setErrorData(newError);
    };

    generateData();
    const interval = setInterval(generateData, 3000);
    return () => clearInterval(interval);
  }, []);

  const performanceChartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: performanceData.map(val => val * 0.8),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Memory Usage (%)',
        data: performanceData.map(val => val * 0.6 + 20),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const errorChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Error Count',
        data: errorData,
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      },
    ],
  };

  const storageData = {
    labels: ['Used', 'Available'],
    datasets: [
      {
        data: [73, 27],
        backgroundColor: ['#EF4444', '#374151'],
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

  const services = [
    { name: 'Trading Engine', status: 'Running', uptime: '99.98%', cpu: 23, memory: 45 },
    { name: 'Market Data Feed', status: 'Running', uptime: '99.95%', cpu: 15, memory: 32 },
    { name: 'Risk Manager', status: 'Running', uptime: '100%', cpu: 8, memory: 28 },
    { name: 'Database Cluster', status: 'Warning', uptime: '98.7%', cpu: 67, memory: 78 },
    { name: 'API Gateway', status: 'Running', uptime: '99.92%', cpu: 12, memory: 35 },
    { name: 'Notification Service', status: 'Error', uptime: '95.2%', cpu: 0, memory: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="CPU Usage"
          value={`${Math.round(systemHealth.cpu)}%`}
          change={-3.2}
          icon={<Activity className="w-6 h-6" />}
        />
        <MetricCard
          title="Memory Usage"
          value={`${Math.round(systemHealth.memory)}%`}
          change={5.1}
          icon={<Server className="w-6 h-6" />}
        />
        <MetricCard
          title="Response Time"
          value={`${Math.round(systemHealth.latency)}ms`}
          change={-2}
          changeType="absolute"
          icon={<Wifi className="w-6 h-6" />}
        />
        <MetricCard
          title="Uptime"
          value={systemHealth.uptime}
          change={0.1}
          icon={<Database className="w-6 h-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="System Performance (24h)">
          <div className="h-64">
            <Line data={performanceChartData} options={chartOptions} />
          </div>
        </ChartContainer>

        <ChartContainer title="Error Count (7 days)">
          <div className="h-64">
            <Bar data={errorChartData} options={chartOptions} />
          </div>
        </ChartContainer>
      </div>

      {/* Service Status */}
      <ChartContainer title="Service Health Status">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-white">{service.name}</h4>
                <div className={`w-3 h-3 rounded-full ${
                  service.status === 'Running' ? 'bg-green-400' :
                  service.status === 'Warning' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`}></div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className={`font-medium ${
                    service.status === 'Running' ? 'text-green-400' :
                    service.status === 'Warning' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {service.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-white">{service.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">CPU</span>
                  <span className="text-white">{service.cpu}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Memory</span>
                  <span className="text-white">{service.memory}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>

      {/* Storage and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Storage Usage">
          <div className="h-64">
            <Doughnut data={storageData} options={doughnutOptions} />
          </div>
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold text-white">2.1 TB</div>
            <div className="text-gray-400">of 2.9 TB used</div>
          </div>
        </ChartContainer>

        <ChartContainer title="System Alerts">
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {[
              {
                level: 'Critical',
                message: 'Database connection pool exhausted',
                time: '2 minutes ago',
                service: 'Database Cluster'
              },
              {
                level: 'Warning',
                message: 'High memory usage detected on trading engine',
                time: '15 minutes ago',
                service: 'Trading Engine'
              },
              {
                level: 'Info',
                message: 'Scheduled maintenance completed successfully',
                time: '1 hour ago',
                service: 'API Gateway'
              },
              {
                level: 'Warning',
                message: 'Increased response time on market data feed',
                time: '2 hours ago',
                service: 'Market Data Feed'
              }
            ].map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                alert.level === 'Critical' ? 'bg-red-900/20 border-red-500' :
                alert.level === 'Warning' ? 'bg-yellow-900/20 border-yellow-500' :
                'bg-blue-900/20 border-blue-500'
              }`}>
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-sm font-semibold ${
                    alert.level === 'Critical' ? 'text-red-400' :
                    alert.level === 'Warning' ? 'text-yellow-400' :
                    'text-blue-400'
                  }`}>
                    {alert.level}
                  </span>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
                <p className="text-gray-300 text-sm mb-1">{alert.message}</p>
                <p className="text-xs text-gray-500">{alert.service}</p>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Database Performance */}
      <ChartContainer title="Database Performance Metrics">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { metric: 'Query Response Time', value: '12ms', status: 'good', trend: 'down' },
            { metric: 'Active Connections', value: '47/100', status: 'good', trend: 'stable' },
            { metric: 'Cache Hit Ratio', value: '94.2%', status: 'good', trend: 'up' },
            { metric: 'Disk I/O', value: '234 MB/s', status: 'warning', trend: 'up' }
          ].map((metric, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-medium text-gray-300">{metric.metric}</h4>
                <div className={`w-2 h-2 rounded-full ${
                  metric.status === 'good' ? 'bg-green-400' :
                  metric.status === 'warning' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`}></div>
              </div>
              <div className="text-xl font-bold text-white mb-1">{metric.value}</div>
              <div className={`text-xs ${
                metric.trend === 'up' ? 'text-green-400' :
                metric.trend === 'down' ? 'text-red-400' :
                'text-gray-400'
              }`}>
                {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'} {metric.trend}
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>
    </div>
  );
}