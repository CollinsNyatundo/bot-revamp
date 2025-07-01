import React from 'react';

export const TestApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🚀 Dashboard App Test</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-green-400">✅ System Status</h2>
            <ul className="space-y-2 text-gray-300">
              <li>React: Loaded</li>
              <li>TypeScript: Compiled</li>
              <li>Tailwind: Styled</li>
              <li>Vite: Built</li>
              <li>Vercel: Deployed</li>
            </ul>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">🔧 Quick Test</h2>
            <button 
              onClick={() => alert('JavaScript is working!')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
            >
              Test Interaction
            </button>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-green-900 rounded-lg">
          <h3 className="text-lg font-semibold text-green-200 mb-2">Success!</h3>
          <p className="text-green-100">
            If you can see this page, your Vercel deployment is working correctly. 
            The blank page issue has been resolved!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestApp; 