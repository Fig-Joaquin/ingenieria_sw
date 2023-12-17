import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Input, Button, Heading } from '@chakra-ui/react';
import axios from 'axios';

const LoginPage = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { rut, password });
      console.log(response.data.msg); // Manejar la respuesta como sea necesario
    } catch (error) {
      console.error('Error de inicio de sesión:', error.response.data.msg);
    }
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <VStack spacing={4} align="stretch">
          <Heading>Iniciar Sesión</Heading>
          <Input placeholder="RUT" value={rut} onChange={(e) => setRut(e.target.value)} />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button colorScheme="teal" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default LoginPage;
