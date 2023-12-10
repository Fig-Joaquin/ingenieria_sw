import React from 'react'
import ReactDOM from 'react-dom/client'
import { CrearPagoBasura }  from './components/CrearAseo.jsx'
import { CrearPatenteComercial } from './components/CrearPatcom.jsx'
import { CrearPermisoCirculacion } from './components/CrearPermcirc.jsx'
import './styles/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CrearPatenteComercial/>
    <CrearPagoBasura/>
    <CrearPermisoCirculacion/>
  </React.StrictMode>,
)