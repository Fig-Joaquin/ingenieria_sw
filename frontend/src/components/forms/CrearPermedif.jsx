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


export const CrearPermisoEdificacion = () => {
  const [formulario, setFormulario] = useState({
    nombreSolicitante: '',
    rutSolicitante: '',
    tipoEdificacion: '',
    direccionEdificacion: '',
    comunaEdificacion: '',
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
      const response = await axios.post('http://localhost:443/permedif/crear', formulario);
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
            <Heading>Permiso de Edificación</Heading>
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
                      placeholder="Ejemplo: Juan Esteban Pérez González"
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
                    <FormLabel>Tipo de edificación:</FormLabel>
                    <Input
                      type="text"
                      name="tipoEdificacion"
                      value={formulario.tipoEdificacion}
                      onChange={handleChange}
                      placeholder="Ejemplo: Residencial, Comercial, Industrial, etc..."
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Dirección donde se realizará la edificación:</FormLabel>
                    <Input
                      type="text"
                      name="direccionEdificacion"
                      value={formulario.direccionEdificacion}
                      onChange={handleChange}
                      placeholder="Ejemplo: Calle #123"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Comuna donde se realizará la edificación:</FormLabel>
                    <Input
                      type="text"
                      name="comunaEdificacion"
                      value={formulario.comunaEdificacion}
                      onChange={handleChange}
                      placeholder="Ejemplo: Concepción"
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
                  <Spacer />
                  <Button type="submit" mt={8} colorScheme="purple" width="43%">
                    Enviar solicitud
                  </Button>
                </VStack>
              </form>
              <BackToHomeButton />
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default CrearPermisoEdificacion;
