import React, { useEffect } from 'react';
import { Box, Heading, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el token del almacenamiento local al cerrar sesión
    localStorage.removeItem('token');
    // Redirige a la página de inicio de sesión
    navigate('/login');
  };

  const handleGoToFinesPage = () => {
    // Redirige a la página de multas (Fine.jsx)
    navigate('/fines');
  };
  const handleGoToAppeals = () => {
    // Redirige a la página de multas (Fine.jsx)
    navigate('/apelaciones-usuario');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // No hay token, redirige a la página de inicio de sesión
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Box p={4}>
      {/* Contenido de la página de perfil */}
      <Button colorScheme="red" onClick={handleLogout}>
        Cerrar Sesión
      </Button>
      <Button colorScheme="teal" onClick={handleGoToFinesPage}>
        Ir a Multas
      </Button>
      <Button colorScheme="teal" onClick={handleGoToAppeals}>
        Usuario Apelaciones
      </Button>
      
      <Heading as="h1" mb={4}></Heading>
    </Box>
  );
};

export default ProfilePage;
