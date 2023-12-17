import React, { useState } from 'react';
import axios from 'axios';
import BackToHomeButton from './back';
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

export const CrearPermisoConstruccion = () => {
  const [formulario, setFormulario] = useState({
    nombreSolicitante: '',
    rutSolicitante: '',
    direccionObra: '',
    comunaObra: '',
    empresa: '',
    cantidadTrabajadores: '',
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
      const response = await axios.post('http://localhost:443/permconst/crear', formulario);
      console.log(response.data.mensaje);

      // Aquí redirigir al usuario.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <Container maxW="xl">
          <VStack spacing={4} align="stretch">
            <Heading>Permiso De Construcción</Heading>
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
                    <FormLabel>Dirección de la obra:</FormLabel>
                    <Input
                      type="text"
                      name="direccionObra"
                      value={formulario.direccionObra}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Comuna donde se realizará la obra:</FormLabel>
                    <Input
                      type="text"
                      name="comunaObra"
                      value={formulario.comunaObra}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Empresa solicitante:</FormLabel>
                    <Input
                      type="text"
                      name="empresa"
                      value={formulario.empresa}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cantidad de empleados:</FormLabel>
                    <Input
                      type="text"
                      name="cantidadTrabajadores"
                      value={formulario.cantidadTrabajadores}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Teléfono de contacto:</FormLabel>
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
                    Continuar
                  </Button>
                </VStack>
                
              <BackToHomeButton /> {/* Agrega el botón de volver aquí */}
              </form>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default CrearPermisoConstruccion;