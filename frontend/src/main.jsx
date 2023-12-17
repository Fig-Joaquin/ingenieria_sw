import React from 'react'
import ReactDOM from 'react-dom/client'
import { CrearPagoBasura }  from './components/forms/CrearAseo.jsx'
import { CrearPatenteComercial } from './components/forms/CrearPatcom.jsx'
import { CrearPermisoCirculacion } from './components/forms/CrearPermcirc.jsx'
import { CrearPermisoConstruccion } from './components/forms/CrearPermconst.jsx'
import { CrearPermisoEdificacion } from './components/forms/CrearPermedif.jsx'
import { CrearPermisoEventos } from './components/forms/CrearPermevent.jsx'
import './styles/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <CrearPatenteComercial/>
    <CrearPagoBasura/>
    <CrearPermisoCirculacion/>
    <CrearPermisoConstruccion/>
    <CrearPermisoEdificacion/>
    <CrearPermisoEventos/>
  </React.StrictMode>
)