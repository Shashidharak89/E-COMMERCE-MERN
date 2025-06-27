import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // ✅ import router
import './index.css'
import App from './App.jsx'
import { SampleState } from "./contexts/SampleState.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SampleState>
      <BrowserRouter> {/* ✅ Wrap App in Router */}

        <App />
      </BrowserRouter>
    </SampleState>
  </StrictMode>,
);
