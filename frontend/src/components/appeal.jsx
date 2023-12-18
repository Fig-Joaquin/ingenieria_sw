import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  VStack,
  Text,
  Alert,
  AlertIcon,
  
} from '@chakra-ui/react';
import BackToHomeButton from './forms/back';
import axios from 'axios';

const AppealsForm = () => {
  const [formData, setFormData] = useState({
    reason: '',
    rut: '',
    status: 'pendiente',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await axios.post('http://146.83.198.35:1704/admin-muni/nueva-apelacion', formData);
      console.log('Appeal created:', response.data);
      setFormData({
        reason: '',
        rut: '',
      });

      setErrorMessage('');
    } catch (error) {
      console.error('Error creating appeal:', error.response.data);
      setErrorMessage('Error al crear la apelación. Verifica los datos y vuelve a intentarlo.');
    }
  };

  return (
    <Box p={8} maxW="500px" mx="auto" borderWidth="1px" borderRadius="lg">
      <Heading as="h1" size="xl" mb={4}> 
        Crear Apelación
      </Heading>

      {errorMessage && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Razón de la Apelación</FormLabel>
            <Input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
            <Text fontSize="sm" color="gray.500">
            Escriba la razón de la apelación
            </Text>
          </FormControl>

          <FormControl>
            <FormLabel>RUT del Cliente</FormLabel>
            <Input
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              required
            />
            <Text fontSize="sm" color="gray.500">
              Formato: 123456789
            </Text>
          </FormControl>


          <Button colorScheme="teal" type="submit">
            Crear Apelación
          </Button>
        </VStack>
      </form>
      <BackToHomeButton />
    </Box>
  );
};

export default AppealsForm;
