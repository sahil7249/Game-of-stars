import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GameApp from './App.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameApp />
  </StrictMode>,
)
