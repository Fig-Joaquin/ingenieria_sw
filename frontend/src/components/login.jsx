import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Box,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  Link,
  Alert,
  Center,
  AlertIcon,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import BackToHomeButton from './forms/back';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado
  const navigate = useNavigate();
  

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:443/adm-muni/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        console.log('Token:', data.token);
        localStorage.setItem('token', token);
        
            // Nuevo código para indicar que el usuario ha iniciado sesión
        setIsLoggedIn(true);
        // Redirigir a la página de perfil después del inicio de sesión
        navigate('/profile');
      } else {
        const errorData = await response.json();
        setError(errorData.msg || 'Error inesperado');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Error inesperado');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <VStack spacing={4} align="stretch" p={4} m="auto" maxW="400px" borderRadius="2xl"
    boxShadow="2xl">
      <Box
        bg="white"
        p={5}
        borderRadius="2xl"
        boxShadow="2xl"
        textAlign="center"
        overflow="hidden" // Oculta cualquier contenido que sobresalga del contenedor
      >
        <Heading mb={4} color="teal.500">
          Inicio de Sesión
        </Heading>
        <FormControl id="rut" isRequired>
          <FormLabel>RUT</FormLabel>
          <Input
            type="text"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            placeholder="Ingrese su RUT"
            size="md"
          />
        </FormControl>

        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup size="md">
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
            />
            <InputRightElement>
              <IconButton
                icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                h="1.75rem"
                size="md"
                onClick={handleTogglePasswordVisibility}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {error && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Button colorScheme="teal" mt={6} onClick={handleLogin} w="100%">
          Iniciar Sesión
        </Button>
      </Box>
      <Center h="100hv">
      <BackToHomeButton />
      </Center>

      <Text fontSize="sm" color="gray.600" textAlign="center">
        ¿Aún no tienes cuenta?{' '}
        <Link color="teal.500" href="#">
          Regístrate
        </Link>
      </Text>
    </VStack>
  );
};

export default LoginForm;
