import React, { useState, useEffect } from 'react';
import { Button, Input, VStack, Text, Box, Table, Thead, Tbody, Tr, Th, Td, Center, Select } from '@chakra-ui/react';
import { format } from 'date-fns';

const AppealList = () => {
  const [rut, setRut] = useState('');
  const [appeals, setAppeals] = useState([]);
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [error, setError] = useState('');
  const [updatePending, setUpdatePending] = useState(false);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:443/adm-muni/apelaciones-cliente2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ rut }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError('Hubo un error al buscar apelaciones. Por favor, inténtalo de nuevo más tarde.');
        setAppeals([]);
        return;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setAppeals(data);
        setError('');
      } else {
        setError('La respuesta no es un JSON válido');
        setAppeals([]);
      }
    } catch (error) {
      console.error('Error al buscar apelaciones:', error);
      setError('Hubo un error al buscar apelaciones. Por favor, inténtalo de nuevo más tarde.');
      setAppeals([]);
    }
  };
  
  const handleUpdateStatus = async () => {
    try {
      if (!selectedAppeal || !selectedAppeal._id) {
        setError('No se ha seleccionado una apelación válida para actualizar.');
        return;
      }
  
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:443/adm-muni/decision-apelacion`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus, _id: selectedAppeal._id }),
      });
  
      if (!response.ok) {
        const { error } = await response.json();
        setError(`Hubo un error al actualizar el estado de la apelación: ${error}`);
        return;
      }
  
      const updatedAppeals = appeals.map((appeal) =>
        appeal._id === selectedAppeal._id ? { ...appeal, status: newStatus } : appeal
      );
      setAppeals(updatedAppeals);
      setError('');
    } catch (error) {
      console.error('Error al actualizar el estado de la apelación:', error);
      setError('Hubo un error al actualizar el estado de la apelación. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  useEffect(() => {
    if (updatePending) {
      handleUpdateStatus();
      setUpdatePending(false);
    }
  }, [updatePending]);

  return (
    <VStack spacing={4} align="stretch">
      <Box p={8} maxWidth="500px" mx="auto">
        <Text>Buscar apelaciones por RUT:</Text>
        <Input
          type="text"
          placeholder="Ingrese el RUT del cliente"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />
        <Center>
          <Button onClick={handleSearch} colorScheme="teal" mt={8} spacing='10'>
            Buscar
          </Button>
        </Center>
      </Box>

      {error && <Text color="red">{error}</Text>}

      {appeals.length > 0 && (
        <Center>
          <Box>
            <Center>
              <Text fontSize='2xl' fontWeight="bold" mb={5}>
                Apelaciones del cliente:
              </Text>
            </Center>
            <Table variant="striped" size='lg'>
              <Thead>
                <Tr>
                  <Th>Fecha de presentación</Th>
                  <Th>Estado</Th>
                  <Th>Motivo</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {appeals.map((appeal) => (
                  <Tr key={appeal._id}>
                    <Td>{format(new Date(appeal.dateSubmitted), 'dd-MM-yyyy')}</Td>
                    <Td>{appeal.status}</Td>
                    <Td>{appeal.reason}</Td>
                    <Td>
                      <Select
                        placeholder="Seleccionar estado"
                        onChange={(e) => setNewStatus(e.target.value)}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobada">Aprobada</option>
                        <option value="rechazada">Rechazada</option>
                      </Select>
                      <Button
                        colorScheme="teal"
                        ml={2}
                        onClick={() => {
                          setSelectedAppeal(appeal);
                          setUpdatePending(true);
                        }}
                      >
                        Actualizar Estado
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Center>
      )}
    </VStack>
  );
};

export default AppealList;
