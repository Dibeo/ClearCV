import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' 
import { HashRouter } from 'react-router-dom'
import './i18n.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Suspense fallback="Initialisation...">
        <App />
      </Suspense>
    </HashRouter>
  </React.StrictMode>,
)