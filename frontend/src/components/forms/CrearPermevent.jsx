import React, { useState } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Container,
  Heading,
  VStack,
  Spacer,
} from '@chakra-ui/react';

export const CrearPermisoEventos = () => {
  const [formulario, setFormulario] = useState({
    nombreSolicitante: '',
    rutSolicitante: '',
    tipoEvento: '',
    fechaEvento: '',
    asistentesAprox: '',
    lugarEvento: '',
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
      const response = await axios.post('/permevent/crear', formulario);
      console.log(response.data.mensaje);

      // Añadir redirección.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <Container maxW="xl">
          <VStack spacing={4} align="stretch">
            <Heading>Permiso de Eventos y Espectáculos</Heading>
            <Box>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Nombre del solicitante:</FormLabel>
                    <Input
                      type="text"
                      name="nombreSolicitante"
                      value={formulario.nombreSolicitante}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                  <FormLabel>
                      RUT del solicitante{' '}
                      <Box as="span" fontStyle="italic">
                        (sin puntos ni guión)
                      </Box>
                      :
                    </FormLabel>
                    <Input
                      type="text"
                      name="rutSolicitante"
                      value={formulario.rutSolicitante}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Tipo de evento:</FormLabel>
                    <Input
                      type="text"
                      name="tipoEvento"
                      value={formulario.tipoEvento}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Fecha del evento:</FormLabel>
                    <Input
                      type="date"
                      name="fechaEvento"
                      value={formulario.fechaEvento}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Asistentes aproximados:</FormLabel>
                    <Input
                      type="text"
                      name="asistentesAprox"
                      value={formulario.asistentesAprox}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Dirección del evento:</FormLabel>
                    <Input
                      type="text"
                      name="lugarEvento"
                      value={formulario.lugarEvento}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                  <FormLabel>
                      Teléfono de contacto{' '}
                      <Box as="span" fontStyle="italic">
                        (formato +56912345678)
                      </Box>
                      :
                    </FormLabel>
                    <Input
                      type="text"
                      name="telefono"
                      value={formulario.telefono}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Correo electrónico:</FormLabel>
                    <Input
                      type="text"
                      name="email"
                      value={formulario.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <Spacer />
                  <Button type="submit" mt={8} colorScheme="teal">
                    Enviar solicitud
                  </Button>
                </VStack>
              </form>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};
