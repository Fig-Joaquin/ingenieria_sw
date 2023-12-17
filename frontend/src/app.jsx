// app.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { ChakraProvider } from '@chakra-ui/react';
import CrearPagoBasura from './components/forms/CrearAseo';
import CrearPermcirc from './components/forms/CrearPermcirc';
import CrearPermisoCirculacion from './components/forms/CrearPermcirc';
import CrearPermisoEdificacion from './components/forms/CrearPermedif';
import CrearPermisoConstruccion from './components/forms/CrearPermconst';
import CrearPatcom from './components/forms/CrearPatcom';


const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route  path="/CrearPermcirc" element={<CrearPermcirc />} />
          <Route  path="/CrearPermisoCirculacion" element={<CrearPermisoCirculacion />} />
          <Route  path="/CrearPagoBasura" element={<CrearPagoBasura />} />
          <Route  path="/CrearPermisoEdificacion" element={<CrearPermisoEdificacion />} />
          <Route  path="/pagocirculacion" element={<CrearPagoBasura />} />
          <Route  path="/CrearPermisoConstruccion" element={<CrearPermisoConstruccion />} />
          <Route  path="/CrearPatcom" element={<CrearPatcom />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
