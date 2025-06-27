import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Router
import { AuthProvider } from './context/AuthContext'; // Auth Context provider
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>           {/* Wrap with AuthProvider */}
      <BrowserRouter>        {/* Then wrap with Router */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
