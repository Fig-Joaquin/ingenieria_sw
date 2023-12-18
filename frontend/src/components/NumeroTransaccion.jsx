import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  useToast,
} from '@chakra-ui/react';

const CrearTransaccion = () => {
  const toast = useToast();
  const [formulario, setFormulario] = useState({
    numeroTransaccion: '',
    fechaTransaccion: '',
    montoTransaccion: '',
    rut: '',
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
      const response = await axios.post('http://localhost:443/transaccion/enviar', formulario);

      toast({
        title: 'Éxito',
        description: response.data.mensaje,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);

      toast({
        title: 'Error',
        description: error.response?.data.error || 'Error al enviar los datos.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxWidth="500px" mx="auto">
      <Heading as="h1" mb={8} textAlign="center">
        Crear Transacción
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Número de Transacción:</FormLabel>
          <Input
            type="text"
            name="numeroTransaccion"
            value={formulario.numeroTransaccion}
            onChange={handleChange}
            placeholder="Ingrese el número de transacción"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Fecha de Transacción:</FormLabel>
          <Input
            type="date"
            name="fechaTransaccion"
            value={formulario.fechaTransaccion}
            onChange={handleChange}
            placeholder="Ingrese la fecha de transacción"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Monto de Transacción:</FormLabel>
          <Input
            type="text"
            name="montoTransaccion"
            value={formulario.montoTransaccion}
            onChange={handleChange}
            placeholder="Ingrese el monto de transacción"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>RUT:</FormLabel>
          <Input
            type="text"
            name="rut"
            value={formulario.rut}
            onChange={handleChange}
            placeholder="Ingrese el RUT"
          />
        </FormControl>
        <Center>
          <Button width="54%" mt={4} colorScheme="purple" type="submit">
            Crear Transacción
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default CrearTransaccion;
