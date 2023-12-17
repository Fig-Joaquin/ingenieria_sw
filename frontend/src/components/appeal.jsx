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

    //*VERIFICAR RUTA DE LA API EN BACKEND*

    try {
      const response = await axios.post('http://localhost:443/create-appeal', formData);

      console.log('Appeal created:', response.data);

      setFormData({
        reason: '',
        rut: '',
        status: 'pendiente',
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
              Formato: 12345678-9
            </Text>
          </FormControl>

          <FormControl>
            <FormLabel>Estado</FormLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="pendiente">Pendiente</option>
              <option value="aprobada">Aprobada</option>
              <option value="rechazada">Rechazada</option>
            </Select>
          </FormControl>

          <Button colorScheme="purple" type="submit">
            Crear Apelación
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AppealsForm;
