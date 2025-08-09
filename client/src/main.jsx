import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import { MotionConfig } from 'motion/react';

// Mount the React application
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      {/* MotionConfig helps set up animation defaults for framer-motion */}
      <MotionConfig viewport={{ once: true }}>
        <App />
      </MotionConfig>
    </AppProvider>
  </BrowserRouter>
);
