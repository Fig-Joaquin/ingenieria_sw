import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Box, InputRightElement, Table, Thead, Tbody, Tr, Th, Td, VStack, Text, Select, Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ViewIcon, SearchIcon } from '@chakra-ui/icons'; // Importa el ícono de búsqueda
import BackProfile from './backProfile';

const UserProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [newStatus, setNewStatus] = useState('');
  const [searchRut, setSearchRut] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Realiza una solicitud al servidor para obtener la lista de usuarios
    axios.get('http://146.83.198.35:1704/usuario/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleUpdateStatus = async (rut) => {
    try {
      await axios.put('http://146.83.198.35:1704/usuario/actualizar', { rut, newStatus }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Actualiza la lista de usuarios después de la actualización
      const response = await axios.get('http://146.83.198.35:1704/usuario/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      console.log('Estado del usuario actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar el estado del usuario:', error);
    }
  };

  // Función para filtrar usuarios por rut
  const filterUsersByRut = () => {
    if (!searchRut) {
      // Si no se ha ingresado un rut, muestra todos los usuarios
      return users;
    }

    // Filtra los usuarios cuyo rut contiene la cadena de búsqueda
    return users.filter(user => user.rut.includes(searchRut));
  };

  return (
    <VStack spacing={4} align="stretch">
      <BackProfile />
      <Text fontSize="2xl" fontWeight="bold" mb={2} textAlign="center">
        Lista de Usuarios
      </Text>
      <Box width="md" mx="auto"> {/* Centra y limita el ancho del contenedor */}
        <InputGroup size="sm">
          <Input
            placeholder="Buscar por Rut"
            value={searchRut}
            onChange={(e) => setSearchRut(e.target.value)}
            size="sm"
          />
          <InputRightElement>
            <ViewIcon color="blue.300" />
          </InputRightElement>
        </InputGroup>
      </Box>
      <Table spacing={4} align="stretch" p={4} m="auto" maxW="400px" borderRadius="2xl"
    boxShadow="2xl" variant="striped" size="lg">
        <Thead>
          <Tr>
            <Th>Rut</Th>
            <Th>Nombre</Th>
            <Th>Apellido</Th>
            <Th>Email</Th>
            <Th>Dirección</Th>
            <Th>Número de contacto</Th>
            <Th>Estado de pago</Th>
            <Th>Actualizar Estado</Th>
          </Tr>
        </Thead>
        <Tbody >
          {filterUsersByRut().map((user) => (
            <Tr key={user._id}>
              <Td>{user.rut}</Td>
              <Td>{user.name}</Td>
              <Td>{user.lastName}</Td>
              <Td>{user.email}</Td>
              <Td>{user.address}</Td>
              <Td>{user.phoneNumber}</Td>
              <Td>{user.statusUser}</Td>
              <Td>
                <Select
                  placeholder="Seleccionar estado"
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="solvente">Solvente</option>
                  <option value="deudor">Deudor</option>
                </Select>
                <Button
                  colorScheme="teal"
                  ml={2}
                  onClick={() => handleUpdateStatus(user.rut)}
                >
                  Actualizar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default UserProfilePage;
