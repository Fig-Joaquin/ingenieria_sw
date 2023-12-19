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
  Select,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';  // Asegúrate de importar CalendarIcon

import BackProfile from './backProfile';

const NewFineForm = () => {
  const [rut, setRut] = useState('');
  const [violationType, setViolationType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [violationDate, setViolationDate] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('pendiente');
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  const violationTypes = ['falta gravisima', 'falta grave', 'falta menos grave', 'falta leve'];

  const validateForm = () => {
    const errors = {};

    // Validar el RUT
    if (!rut) {
      errors.rut = 'El RUT es obligatorio';
    }

    // Validar el Tipo de infracción
    if (!violationType) {
      errors.violationType = 'El tipo de infracción es obligatorio';
    }

    // Validar la Descripción
    if (!description) {
      errors.description = 'La descripción es obligatoria';
    }

    // Validar el Monto
    if (!amount || isNaN(amount)) {
      errors.amount = 'Ingrese un monto válido';
    }

    // Validar la Fecha de infracción
    if (!violationDate) {
      errors.violationDate = 'La fecha de infracción es obligatoria';
    }

    // Validar la Ubicación
    if (!location) {
      errors.location = 'La ubicación es obligatoria';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!validateForm()) {
      // Si hay errores de validación, no enviar la solicitud al backend
      return;
    }

    try {
      // Realizar la solicitud al backend para crear la multa
      const response = await fetch('http://localhost:443/adm-muni/nueva-multa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
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
        {errors.rut && <div style={{ color: 'red' }}>{errors.rut}</div>}

        <FormControl isRequired>
          <FormLabel>Tipo de infracción</FormLabel>
          <Select
            value={violationType}
            onChange={(e) => setViolationType(e.target.value)}
            placeholder="Seleccione el tipo de infracción"
            size="md"
          >
            {violationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormControl>
        {errors.violationType && <div style={{ color: 'red' }}>{errors.violationType}</div>}

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
        {errors.description && <div style={{ color: 'red' }}>{errors.description}</div>}

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
        {errors.amount && <div style={{ color: 'red' }}>{errors.amount}</div>}

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
        {errors.violationDate && <div style={{ color: 'red' }}>{errors.violationDate}</div>}

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
        {errors.location && <div style={{ color: 'red' }}>{errors.location}</div>}

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
