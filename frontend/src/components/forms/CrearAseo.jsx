import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

export const CrearPagoBasura = () => {
  const [formulario, setFormulario] = useState({
    nombreResidente: '',
    rutResidente: '',
    direccion: '',
    telefono: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/aseo/crear', formulario);
      console.log(response.data.mensaje);

      // Añadir redirección pendiente.

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={8} maxWidth="500px" mx="auto">
      <Heading as="h1" mb={8} textAlign="center">
        Servicio De Basura
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Nombre completo:</FormLabel>
          <Input
            type="text"
            name="nombreResidente"
            value={formulario.nombreResidente}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
        <FormLabel>
          RUT del solicitante{' '}
          <Box as="span" fontStyle="italic">
           (sin puntos ni guión)
          </Box>
          :
        </FormLabel>
          <Input
            type="text"
            name="rutResidente"
            value={formulario.rutResidente}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Dirección:</FormLabel>
          <Input
            type="text"
            name="direccion"
            value={formulario.direccion}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Teléfono:</FormLabel>
          <Input
            type="text"
            name="telefono"
            value={formulario.telefono}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Correo electrónico:</FormLabel>
          <Input
            type="text"
            name="email"
            value={formulario.email}
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" mt={8} colorScheme="teal">
          Continuar
        </Button>
      </form>
    </Box>
  );
};
