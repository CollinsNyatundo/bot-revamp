import React, { createContext, useContext, useState, useEffect } from 'react';

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: number;
}

interface DataContextType {
  marketData: MarketData[];
  systemHealth: {
    cpu: number;
    memory: number;
    latency: number;
    uptime: string;
  };
  portfolioValue: number;
  isConnected: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [systemHealth, setSystemHealth] = useState({
    cpu: 45,
    memory: 62,
    latency: 12,
    uptime: '5d 14h 23m'
  });
  const [portfolioValue, setPortfolioValue] = useState(2847562.45);
  const [isConnected, setIsConnected] = useState(true);

  // Fetch real data from backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch market data
        const marketResponse = await fetch('/api/market/data');
        if (marketResponse.ok) {
          const marketDataResponse = await marketResponse.json();
          const formattedData = Object.entries(marketDataResponse).map(([symbol, data]: [string, any]) => ({
            symbol: symbol.replace('-', '/'),
            price: data.price,
            change: data.change,
            changePercent: data.change_percent,
            volume: data.volume,
            timestamp: new Date(data.timestamp).getTime()
          }));
          setMarketData(formattedData);
        }

        // Fetch portfolio data
        const portfolioResponse = await fetch('/api/portfolio/summary');
        if (portfolioResponse.ok) {
          const portfolioData = await portfolioResponse.json();
          setPortfolioValue(portfolioData.total_value);
        }

        // Fetch bot status for system health
        const statusResponse = await fetch('/api/bot/status');
        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          setSystemHealth(prev => ({
            ...prev,
            uptime: statusData.uptime || prev.uptime
          }));
          setIsConnected(statusData.status === 'online');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsConnected(false);
        
        // Fallback to mock data if API is not available
        const symbols = ['BTC/EUR', 'ETH/EUR', 'BNB/EUR', 'ADA/EUR', 'SOL/EUR'];
        const fallbackData = symbols.map(symbol => ({
          symbol,
          price: Math.random() * 50000 + 1000,
          change: (Math.random() - 0.5) * 1000,
          changePercent: (Math.random() - 0.5) * 10,
          volume: Math.random() * 1000000000,
          timestamp: Date.now()
        }));
        setMarketData(fallbackData);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling for real-time updates
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider value={{
      marketData,
      systemHealth,
      portfolioValue,
      isConnected
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}