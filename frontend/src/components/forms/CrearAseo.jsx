import { useState } from 'react';
import axios from 'axios';
import BackToHomeButton from './back';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from '@chakra-ui/react';


const CrearPagoBasura = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombreResidente: '',
    rutResidente: '',
    direccion: '',
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
      const response = await axios.post('http://localhost:443/aseo/crear', formulario);
      console.log(response.data.mensaje && navigate('/DatosTransferencia'));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={8} maxWidth="500px" mx="auto">
      <Heading as="h1" mb={8} textAlign="center">
        Servicio De Basura
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Nombre completo:</FormLabel>
          <Input
            type="text"
            name="nombreResidente"
            value={formulario.nombreResidente}
            onChange={handleChange}
            placeholder="Ejemplo: Juan Miguel Perez Gonzalez"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>RUT del solicitante (sin puntos ni guión):</FormLabel>
          <Input
            type="text"
            name="rutResidente"
            value={formulario.rutResidente}
            onChange={handleChange}
            placeholder="Ejemplo: 12345678K"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Dirección:</FormLabel>
          <Input
            type="text"
            name="direccion"
            value={formulario.direccion}
            onChange={handleChange}
            placeholder="Ejemplo: Calle #123 Concepción"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Teléfono de contacto:</FormLabel>
          <Input
            type="text"
            name="telefono"
            value={formulario.telefono}
            onChange={handleChange}
            placeholder="Ejemplo: +56912345678"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Correo electrónico:</FormLabel>
          <Input
            type="text"
            name="email"
            value={formulario.email}
            onChange={handleChange}
            placeholder="Ejemplo: juan@gmail.com"
          />
        </FormControl>
        <Center h="100hv">
        <Button width="54%" mt={4} colorScheme="teal" type="submit">
          Continuar
        </Button>
        </Center>
      </form>
      <Center h="100hv"><BackToHomeButton /></Center>
    </Box>
  );
};

export default CrearPagoBasura;
