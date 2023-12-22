import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import BackProfile from './backProfile';

const NewFineForm = () => {
  const [rut, setRut] = useState('');
  const [violationType, setViolationType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [violationDate, setViolationDate] = useState(new Date()); // Inicializa con la fecha actual
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const violationTypes = ['falta gravisima', 'falta grave', 'falta menos grave', 'falta leve'];

  const validateForm = () => {
    const errors = {};

    if (!rut) {
      errors.rut = 'El RUT es obligatorio';
    }

    if (!violationType) {
      errors.violationType = 'El tipo de infracción es obligatorio';
    }

    if (!description) {
      errors.description = 'La descripción es obligatoria';
    }

    if (!amount || isNaN(amount)) {
      errors.amount = 'Ingrese un monto válido';
    }

    if (!violationDate) {
      errors.violationDate = 'La fecha de infracción es obligatoria';
    }

    if (!location) {
      errors.location = 'La ubicación es obligatoria';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const navigate = useNavigate();
  const { state } = useLocation();
  const userRut = state?.rut || '';

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }

    setRut(userRut);
  }, [navigate, userRut]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!validateForm()) {
      return;
    }

    try {
      const formattedDate = format(violationDate, 'dd-MM-yyyy');

      const response = await fetch('http://146.83.198.35:1704/adm-muni/nueva-multa', {
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
          violationDate: formattedDate,
          location,
          status: 'pendiente',
        }),
      });

      if (response.ok) {
        setSuccess('Multa creada exitosamente');
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error inesperado');
        setSuccess(null);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Error inesperado');
      setSuccess(null);
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
          <DatePicker
            selected={violationDate}
            onChange={(date) => setViolationDate(date)}
            dateFormat="dd-MM-yyyy"
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

      {success && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          {success}
        </Alert>
      )}
    </VStack>
  );
};

export default NewFineForm;
