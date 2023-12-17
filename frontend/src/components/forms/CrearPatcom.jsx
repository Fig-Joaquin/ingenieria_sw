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

export const CrearPatenteComercial = () => {
  const [formulario, setFormulario] = useState({
    nombreComercio: '',
    rubro: '',
    direccion: '',
    numeroLocal: '',
    rutTitular: '',
    nombreTitular: '',
    telefono: '',
    email: '',
    fechaInicioActividades: '',
    actividadEconomica: '',
    cantidadEmpleados: '',
    ingresosAnuales: '',
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
      const response = await axios.post('/patcom/crear', formulario);
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
            <Heading>Solicitud de Patente Comercial</Heading>
            <Box>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Nombre del comercio:</FormLabel>
                    <Input
                      type="text"
                      name="nombreComercio"
                      value={formulario.nombreComercio}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Rubro:</FormLabel>
                    <Input
                      type="text"
                      name="rubro"
                      value={formulario.rubro}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Dirección del comercio:</FormLabel>
                    <Input
                      type="text"
                      name="direccion"
                      value={formulario.direccion}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Número del local:</FormLabel>
                    <Input
                      type="number"
                      name="numeroLocal"
                      value={formulario.numeroLocal}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cantidad de empleados a la fecha:</FormLabel>
                    <Input
                      type="number"
                      name="cantidadEmpleados"
                      value={formulario.cantidadEmpleados}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Ingresos anuales aproximados:</FormLabel>
                    <Input
                      type="number"
                      name="ingresosAnuales"
                      value={formulario.ingresosAnuales}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <Spacer />
                  <Button type="submit" mt={8} colorScheme="teal">
                    Continuar
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
