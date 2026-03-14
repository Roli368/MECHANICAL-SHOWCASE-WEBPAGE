import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ErrorBoundary } from 'react-error-boundary'

function Fallback({ error }) {
  return (
    <div style={{ padding: '20px', color: 'red', background: '#000', height: '100vh', fontFamily: 'monospace' }}>
      <h2>CRITICAL RENDER ERROR:</h2>
      <pre style={{ color: 'white' }}>{error.message}</pre>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Fallback}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)