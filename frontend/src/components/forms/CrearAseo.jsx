import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import BackToHomeButton from './back';

const CrearPagoBasura = () => {
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
      console.log(response.data.mensaje);
      if (response.status === 200) {
        console.log('¡Registro exitoso!', 'El usuario ha sido registrado correctamente.', 'success');
      } else if (response.status === 400) {
        console.log('No se ha registrado el usuario', 'Error', '!');
      }
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
            placeholder="Ejemplo: Juan Miguel Pérez González"
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
        <Button type="submit" mt={8} colorScheme="purple" width="54%">
          Continuar
        </Button>
      </form>
      <BackToHomeButton />
    </Box>
  );
};

export default CrearPagoBasura;
