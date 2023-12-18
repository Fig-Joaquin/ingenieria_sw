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
} from '@chakra-ui/react';


export const CrearPermisoConstruccion = () => {
  const navigate = useNavigate();
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
            <Heading><Center h="100hv">Permiso De Construcción</Center></Heading>
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
                      placeholder="Ejemplo: Juan Miguel Perez Gonzalez"
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
                    <FormLabel>Dirección de la obra:</FormLabel>
                    <Input
                      type="text"
                      name="direccionObra"
                      value={formulario.direccionObra}
                      onChange={handleChange}
                      placeholder="Ejemplo: Calle 123"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Comuna donde se realizará la obra:</FormLabel>
                    <Input
                      type="text"
                      name="comunaObra"
                      value={formulario.comunaObra}
                      onChange={handleChange}
                      placeholder="Ejemplo: Talcahuano"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Empresa solicitante:</FormLabel>
                    <Input
                      type="text"
                      name="empresa"
                      value={formulario.empresa}
                      onChange={handleChange}
                      placeholder="Ejemplo: Constructora ABC"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cantidad de empleados:</FormLabel>
                    <Input
                      type="text"
                      name="cantidadTrabajadores"
                      value={formulario.cantidadTrabajadores}
                      onChange={handleChange}
                      placeholder="Ejemplo: 35"
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
                      placeholder="Ejemplo: contacto@constructora.com"
                    />
                  </FormControl>
                  <Spacer />
                  <Center h="100hv">
                  <Button width="43%" mt={4} colorScheme="purple" type="submit">
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

export default CrearPermisoConstruccion;
