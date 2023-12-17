import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { ChakraProvider, Button, VStack, Flex } from '@chakra-ui/react';
import CrearPagoBasura from '../components/forms/CrearAseo';
import CrearPermisoCirculacion from '../components/forms/CrearPermcirc';
import CrearPermisoEdificacion from '../components/forms/CrearPermedif';
import CrearPermisoConstruccion from '../components/forms/CrearPermconst';
import CrearPatenteComercial from '../components/forms/CrearPatcom';

const HomePage = () => {
  const [showBackButton, setShowBackButton] = useState(false);

  return (
    <VStack spacing={4} align="stretch" justify="space-between" height="100vh">
      <Flex direction="row" spacing={4}>
        <Link to="/CrearPermisoCirculacion">
          <Button colorScheme="teal" size="md" borderRadius="md">
            Crear Permiso Circulación
          </Button>
        </Link>
        <Link to="/CrearPagoBasura">
          <Button colorScheme="teal" size="md" borderRadius="md">
            Crear Pago Basura
          </Button>
        </Link>
        <Link to="/CrearPermisoEdificacion">
          <Button colorScheme="teal" size="md" borderRadius="md">
            Crear Permiso Edificación
          </Button>
        </Link>
        <Link to="/pagocirculacion">
          <Button colorScheme="teal" size="md" borderRadius="md">
            Pagar Circulación
          </Button>
        </Link>
        <Link to="/CrearPermisoConstruccion">
          <Button colorScheme="teal" size="md" borderRadius="md">
            Crear Permiso Construcción
          </Button>
        </Link>
        <Link to="/CrearPatenteComercial">
          <Button colorScheme="teal" size="md" borderRadius="md">
            Crear Patente Comercial
          </Button>
        </Link>
      </Flex>
  
    </VStack>
  );
};

const Form = () => {
  return (
    <Router>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/CrearPermisoCirculacion" element={<CrearPermisoCirculacion />} />
          <Route path="/CrearPagoBasura" element={<CrearPagoBasura />} />
          <Route path="/CrearPermisoEdificacion" element={<CrearPermisoEdificacion />} />
          <Route path="/pagocirculacion" element={<CrearPagoBasura />} />
          <Route path="/CrearPermisoConstruccion" element={<CrearPermisoConstruccion />} />
          <Route path="/CrearPatenteComercial" element={<CrearPatenteComercial />} />
        </Routes>
      </ChakraProvider>
    </Router>
  );
};

export default Form;
