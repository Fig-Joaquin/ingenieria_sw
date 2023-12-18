import React, { useState } from 'react';
import axios from 'axios';
import BackToHomeButton from './back';
import { useNavigate } from 'react-router-dom';
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
  Center,
} from '@chakra-ui/react';

export const CrearPermisoEventos = () => {
  const navigate = useNavigate();
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
      const response = await axios.post('http://localhost:443/permevent/crear', formulario);
      console.log(response.data.mensaje);
      navigate('/DatosTransferencia');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <Container maxW="xl">
          <VStack spacing={4} align="stretch">
            <Heading><Center h="100hv">Permiso de Eventos</Center></Heading>
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
                      placeholder="Ejemplo: Juan Esteban Pérez González, Productora XYZ"
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
                      placeholder="Ejemplo: 12345678K"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Tipo de evento:</FormLabel>
                    <Input
                      type="text"
                      name="tipoEvento"
                      value={formulario.tipoEvento}
                      onChange={handleChange}
                      placeholder="Ejemplo: Concierto, Boda, Conferencia, etc."
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
                      placeholder="Ejemplo: 1000"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Dirección del evento:</FormLabel>
                    <Input
                      type="text"
                      name="lugarEvento"
                      value={formulario.lugarEvento}
                      onChange={handleChange}
                      placeholder="Ejemplo: Auditorio XYZ"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>
                      Teléfono de contacto:
                    </FormLabel>
                    <Input
                      type="text"
                      name="telefono"
                      value={formulario.telefono}
                      onChange={handleChange}
                      placeholder="Ejemplo: +56912345678"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Correo electrónico:</FormLabel>
                    <Input
                      type="text"
                      name="email"
                      value={formulario.email}
                      onChange={handleChange}
                      placeholder="Ejemplo: ejemplo@correo.com"
                    />
                  </FormControl>
                  <Center h="100hv">
                  <Button width="43%" mt={4} colorScheme="purple" type="submit">
                   Continuar
                  </Button>
                  </Center>
                </VStack>
              </form>
              <Center h="100hv">
              <BackToHomeButton/>
              </Center>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default CrearPermisoEventos;
