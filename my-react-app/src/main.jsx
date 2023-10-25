import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ContextProvider from './context/context.jsx';
import Contador from './componentes/contador/contador.jsx';
import ComprarMejora from './componentes/comprarMejora/comprarMejora.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
    <App />
    <Contador />
    <ComprarMejora />
    </ContextProvider>
  </React.StrictMode>,
)
