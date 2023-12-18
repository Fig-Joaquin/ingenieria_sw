import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Button,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  DrawerFooter,
  Divider,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';


const ProfilePage = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rut, setRut] = useState('');
  const { state } = useLocation(); // Importar useLocation desde 'react-router-dom'
  const userRut = state?.rut || ''; // Obtener el RUT del estado de la ruta

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleGoToFinesPage = () => {
    navigate('/fines');
    closeDrawer();
  };

  const handleGoToAppeals = () => {
    navigate('/apelaciones-usuario');
    closeDrawer();
  };
    const handleGoToUser = () => {
    navigate('/usuariosmun');
    closeDrawer();
  };
  const handleGoToTransaction = () => {
    navigate('/transacciones');
    closeDrawer();
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }

    setRut(userRut);
  }, [navigate, userRut]);

  return (
    <Box p={4} display="flex" justifyContent="space-between" alignItems="center">
      <HStack spacing={4}>
        <Button colorScheme="teal" onClick={() => setIsDrawerOpen(true)}>
          <HamburgerIcon /> Menú
        </Button>
      </HStack>

      <Drawer placement="left" onClose={closeDrawer} isOpen={isDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent bgGradient='linear(to-l, #7fc6bd, #008d7a)' p={4}>
          <DrawerCloseButton />
          <DrawerHeader color="white">
            <HamburgerIcon /> Menú
          </DrawerHeader>
          <DrawerBody color="white">
            <VStack spacing={4} align="start">
              <Button colorScheme="teal" onClick={handleGoToFinesPage}>
                Crear nueva Multa
              </Button>
              <Button colorScheme="teal" onClick={handleGoToAppeals}>
                Buscar apelacion por usuario
              </Button>
              <Button colorScheme="teal" onClick={handleGoToUser}>
                Ver usuarios 
              </Button>
              <Button colorScheme="teal" onClick={handleGoToTransaction}>
                Transacciones
              </Button>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button colorScheme="red" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Divider />

      <Box ml="auto">
        <Text fontSize="lg" fontWeight="bold">
          Perfil: {rut}
        </Text>
      </Box>
    </Box>
  );
};

export default ProfilePage;
