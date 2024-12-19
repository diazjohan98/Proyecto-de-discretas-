import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PuntoUnoDos from './PuntoUnoDos.jsx'
import Discretas from './Discretas.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PuntoUnoDos />
    <Discretas  />
  </StrictMode>,
)
