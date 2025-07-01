import React from 'react';
import { MetricCard } from '../common/MetricCard';
import { ChartContainer } from '../common/ChartContainer';
import { FileText, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';

export function ComplianceReporting() {
  const taxData = {
    labels: ['Short-term Gains', 'Long-term Gains', 'Losses', 'Interest', 'Staking', 'Mining'],
    datasets: [
      {
        data: [45000, 128000, -23000, 4500, 8900, 12000],
        backgroundColor: [
          '#EF4444',
          '#22C55E',
          '#F97316',
          '#3B82F6',
          '#8B5CF6',
          '#F59E0B'
        ],
        borderWidth: 2,
        borderColor: '#374151'
      }
    ]
  };

  const complianceData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Compliance Score',
        data: [95, 92, 98, 94],
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

  return (
    <div className="space-y-6">
      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Compliance Score"
          value="94.8%"
          change={2.1}
          icon={<CheckCircle className="w-6 h-6" />}
        />
        <MetricCard
          title="Tax Liability"
          value="$47,230"
          change={-8.5}
          icon={<DollarSign className="w-6 h-6" />}
        />
        <MetricCard
          title="Active Alerts"
          value="3"
          change={-2}
          changeType="absolute"
          icon={<AlertTriangle className="w-6 h-6" />}
        />
        <MetricCard
          title="Reports Generated"
          value="156"
          change={12}
          icon={<FileText className="w-6 h-6" />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Tax Breakdown (2024)">
          <div className="h-64">
            <Doughnut data={taxData} options={doughnutOptions} />
          </div>
        </ChartContainer>

        <ChartContainer title="Quarterly Compliance Score">
          <div className="h-64">
            <Bar data={complianceData} options={chartOptions} />
          </div>
        </ChartContainer>
      </div>

      {/* Transaction Audit */}
      <ChartContainer title="Recent Transaction Audit">
        <div className="space-y-4">
          {[
            {
              txHash: '0x1234567890abcdef...',
              type: 'Trade',
              amount: '2.5 BTC → 67,500 USDT',
              status: 'Verified',
              tax: '$2,340',
              date: '2024-01-15'
            },
            {
              txHash: '0xabcdef1234567890...',
              type: 'Staking Reward',
              amount: '0.125 ETH',
              status: 'Verified',
              tax: '$345',
              date: '2024-01-14'
            },
            {
              txHash: '0x9876543210fedcba...',
              type: 'DeFi Yield',
              amount: '150 USDC',
              status: 'Under Review',
              tax: '$54',
              date: '2024-01-13'
            },
            {
              txHash: '0xfedcba0987654321...',
              type: 'Transfer',
              amount: '1,000 USDT',
              status: 'Flagged',
              tax: '$0',
              date: '2024-01-12'
            }
          ].map((tx, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 p-4 bg-gray-700 rounded-lg items-center">
              <div>
                <div className="font-mono text-sm text-blue-400">{tx.txHash}</div>
                <div className="text-xs text-gray-400">{tx.date}</div>
              </div>
              <div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tx.type === 'Trade' ? 'bg-blue-500 text-blue-900' :
                  tx.type === 'Staking Reward' ? 'bg-green-500 text-green-900' :
                  tx.type === 'DeFi Yield' ? 'bg-purple-500 text-purple-900' :
                  'bg-gray-500 text-gray-900'
                }`}>
                  {tx.type}
                </span>
              </div>
              <div className="text-white text-sm">{tx.amount}</div>
              <div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tx.status === 'Verified' ? 'bg-green-500 text-green-900' :
                  tx.status === 'Under Review' ? 'bg-yellow-500 text-yellow-900' :
                  'bg-red-500 text-red-900'
                }`}>
                  {tx.status}
                </span>
              </div>
              <div className="text-white font-medium">{tx.tax}</div>
              <div className="text-right">
                <button className="text-blue-400 hover:text-blue-300 text-sm">Details</button>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>

      {/* Regulatory Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Regulatory Requirements">
          <div className="space-y-4">
            {[
              { requirement: 'KYC/AML Compliance', status: 'Compliant', lastCheck: '2024-01-10' },
              { requirement: 'FATCA Reporting', status: 'Compliant', lastCheck: '2024-01-08' },
              { requirement: 'GDPR Data Protection', status: 'Compliant', lastCheck: '2024-01-05' },
              { requirement: 'PCI DSS Security', status: 'Under Review', lastCheck: '2024-01-03' },
              { requirement: 'SOX Compliance', status: 'Compliant', lastCheck: '2024-01-01' },
              { requirement: 'MiFID II Reporting', status: 'Action Required', lastCheck: '2023-12-28' }
            ].map((req, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <div>
                  <div className="text-white font-medium">{req.requirement}</div>
                  <div className="text-sm text-gray-400">Last checked: {req.lastCheck}</div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  req.status === 'Compliant' ? 'bg-green-500 text-green-900' :
                  req.status === 'Under Review' ? 'bg-yellow-500 text-yellow-900' :
                  'bg-red-500 text-red-900'
                }`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </ChartContainer>

        <ChartContainer title="Cost Basis Tracking">
          <div className="space-y-4">
            {[
              { asset: 'BTC', method: 'FIFO', avgCost: 28450, current: 43234, unrealized: 52.0 },
              { asset: 'ETH', method: 'LIFO', avgCost: 1890, current: 2654, unrealized: 40.4 },
              { asset: 'ADA', method: 'Specific ID', avgCost: 0.34, current: 0.45, unrealized: 32.4 },
              { asset: 'DOT', method: 'FIFO', avgCost: 18.90, current: 22.45, unrealized: 18.8 },
              { asset: 'SOL', method: 'Average', avgCost: 89.50, current: 125.30, unrealized: 40.0 }
            ].map((asset, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{asset.asset}</h4>
                    <div className="text-xs text-gray-400">{asset.method} Method</div>
                  </div>
                  <span className="text-green-400 font-bold">+{asset.unrealized}%</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Avg Cost</div>
                    <div className="text-white font-medium">${asset.avgCost.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Current Price</div>
                    <div className="text-white font-medium">${asset.current.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Reporting Templates */}
      <ChartContainer title="Available Reports">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Tax Report (8949)', description: 'Capital gains and losses', format: 'PDF' },
            { name: 'Portfolio Summary', description: 'Complete portfolio overview', format: 'CSV' },
            { name: 'Transaction History', description: 'Detailed transaction log', format: 'Excel' },
            { name: 'Compliance Audit', description: 'Regulatory compliance check', format: 'PDF' },
            { name: 'Cost Basis Report', description: 'Asset cost basis analysis', format: 'CSV' },
            { name: 'Profit & Loss', description: 'P&L statement by period', format: 'PDF' }
          ].map((report, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">{report.name}</h4>
              <p className="text-sm text-gray-400 mb-3">{report.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs px-2 py-1 bg-blue-500 text-blue-900 rounded-full">
                  {report.format}
                </span>
                <button className="text-blue-400 hover:text-blue-300 text-sm">Generate</button>
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>
    </div>
  );
}