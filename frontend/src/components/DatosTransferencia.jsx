import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import BackToHomeButton from './forms/back';
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  ChakraProvider,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

const DatosTransferencia = () => {
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const response = await axios.get('http://localhost:443/datosmunicipalidad/obtener-datos-transferencia');
        console.log('Data response:', response.data);
        setDatos(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de transferencia:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('comprobante', selectedFile);

      const response = await axios.post('http://localhost:443/upload/subir-comprobante', formData);

      console.log('File uploaded:', response.data);

      // Limpiar el estado de error en caso de éxito
      setUploadError(null);

      onOpen();
    } catch (error) {
      console.error('Error al subir la imagen.', error);
      setUploadError(error.message);
      onOpen();
    }
  };

  return (
    <ChakraProvider>
      <Box p={8} maxW="500px" mx="auto" borderWidth="1px" borderRadius="lg">
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="xl" mb={4}>
            Datos de Transferencia
          </Heading>
          <Box p={4} borderWidth="1px" borderRadius="lg">
            {loading ? (
              <Spinner size="xl" />
            ) : (
              <VStack spacing={2} align="start">
                 <Text>
                  <strong>Banco:</strong> {datos?.banco}
                </Text>
                <Text>
                  <strong>Cuenta:</strong> {datos?.cuenta}
                </Text>
                <Text>
                  <strong>Titular:</strong> {datos?.titular}
                </Text>
                <Text>
                  <strong>RUT Titular:</strong> {datos?.rutTitular}
                </Text>
                <Text>
                  <strong>Tipo de Cuenta:</strong> {datos?.tipoCuenta}
                </Text>
                <Text>
                  <strong>Email de Contacto:</strong> {datos?.emailContacto}
                </Text>
                <Text>
                  <strong>Teléfono de Contacto:</strong> {datos?.telefonoContacto}
                </Text>
              </VStack>
            )}
          </Box>
          <Box p={4} borderWidth="1px" borderRadius="lg">
            <Heading as="h2" size="md" mb={2}>
              Subir Comprobante de Transferencia
            </Heading>
            <Text fontSize="sm" mb={2}>
                Solo se admiten imagenes en formato png.
            </Text>
            <Input type="file" onChange={handleFileChange} mb={2} />
            <Button colorScheme="purple" onClick={handleFileUpload}>
              Enviar Comprobante
            </Button>
          </Box>
        </VStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>¡Muchas Gracias!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Su comprobante se ha subido con éxito. Porfavor espere a que un administrador valide su comprobante (1-3 días hábiles).
            </ModalBody>
            <ModalFooter>
              <BackToHomeButton />
            </ModalFooter>
          </ModalContent>
        </Modal>
        {uploadError && (
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Error al subir el comprobante
                </AlertDialogHeader>

                <AlertDialogBody>
                  Por favor, suba su comprobante en formato .png
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cerrar
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default DatosTransferencia;
