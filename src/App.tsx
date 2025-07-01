import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardContainer } from './components/layout/DashboardContainer';
import { AIModelCenter } from './components/dashboards/AIModelCenter';
import { RiskManagementHub } from './components/dashboards/RiskManagementHub';
import { ExchangeIntegration } from './components/dashboards/ExchangeIntegration';
import { MarketIntelligence } from './components/dashboards/MarketIntelligence';
import { PortfolioAnalytics } from './components/dashboards/PortfolioAnalytics';
import { BlockchainAnalytics } from './components/dashboards/BlockchainAnalytics';
import { StrategyDevelopment } from './components/dashboards/StrategyDevelopment';
import { ComplianceReporting } from './components/dashboards/ComplianceReporting';
import { SystemHealthMonitor } from './components/dashboards/SystemHealthMonitor';
import { TradingCommandCenter } from './components/dashboards/TradingCommandCenter';
import { UserProfile } from './components/dashboards/UserProfile';
import { NotificationsCenter } from './components/dashboards/NotificationsCenter';
import { SettingsPage } from './components/dashboards/SettingsPage';
import { DataProvider } from './contexts/DataContext';

// Loading component with enhanced animations
function LoadingScreen() {
  const [loadingText, setLoadingText] = useState('Initializing AI Systems');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadingSteps = [
      'Initializing AI Systems',
      'Connecting to Exchanges',
      'Loading Market Data',
      'Calibrating Models',
      'Finalizing Setup'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length - 1) {
        currentStep++;
        setLoadingText(loadingSteps[currentStep]);
        setProgress((currentStep / (loadingSteps.length - 1)) * 100);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-md mx-auto px-6">
        {/* Logo animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animate-reverse"></div>
            <div className="absolute inset-2 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-fade-in">
            AI Trading Suite
          </h1>
          <p className="text-gray-400 text-lg animate-fade-in animation-delay-500">
            Next-Generation Crypto Intelligence
          </p>
        </div>

        {/* Loading text */}
        <div className="space-y-4 animate-fade-in animation-delay-1000">
          <p className="text-xl font-semibold text-white">
            {loadingText}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Percentage */}
          <p className="text-sm text-gray-400 font-mono">
            {Math.round(progress)}% Complete
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2 animate-fade-in animation-delay-1500">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Enhanced Error Boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null; errorInfo: string | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      errorInfo: errorInfo.componentStack
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-900/20 via-gray-900 to-gray-800 text-white flex items-center justify-center p-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-red-400 mb-4">System Error Detected</h1>
            <p className="text-gray-300 text-lg mb-6">
              The AI Trading Suite encountered an unexpected error. Our systems are designed to be resilient, but something went wrong.
            </p>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-left">
              <h3 className="text-lg font-semibold text-red-300 mb-3">Error Details:</h3>
              <pre className="text-sm text-gray-400 overflow-x-auto bg-gray-900/50 p-4 rounded-lg">
              {this.state.error?.toString()}
            </pre>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
                className="btn-primary"
              >
                Retry System
              </button>
            <button
                onClick={() => window.location.reload()}
                className="btn-ghost"
            >
                Reload Application
            </button>
            </div>

            <p className="text-sm text-gray-500">
              If the problem persists, please contact our technical support team.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Enhanced Dashboard configuration with better categorization and metadata
const dashboards = [
  { 
    id: 'ai-model', 
    name: 'AI Model Center', 
    component: AIModelCenter, 
    icon: 'Brain',
    color: 'purple',
    category: 'AI & Intelligence',
    description: 'Monitor and control AI trading models',
    priority: 1
  },
  { 
    id: 'trading-command', 
    name: 'Trading Command', 
    component: TradingCommandCenter, 
    icon: 'Command',
    color: 'blue',
    category: 'Trading',
    description: 'Execute and monitor trading operations',
    priority: 1
  },
  { 
    id: 'market-intelligence', 
    name: 'Market Intelligence', 
    component: MarketIntelligence, 
    icon: 'TrendingUp',
    color: 'green',
    category: 'Analytics',
    description: 'Real-time market analysis and insights',
    priority: 1
  },
  { 
    id: 'risk-management', 
    name: 'Risk Management', 
    component: RiskManagementHub, 
    icon: 'Shield',
    color: 'orange',
    category: 'Trading',
    description: 'Monitor and manage trading risks',
    priority: 2
  },
  { 
    id: 'portfolio-analytics', 
    name: 'Portfolio Analytics', 
    component: PortfolioAnalytics, 
    icon: 'PieChart',
    color: 'cyan',
    category: 'Analytics',
    description: 'Comprehensive portfolio performance',
    priority: 2
  },
  { 
    id: 'exchange-integration', 
    name: 'Exchange Integration', 
    component: ExchangeIntegration, 
    icon: 'ArrowLeftRight',
    color: 'purple',
    category: 'Infrastructure',
    description: 'Manage exchange connections',
    priority: 3
  },
  { 
    id: 'blockchain-analytics', 
    name: 'Blockchain Analytics', 
    component: BlockchainAnalytics, 
    icon: 'Link2',
    color: 'blue',
    category: 'Analytics',
    description: 'On-chain analysis and monitoring',
    priority: 3
  },
  { 
    id: 'strategy-development', 
    name: 'Strategy Development', 
    component: StrategyDevelopment, 
    icon: 'Target',
    color: 'green',
    category: 'Development',
    description: 'Build and test trading strategies',
    priority: 2
  },
  { 
    id: 'compliance-reporting', 
    name: 'Compliance & Reporting', 
    component: ComplianceReporting, 
    icon: 'FileText',
    color: 'orange',
    category: 'Compliance',
    description: 'Regulatory compliance and reports',
    priority: 3
  },
  { 
    id: 'system-health', 
    name: 'System Health', 
    component: SystemHealthMonitor, 
    icon: 'Activity',
    color: 'red',
    category: 'System',
    description: 'Monitor system performance',
    priority: 2
  },
  { 
    id: 'notifications', 
    name: 'Notifications', 
    component: NotificationsCenter, 
    icon: 'Bell',
    color: 'cyan',
    category: 'System',
    description: 'Manage alerts and notifications',
    priority: 3
  },
  { 
    id: 'user-profile', 
    name: 'User Profile', 
    component: UserProfile, 
    icon: 'User',
    color: 'purple',
    category: 'Account',
    description: 'User settings and preferences',
    priority: 3
  },
  { 
    id: 'settings', 
    name: 'Settings', 
    component: SettingsPage, 
    icon: 'Settings',
    color: 'blue',
    category: 'System',
    description: 'System configuration',
    priority: 3
  }
];

function App() {
  const [activeDashboard, setActiveDashboard] = useState('ai-model');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [dashboardHistory, setDashboardHistory] = useState<string[]>(['ai-model']);
  const [showCommandPalette, setShowCommandPalette] = useState(false); // State for command palette

  useEffect(() => {
    // Enhanced loading simulation with progress tracking
    const loadingSteps = [
      'Initializing Core Systems',
      'Loading AI Models',
      'Connecting to Exchanges',
      'Synchronizing Market Data',
      'Calibrating Risk Models',
      'Finalizing Interface'
    ];

    let currentStep = 0;
    const stepInterval = setInterval(() => {
      if (currentStep < loadingSteps.length - 1) {
        currentStep++;
      } else {
        clearInterval(stepInterval);
        setTimeout(() => setIsLoading(false), 800);
      }
    }, 600);

    return () => clearInterval(stepInterval);
  }, []);

  // Enhanced dashboard change handler with history tracking
  const handleDashboardChange = (id: string) => {
    setActiveDashboard(id);
    setDashboardHistory(prev => {
      const newHistory = [id, ...prev.filter(item => item !== id)];
      return newHistory.slice(0, 5); // Keep only last 5 visited
    });
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault();
            setSidebarCollapsed(!sidebarCollapsed);
            break;
          case 'k':
            e.preventDefault();
            setShowCommandPalette(true);
            break;
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
            e.preventDefault();
            const priorityDashboards = dashboards.filter(d => d.priority === 1);
            const index = parseInt(e.key) - 1;
            if (priorityDashboards[index]) {
              handleDashboardChange(priorityDashboards[index].id);
            }
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [sidebarCollapsed, setShowCommandPalette]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center relative overflow-hidden">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        {/* Matrix-style background */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-green-400 animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-md mx-auto px-6">
          {/* Enhanced logo animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animate-reverse"></div>
              <div className="absolute inset-3 w-18 h-18 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-6 w-12 h-12 border-2 border-cyan-400 rounded-full animate-ping"></div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-fade-in">
              AI Trading Suite
            </h1>
            <p className="text-gray-400 text-xl animate-fade-in animation-delay-500">
              Next-Generation Crypto Intelligence Platform
            </p>
            <p className="text-sm text-gray-500 animate-fade-in animation-delay-1000">
              Powered by Advanced Machine Learning & Real-time Analytics
            </p>
          </div>

          {/* Enhanced loading animation */}
          <div className="space-y-6 animate-fade-in animation-delay-1000">
            <div className="flex justify-center space-x-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>

            <div className="text-center space-y-3">
              <div className="text-lg font-semibold text-blue-100">
                Initializing Systems...
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ActiveComponent = dashboards.find(d => d.id === activeDashboard)?.component || AIModelCenter;
  const activeDashboardData = dashboards.find(d => d.id === activeDashboard);

  return (
    <ErrorBoundary>
      <DataProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
          {/* Enhanced background effects */}
          <div className="fixed inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-70"></div>
              <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-70"></div>
              <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 opacity-70"></div>
            </div>
          </div>

          {/* Noise texture overlay */}
          <div className="fixed inset-0 opacity-5 pointer-events-none bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>

          <div className="relative z-10 flex h-screen">
            <Sidebar
              dashboards={dashboards}
              activeDashboard={activeDashboard}
              onDashboardChange={handleDashboardChange}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
            <Header
              title={activeDashboardData?.name || 'Dashboard'}
              onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Breadcrumb Navigation */}
            <nav className="px-6 py-2 bg-gray-800/50 border-b border-white/10" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <button 
                    onClick={() => handleDashboardChange('ai-model')} 
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Go to home dashboard"
                  >
                    Home
                  </button>
                </li>
                {activeDashboardData && (
                  <>
                    <span className="text-gray-600">/</span>
                    <li>
                      <span className="text-gray-300 font-medium" aria-current="page">
                        {activeDashboardData.category}
                      </span>
                    </li>
                    <span className="text-gray-600">/</span>
                    <li>
                      <span className="text-white font-semibold" aria-current="page">
                        {activeDashboardData.name}
                      </span>
                    </li>
                  </>
                )}
              </ol>
            </nav>

            <DashboardContainer>
              <div className="animate-fade-in">
                {/* Dashboard category badge */}
                {activeDashboardData && (
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`
                        px-4 py-2 rounded-full text-sm font-semibold
                        bg-gradient-to-r from-${activeDashboardData.color}-500/20 to-${activeDashboardData.color}-600/20
                        border border-${activeDashboardData.color}-500/30
                        text-${activeDashboardData.color}-300
                      `}>
                        {activeDashboardData.category}
                      </div>
                      <div className="text-sm text-gray-400">
                        {activeDashboardData.description}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setShowCommandPalette(true)}
                        className="btn-ghost text-xs px-3 py-1"
                        aria-label="Open command palette"
                      >
                        ⌘K
                      </button>
                    </div>
                  </div>
                )}

                <ActiveComponent />
              </div>
            </DashboardContainer>
          </div>

          {/* Keyboard shortcuts help (hidden by default, can be shown with ? key) */}
          <div className="fixed bottom-4 left-4 text-xs text-gray-500 space-y-1 opacity-50 hover:opacity-100 transition-opacity duration-300">
            <div>Ctrl/Cmd + B: Toggle Sidebar</div>
            <div>Ctrl/Cmd + K: Command Palette</div>
            <div>Ctrl/Cmd + 1-5: Quick Dashboard Switch</div>
          </div>
        </div>
      </DataProvider>
    </ErrorBoundary>
  );
}

export default App;