import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import TestApp from './TestApp.tsx';
import './index.css';

// Global Chart.js registration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register all Chart.js components globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Temporary test mode - change to <App /> once working
const USE_TEST_MODE = false;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {USE_TEST_MODE ? <TestApp /> : <App />}
  </StrictMode>
);