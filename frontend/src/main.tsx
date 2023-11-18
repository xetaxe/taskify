import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/main.css'
import './styles/tasks.css'
import './styles/modals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
