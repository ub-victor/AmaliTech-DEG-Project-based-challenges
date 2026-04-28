import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FlowProvider } from './FlowContext.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FlowProvider>
      <App />
    </FlowProvider>
  </StrictMode>
);