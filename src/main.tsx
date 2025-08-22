import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/subtle-scroll-improvements.css'
import Router from './Router.tsx'
// ServiceWorker removed - unnecessary overhead for marketing site

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
