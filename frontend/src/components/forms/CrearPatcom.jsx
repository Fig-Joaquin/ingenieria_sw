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
  Spacer,
  Center,
  useToast, 
} from '@chakra-ui/react';

export const CrearPatenteComercial = () => {
  const navigate = useNavigate();
  const toast = useToast(); 

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
      const response = await axios.post('http://localhost:443/patcom/crear', formulario);
      console.log(response.data.mensaje);
      navigate('/DatosTransferencia');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: error.response?.data.error || 'Ocurrió un error al procesar su solicitud, ingrese un RUT y Patente que no hayan solicitado permisos anteriormente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
                      placeholder="Ejemplo: Mi Tienda S.A."
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Rubro:</FormLabel>
                    <Input
                      type="text"
                      name="rubro"
                      value={formulario.rubro}
                      onChange={handleChange}
                      placeholder="Ejemplo: Venta de Ropa y Accesorios"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Dirección del comercio:</FormLabel>
                    <Input
                      type="text"
                      name="direccion"
                      value={formulario.direccion}
                      onChange={handleChange}
                      placeholder="Ejemplo: Av. Collao"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Número del local:</FormLabel>
                    <Input
                      type="number"
                      name="numeroLocal"
                      value={formulario.numeroLocal}
                      onChange={handleChange}
                      placeholder="Ejemplo: 101"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cantidad de empleados a la fecha:</FormLabel>
                    <Input
                      type="number"
                      name="cantidadEmpleados"
                      value={formulario.cantidadEmpleados}
                      onChange={handleChange}
                      placeholder="Ejemplo: 10"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Ingresos anuales aproximados:</FormLabel>
                    <Input
                      type="number"
                      name="ingresosAnuales"
                      value={formulario.ingresosAnuales}
                      onChange={handleChange}
                      placeholder="Ejemplo: 5000000"
                    />
                  </FormControl>
                  <Spacer />
                  <Center h="100hv">
                  <Button width="43%" mt={4} colorScheme="teal" type="submit">
                  Continuar
                  </Button>
                  </Center>
                </VStack>
              </form>
              <Center h="100hv">
              <BackToHomeButton />
              </Center>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default CrearPatenteComercial;
