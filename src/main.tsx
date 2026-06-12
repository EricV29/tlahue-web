import '@fontsource/source-sans-pro/300.css';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/600.css';
import '@fontsource/source-sans-pro/700.css';

import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { validateEnv } from './services/env'
import './index.css'
import App from './App.tsx'
import ScrollToTop from './components/ScrollToTop'

try {
  validateEnv()
} catch (e) {
  const root = document.getElementById('root')
  if (root) {
    root.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:2rem;font-family:Inter,sans-serif;text-align:center;background:#fefefe"><h1 style="font-size:1.5rem;color:#111827;margin-bottom:0.5rem">Error de configuración</h1><p style="color:#4b5563;max-width:480px">${String(e instanceof Error ? e.message : e)}</p></div>`
  }
  throw e
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
