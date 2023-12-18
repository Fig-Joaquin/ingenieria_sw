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
  useToast,
  Center, 
} from '@chakra-ui/react';

export const CrearPermisoCirculacion = () => {
  const navigate = useNavigate();
  const toast = useToast(); 

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
      const response = await axios.post('http://146.83.198.35:1704/permcirc/crear', formulario);
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
            <Heading><Center h="100hv">Permiso De Circulación</Center></Heading>
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
                    <FormLabel>Patente{' '}
                    <Box as="span" fontStyle="italic">
                        (solo mayusculas)
                    </Box>
                    :
                    </FormLabel>
                    <Input
                      type="text"
                      name="patente"
                      value={formulario.patente}
                      onChange={handleChange}
                      placeholder="Ejemplo: BBCL34"
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

export default CrearPermisoCirculacion;
