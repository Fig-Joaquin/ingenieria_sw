import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Input, Button, Heading, Link } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/register', { rut, password });
      console.log(response.data.msg); 
      navigate('/login'); 
    } catch (error) {
      console.error('Error al registrar:', error.response.data.msg);
    }
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <VStack spacing={4} align="stretch">
          <Heading>Registro</Heading>
          <Input placeholder="RUT" value={rut} onChange={(e) => setRut(e.target.value)} />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button colorScheme="teal" onClick={handleRegister}>
            Registrarse
          </Button>
          <Link to="/login">¿Ya tienes cuenta? Inicia sesión aquí.</Link>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default RegisterForm;
