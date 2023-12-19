import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, Text, VStack, Input, Button, FormControl, FormLabel, Box, SimpleGrid, IconButton } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons'; // Importa el ícono de "View"

const UserProfilePage = () => {
  const [rut, setRut] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Cargar la lista de imágenes cuando se cambia el RUT
    if (rut) {
      loadImages();
    }
  }, [rut]);

  const loadImages = async () => {
    try {
      const response = await axios.post('http://localhost:443/boletas/ruta-archivo/usuario', {
        rut,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data && response.data.imageUrls) {
        setImageUrls(response.data.imageUrls);
      } else {
        console.error('No se encontraron imágenes para este usuario');
      }
    } catch (error) {
      console.error('Error al obtener las imágenes del usuario:', error);
    }
  };

  const handleSearch = () => {
    // Cargar la lista de imágenes al hacer clic en el botón de búsqueda
    loadImages();
  };

  const handleOpenImage = (imageUrl) => {
    // Lógica para abrir la imagen, por ejemplo, podrías mostrarla en un modal
    console.log(`Abrir imagen: ${imageUrl}`);
  };

  return (
    <Box width="500px" mx="auto">
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
          Buscar Fotos
        </Button>

        {imageUrls.length > 0 ? (
          <SimpleGrid columns={2} spacing={4}>
            {imageUrls.map((url, index) => (
              <Box key={index}>
                <Image src={`http://localhost:443/${url}`} alt={`Imagen ${index + 1}`} boxSize="150px" />
                <IconButton
                  icon={<ViewIcon />}
                  aria-label={`Abrir imagen ${index + 1}`}
                  onClick={() => handleOpenImage(url)}
                />
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Text>No se encontraron imágenes para este usuario</Text>
        )}
      </VStack>
    </Box>
  );
};

export default UserProfilePage;
