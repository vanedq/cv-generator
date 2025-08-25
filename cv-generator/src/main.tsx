import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CVGenerator } from './screens/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CVGenerator />
  </StrictMode>,
)
