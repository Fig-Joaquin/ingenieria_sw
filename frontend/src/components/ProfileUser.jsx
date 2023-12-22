import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  Divider,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Textarea,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rut, setRut] = useState('');
  const [userFines, setUserFines] = useState([]);
  const [appealReason, setAppealReason] = useState('');
  const { state } = useLocation();
  const userRut = state?.rut || '';

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }

    setRut(state?.rut || ''); // Accede a rut desde el state
  }, [navigate, state]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleViewFines = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log('userRut:', userRut);

      if (userRut) {
        // Corrige la URL de la solicitud
        const response = await axios.get(`http://146.83.198.35:1704/adm-muni/persona-multa/${userRut}`, config);
        console.log(response);

        // Asegúrate de que response.data sea un array o envuélvelo en un array si no lo es
        const finesArray = Array.isArray(response.data) ? response.data : [response.data];
        setUserFines(finesArray);

        setIsDrawerOpen(false);
      } else {
        console.error('Error: El valor de userRut es nulo o indefinido');
      }
    } catch (error) {
      console.error('Error al obtener multas del usuario:', error.message);
    }
  };

  const handleAppeal = (fineId) => {
    console.log("profile", fineId);
    navigate(`/Apelacion/${fineId}`);
  };
  

  return (
    <Box p={4} display="flex" flexDirection="column">
      <HStack spacing={4}>
        <Button colorScheme="teal" onClick={() => setIsDrawerOpen(true)}>
          <HamburgerIcon /> Menú
        </Button>
      </HStack>

      <Divider />

      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold">
          Perfil: {rut}
        </Text>
      </Box>

      {/* Tabla de multas */}
      {Array.isArray(userFines) && userFines.length > 0 && (
        <Box mt={4}>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Tipo</Th>
                <Th>Descripción</Th>
                <Th>Monto</Th>
                <Th>Fecha</Th>
                <Th>Lugar</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userFines.map((fine) => (
                <Tr key={fine._id}>
                  <Td>{fine.violationType}</Td>
                  <Td>{fine.description}</Td>
                  <Td>{fine.amount}</Td>
                  <Td>{new Date(fine.violationDate).toLocaleDateString()}</Td>
                  <Td>{fine.location}</Td>
                  <Td>{fine.status}</Td>
                  <Td>
                    <Button colorScheme="teal" onClick={() => handleAppeal(fine._id)}>
                      Apelar
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      <Drawer placement="left" onClose={() => setIsDrawerOpen(false)} isOpen={isDrawerOpen}>
        <DrawerOverlay />
        <DrawerContent bgGradient='linear(to-l, #7fc6bd, #008d7a)' p={4}>
          <DrawerCloseButton />
          <DrawerHeader color="white">
            <HamburgerIcon /> Menú
          </DrawerHeader>
          <Divider />
          <Button colorScheme="teal" onClick={handleViewFines}>
            Ver mis multas
          </Button>
          <Divider />
          <DrawerFooter>
            <Button colorScheme="red" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {appealReason && (
        <>
          <Box mt={4}>
            <Text fontSize="lg" fontWeight="bold">
              Motivo de la Apelación:
            </Text>
            <Textarea
              value={appealReason}
              onChange={(e) => setAppealReason(e.target.value)}
              placeholder="Escribe tu motivo aquí..."
              size="sm"
              resize="vertical"
            />
          </Box>

        </>
      )}
    </Box>
  );
};

export default ProfilePage;
