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
  Image,
  Box,
  Divider,
} from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons'
import CrearPagoBasura from '../components/forms/CrearAseo';
import CrearPermisoCirculacion from '../components/forms/CrearPermcirc';
import CrearPermisoEdificacion from '../components/forms/CrearPermedif';
import CrearPermisoConstruccion from '../components/forms/CrearPermconst';
import CrearPatenteComercial from '../components/forms/CrearPatcom';
import CrearPermisoEventos from '../components/forms/CrearPermevent';
import DatosTransferencia from '../components/DatosTransferencia';
import AppealsForm from '../components/appeal';
import Login from '../components/login';

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
      <Divider />
      <Box mx="initial" maxWidth="300px" mt="5px">
        <Button colorScheme="teal" variant='outline' size="md" borderRadius="md" onClick={handleDrawerOpen}>
          <HamburgerIcon /> Servicios De la Municipalidad
        </Button>
      </Box>

      <Drawer isOpen={drawerIsOpen} onClose={handleDrawerClose} placement="left">
        <DrawerOverlay />
        <DrawerContent bgGradient='linear(to-l, #7fc6bd, #008d7a)' p={4}>
          <DrawerCloseButton />
          <DrawerHeader color="white"><HamburgerIcon />Servicios Disponibles:</DrawerHeader>
          <DrawerBody color="white">
            <VStack spacing={4} align="start">
            <Link to="/login" onClick={handleDrawerClose} color="white">
                Iniciar Sesión
              </Link>
              <Link to="/CrearPermisoCirculacion" onClick={handleDrawerClose} color="white">
                Permiso de Circulación 2024
              </Link>
              <Link to="/CrearPermisoConstruccion" onClick={handleDrawerClose} color="white">
                Permiso de Construcción
              </Link>
              <Link to="/CrearPermisoEdificacion" onClick={handleDrawerClose} color="white">
                Permiso de Edificación
              </Link>
              <Link to="/crearPermisoEventos" onClick={handleDrawerClose} color="white">
                Permiso Para Eventos
              </Link>
              <Link to="/CrearPatenteComercial" onClick={handleDrawerClose} color="white">
                Patente Comercial
              </Link>
              <Link to="/CrearPagoBasura" onClick={handleDrawerClose} color="white">
                Servicio de Basura
              </Link>
              <Link to="/Apelacion" onClick={handleDrawerClose} color="white">
                Crear Apelación
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Divider />
      <Image src='https://i.ytimg.com/vi/P22Xwq00RyI/maxresdefault.jpg' alt='Concepcion' />
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
          <Route path="/Apelacion" element={<AppealsForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ChakraProvider>
    </Router>
  );
};

export default Form;
