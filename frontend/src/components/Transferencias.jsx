// En tu componente de React
import React, { useState } from 'react';
import axios from 'axios';
import { Image, Text, VStack, Input, Button, FormControl, FormLabel } from '@chakra-ui/react';

const UserProfilePage = () => {
  const [rut, setRut] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://146.83.198.35:1704/boletas/ruta-archivo/usuario', {
        rut,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data && response.data.imageUrl) {
        setImageUrl(response.data.imageUrl);
      } else {
        console.error('No se encontró la URL de la imagen para este usuario');
      }
    } catch (error) {
      console.error('Error al obtener la URL de la imagen del usuario:', error);
    }
  };

  return (
    <VStack spacing={4} align="center">
      <FormControl>
        <FormLabel>RUT del Usuario</FormLabel>
        <Input
          type="text"
          placeholder="Ingrese el RUT"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="teal" onClick={handleSearch}>
        Buscar Foto
      </Button>

      {imageUrl ? (
        <Image src={`http://146.83.198.35:1704/${imageUrl}`} alt="Imagen de usuario" boxSize="550px" />
      ) : (
        <Text>No se encontró una imagen para este usuario</Text>
      )}
    </VStack>
  );
};

export default UserProfilePage;
