import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Alert,
  AlertIcon,
  Center,
} from '@chakra-ui/react';
import BackProfile from './backProfile';
import ProtectedRoute from '../components/ProtectedRoute.jsx';


const NewFineForm = () => {
  const [rut, setRut] = useState('');
  const [violationType, setViolationType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [violationDate, setViolationDate] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('pendiente');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza la solicitud al backend para crear la multa
      const response = await fetch('http://146.83.198.35:1704/adm-muni/nueva-multa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rut,
          violationType,
          description,
          amount,
          violationDate,
          location,
          status,
        }),
      });

      if (response.ok) {
        // Multa creada exitosamente, puedes redirigir a otra página o realizar alguna acción adicional
        console.log('Multa creada exitosamente');
      } else {
        // Manejar errores de la solicitud
        const errorData = await response.json();
        setError(errorData.error || 'Error inesperado');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Error inesperado');
    }
  };

  return (
    <VStack spacing={4} align="stretch" p={4} m="auto" maxW="400px">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>RUT</FormLabel>
          <Input
            type="text"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            placeholder="Ingrese su RUT"
            size="md"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Tipo de infracción</FormLabel>
          <Input
            type="text"
            value={violationType}
            onChange={(e) => setViolationType(e.target.value)}
            placeholder="Ingrese el tipo de infracción"
            size="md"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Descripción</FormLabel>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ingrese la descripción"
            size="md"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Monto</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ingrese el monto"
            size="md"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Fecha de infracción</FormLabel>
          <Input
            type="text"
            value={violationDate}
            onChange={(e) => setViolationDate(e.target.value)}
            placeholder="Ingrese la fecha (dd-MM-yyyy)"
            size="md"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Ubicación</FormLabel>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ingrese la ubicación"
            size="md"
          />
        </FormControl>

        <Button colorScheme="teal" mt={6} type="submit" w="100%">
          Crear Multa
        </Button>
        <Center h="100hv">
      <BackProfile />
      </Center>
      </form>

      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </VStack>
  );
};

export default NewFineForm;
