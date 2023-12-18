// components/UserProfilePage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, VStack, Text, Select, Button } from '@chakra-ui/react';
import BackProfile from './backProfile';
const UserProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    // Realiza una solicitud al servidor para obtener la lista de usuarios
    axios.get('http://localhost:443/usuario/perfil')
      .then((response) => {
        setUsers(response.data); // Asumiendo que la respuesta del servidor es un array de usuarios
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleUpdateStatus = async (rut) => {
    try {
      await axios.put('http://localhost:443/usuario/actualizar', { rut, newStatus });
      // Actualiza la lista de usuarios después de la actualización
      const response = await axios.get('http://localhost:443/usuario/perfil');
      setUsers(response.data);
      console.log('Estado del usuario actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar el estado del usuario:', error);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
        <BackProfile/>
        <Text fontSize="2xl" fontWeight="bold" mb={5} textAlign="center">
  Lista de Usuarios
</Text>
      <Table variant="striped" size="lg">
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
        <Tbody>
          {users.map((user) => (
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
