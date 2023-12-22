import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BackToHomeButton from './forms/back';

const AppealsForm = () => {
  const { objectId } = useParams();
  console.log('objectId appeal:', objectId);

  const [rut, setRut] = useState('');
  const [formData, setFormData] = useState({
    reason: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData:', formData);

    try {
      console.log("soy el rut de apelacion:", rut);
      const response = await axios.post(`http://146.83.198.35:1704/nueva-apelacion/${objectId}`, {
        ...formData,
        rut: rut,
        objID: objectId,
        status: 'pendiente',
      });
      console.log('Appeal created:', response.data);

      setSuccessMessage('¡La apelación se ha creado con éxito!');
      setErrorMessage('');
      setFormData({
        reason: '',
      });
      setRut('');
    } catch (error) {
      console.error('Error creating appeal:', error.response.data);
      setErrorMessage('Error al crear la apelación. Verifica los datos y vuelve a intentarlo.');
      setSuccessMessage('');
    }
  };

  return (
    <Box p={8} maxW="500px" mx="auto" borderWidth="1px" borderRadius="lg">
      <Heading as="h1" size="xl" mb={4}>
        Crear Apelación
      </Heading>

      {successMessage && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}

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
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              placeholder="Ingrese su RUT"
              size="md"
            />
            <Text fontSize="sm" color="gray.500">
              Formato: 123456789
            </Text>
          </FormControl>

          <Button colorScheme="teal" type="submit">
            Crear Apelación
          </Button>
          <BackToHomeButton />
        </VStack>
      </form>
    </Box>
  );
};

export default AppealsForm;
