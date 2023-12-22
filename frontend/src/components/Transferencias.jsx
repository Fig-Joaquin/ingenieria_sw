import React, { useState } from 'react';
import axios from 'axios';
import {Box, Image, Text, VStack, Input, Button, FormControl, FormLabel } from '@chakra-ui/react';
import BackProfile from './backProfile';

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
    console.log(imageUrl)
  };

  return (
    <Box p={8} maxW="500px" mx="auto" borderWidth="1px" borderRadius="lg">
    <VStack spacing={4} align="stretch">
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
      <BackProfile />
    </VStack>
    </Box>
  );
};

export default UserProfilePage;