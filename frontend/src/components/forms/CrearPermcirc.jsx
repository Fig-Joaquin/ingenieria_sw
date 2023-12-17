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
import BackToHomeButton from './back';

export const CrearPermisoCirculacion = () => {
  const [formulario, setFormulario] = useState({
    rut: '',
    patente: '',
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
      const response = await axios.post('http://localhost:443/permiso/crear', formulario);
      console.log(response.data.mensaje);

      // Añadir redirección
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <Container maxW="xl">
          <VStack spacing={4} align="stretch">
            <Heading>Permiso De Circulación</Heading>
            <Box>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
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
                      name="rut"
                      value={formulario.rut}
                      onChange={handleChange}
                      placeholder="Ejemplo: 12345678K"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Patente:</FormLabel>
                    <Input
                      type="text"
                      name="patente"
                      value={formulario.patente}
                      onChange={handleChange}
                      placeholder="Ejemplo: BBCL34"
                    />
                  </FormControl>
                  <Spacer />
                  <Button type="submit" mt={8} colorScheme="purple" width="43%">
                    Continuar
                  </Button>
                </VStack>
                
               <BackToHomeButton /> {/* Agrega el botón de volver aquí */}
              </form>
              <BackToHomeButton />
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default CrearPermisoCirculacion;
