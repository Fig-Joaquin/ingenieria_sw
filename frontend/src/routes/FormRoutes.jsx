import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Button,
  VStack,
} from '@chakra-ui/react';
import CrearPagoBasura from '../components/forms/CrearAseo';
import CrearPermisoCirculacion from '../components/forms/CrearPermcirc';
import CrearPermisoEdificacion from '../components/forms/CrearPermedif';
import CrearPermisoConstruccion from '../components/forms/CrearPermconst';
import CrearPatenteComercial from '../components/forms/CrearPatcom';
import CrearPermisoEventos from '../components/forms/CrearPermevent';
import DatosTransferencia from '../components/DatosTransferencia';

import App from '../app.jsx';
const HomePage = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerIsOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerIsOpen(false);
  };

  return (
    <VStack spacing={4} align="stretch" justify="space-between" height="100vh">
      <Button colorScheme="purple" size="md" borderRadius="md" onClick={handleDrawerOpen}>
        Servicios De la Municipalidad
      </Button>

      <Drawer isOpen={drawerIsOpen} onClose={handleDrawerClose} placement="left">
        <DrawerOverlay />
        <DrawerContent bg="purple.500" p={4}>
          <DrawerCloseButton />
          <DrawerHeader color="white">Servicios Disponibles:</DrawerHeader>
          <DrawerBody color="white">
            <VStack spacing={4} align="start">
              <Link to="/CrearPermisoCirculacion" onClick={handleDrawerClose} color="white">
                Permiso de Circulación 2024
              </Link>
              <Link to="/CrearPagoBasura" onClick={handleDrawerClose} color="white">
                Servicio de Basura
              </Link>
              <Link to="/CrearPermisoEdificacion" onClick={handleDrawerClose} color="white">
                Permiso de Edificación
              </Link>
              <Link to="/CrearPermisoConstruccion" onClick={handleDrawerClose} color="white">
                Permiso de Construcción
              </Link>
              <Link to="/CrearPatenteComercial" onClick={handleDrawerClose} color="white">
                Patente Comercial
              </Link>
              <Link to="/crearPermisoEventos" onClick={handleDrawerClose} color="white">
                Permiso Para Eventos
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </VStack>
  );
};

const Form = () => {
  return (
    <Router>
      <ChakraProvider>
      <App />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/CrearPermisoCirculacion" element={<CrearPermisoCirculacion />} />
          <Route path="/CrearPagoBasura" element={<CrearPagoBasura />} />
          <Route path="/CrearPermisoEdificacion" element={<CrearPermisoEdificacion />} />
          <Route path="/CrearPermisoConstruccion" element={<CrearPermisoConstruccion />} />
          <Route path="/CrearPatenteComercial" element={<CrearPatenteComercial />} />
          <Route path="/crearPermisoEventos" element={<CrearPermisoEventos />} />
          <Route path="/DatosTransferencia" element={<DatosTransferencia />} />
        </Routes>
      </ChakraProvider>
    </Router>
  );
};

export default Form;
