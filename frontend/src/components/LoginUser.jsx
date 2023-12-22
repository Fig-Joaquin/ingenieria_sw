import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginUser = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Restablecer el estado cuando la ubicación cambie
    setRut('');
    setPassword('');
  }, [location.pathname]);

  const handleGoBack = () => {
    navigate(-1); // Navegar hacia atrás en la pila de historial
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://146.83.198.35:1704/usuario/login', {
        rut,
        password,
      });
  
      const { token } = response.data;
      localStorage.setItem('token', token);
  
      // Redirigir a la página de perfil con userRut en state
      navigate('/miperfil', { state: { rut } });
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };
  

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={4}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      bg="white"
    >
      <Heading mb={4} textAlign="center" fontSize="2xl" color="#000000d9">
        Inicio de Sesión
      </Heading>
      <FormControl>
        <FormLabel>RUT</FormLabel>
        <Input
          type="text"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          placeholder="Tu RUT"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Contraseña</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Tu contraseña"
        />
      </FormControl>
      <Button
        mt={4}
        colorScheme="teal"
        width="full"
        onClick={handleLogin}
        _hover={{ bg: 'teal.600' }}
      >
        Iniciar Sesión
      </Button>
      <Center h="100hv">
        <Button colorScheme="gray" variant="outline" onClick={handleGoBack} mt={2}>
          Atrás
        </Button>
      </Center>
      <Link mt={2} color="#d03535c32" href="/login" textAlign="center" display="block">
        Sesión de administador
      </Link>
    </Box>
  );
};

export default LoginUser;
