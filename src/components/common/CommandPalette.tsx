import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Clock, Star } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  dashboards: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
    icon: string;
  }>;
  recentDashboards: string[];
  onNavigate: (dashboardId: string) => void;
}

export function CommandPalette({ 
  isOpen, 
  onClose, 
  dashboards, 
  recentDashboards, 
  onNavigate 
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter dashboards based on query
  const filteredDashboards = dashboards.filter(dashboard =>
    dashboard.name.toLowerCase().includes(query.toLowerCase()) ||
    dashboard.description.toLowerCase().includes(query.toLowerCase()) ||
    dashboard.category.toLowerCase().includes(query.toLowerCase())
  );

  // Get recent dashboards
  const recentDashboardsData = recentDashboards
    .map(id => dashboards.find(d => d.id === id))
    .filter(Boolean)
    .slice(0, 3);

  const allCommands = [
    ...(query === '' ? recentDashboardsData.map(d => ({ ...d, type: 'recent' })) : []),
    ...filteredDashboards.map(d => ({ ...d, type: 'dashboard' }))
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, allCommands.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (allCommands[selectedIndex]) {
          onNavigate(allCommands[selectedIndex].id);
          onClose();
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Command Palette */}
      <div className="relative w-full max-w-lg bg-gray-800/95 backdrop-blur-xl border border-gray-600 rounded-2xl shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center p-4 border-b border-gray-700">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search dashboards..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
          />
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {query === '' && recentDashboardsData.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Recent
              </div>
            </div>
          )}

          {allCommands.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No dashboards found
            </div>
          ) : (
            <div className="p-2">
              {allCommands.map((command, index) => (
                <button
                  key={command.id}
                  onClick={() => {
                    onNavigate(command.id);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center p-3 rounded-xl text-left transition-all duration-200
                    ${index === selectedIndex 
                      ? 'bg-blue-500/20 border border-blue-500/30' 
                      : 'hover:bg-gray-700/50'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    {command.type === 'recent' && (
                      <Clock className="w-4 h-4 text-gray-400" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-white">{command.name}</div>
                      <div className="text-sm text-gray-400">{command.description}</div>
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
                      {command.category}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700 text-xs text-gray-400 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span><kbd className="px-2 py-1 bg-gray-700 rounded">↑↓</kbd> navigate</span>
            <span><kbd className="px-2 py-1 bg-gray-700 rounded">⏎</kbd> select</span>
          </div>
          <span><kbd className="px-2 py-1 bg-gray-700 rounded">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

// Hook for using command palette
export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}