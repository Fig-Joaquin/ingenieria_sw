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
  useToast,
  Center,
  Collapse,
  Link,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';

const DatosTransferencia = () => {
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [rutUsuario, setRutUsuario] = useState('');
  const [categoria, setCategoria] = useState('');
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [uploadError, setUploadError] = useState(null);
  const [services, setServices] = useState([]);
  const [isServicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://146.83.198.35:1704/datosmunicipalidad/obtener-datos-transferencia');
        setDatos(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de transferencia:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    setServices([
      { servicio: 'Permiso de Circulación Automovil', precio: '70.000' },
      { servicio: 'Permiso de Circulación Moto', precio: '60.000' },
      { servicio: 'Permiso de Circulación Camión', precio: '90.000' },
      { servicio: 'Permiso de Construcción Menor Magnitud', precio: '250.000' },
      { servicio: 'Permiso de Construcción Mayor Magnitud', precio: '500.000' },
      { servicio: 'Permiso de Edificación', precio: '300.000' },
      { servicio: 'Permiso para Eventos para <100.000 personas', precio: '250.000' },
      { servicio: 'Permiso para Eventos para >100.000 personas', precio: '400.000' },
      { servicio: 'Patente Comercial Pyme', precio: '100.000' },
      { servicio: 'Patente Comercial Medianas Empresas', precio: '350.000' },
      { servicio: 'Patente Comercial Grandes Empresas', precio: '700.000' },
      { servicio: 'Servicio de Basura', precio: '15.000' },
    ]);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleRutChange = (event) => {
    setRutUsuario(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    const newCategoria = event.target.value;
    setCategoria(newCategoria);
  };

  const handleFileUpload = async () => {
    try {
      // Verificar si el archivo y los campos requeridos están presentes
      if (!rutUsuario || !categoria || !selectedFile) {
        toast({
          title: 'Error',
          description: 'Complete todos los campos antes de subir el comprobante.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // Obtener el formularioId antes de subir el comprobante
      const validarComprobante = await axios.post('http://146.83.198.35:1704/validar/comprobante', {
        rutUsuario,
        categoria,
      });

      let formData;

      if (validarComprobante.data.existe && validarComprobante.data.idFormulario) {
        // Agregar el idFormulario al formData antes de enviarlo
        formData = new FormData();
        formData.append('comprobante', selectedFile);
        formData.append('rutUsuario', rutUsuario);
        formData.append('categoria', categoria);
        formData.append('formularioId', validarComprobante.data.idFormulario);

        // Subir el comprobante
        const response = await axios.post('http://146.83.198.35:1704/upload/subir-comprobante', formData);

        toast({
          title: 'Éxito',
          description: `Se encontró un formulario asociado a su RUT correctamente.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        // Si se encuentra el formulario, mostrar el modal de éxito
        setUploadError(null);
        onOpen();
      } else {
        // Si no se encuentra el formulario, mostrar un mensaje de error
        console.error('Comprobante no asociado a algún formulario.');
        toast({
          title: 'Error',
          description: 'El comprobante no está asociado a ningún formulario inscrito, verifique el RUT y la categoría.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Manejar errores al subir o validar el comprobante
      console.error('Error al subir o validar el comprobante.', error);

      toast({
        title: 'Error',
        description: 'Ocurrió un error al subir o validar su comprobante.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box p={8} maxW="500px" mx="auto" borderWidth="1px" borderRadius="lg">
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="xl" mb={2}>
            <Center h="100hv">Datos de Transferencia </Center>
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
                  <strong>RUT Contribuidor:</strong> {datos?.rutTitular}
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

          <Center h="100hv">
            <Button
              colorScheme="teal"
              variant='outline'
              onClick={() => setServicesOpen(!isServicesOpen)}
              mt={2}
            >
              Ver Servicios y Precios
            </Button>
          </Center>

          <Collapse in={isServicesOpen}>
            <VStack align="start">
              <Heading as="h3" size="sm" mt={3}>
                Servicios y Precios:
              </Heading>
              {services.map((service) => (
                <Text key={service.servicio}>
                  {service.servicio}: ${service.precio}
                </Text>
              ))}
            </VStack>
          </Collapse>

          <Box p={4} borderWidth="1px" borderRadius="lg">
            <Heading as="h2" size="md" mb={2}>
              <Center h="100hv">
                <AttachmentIcon boxSize={5} mb={5} /> Subir Comprobante de Transferencia
              </Center>
            </Heading>
            <Input type="file" onChange={handleFileChange} mb={2} />
            <Text fontSize="medium" mb={5}>
              <Center h="100hv"> ¿No puedes subir imágenes?{' '}</Center>
              <Link color='teal.500' href='/subirtransaccion'>
                <Center h="100hv"> Prueba enviar tu número de transacción{' '}</Center>
              </Link>
              <FormControl>
                <FormLabel>RUT Contribuidor:</FormLabel>
                <Input
                  type="text"
                  value={rutUsuario}
                  onChange={handleRutChange}
                  placeholder="Ingrese su RUT"
                />
              </FormControl>
            </Text>
            <FormControl>
              <FormLabel>Categoría:</FormLabel>
              <Select
                placeholder="Seleccione una categoría"
                value={categoria}
                onChange={handleCategoriaChange}
              >
                <option value="Circulacion">Permiso de Circulación 2024</option>
                <option value="Construccion">Permiso de Construccion</option>
                <option value="Edificacion">Permiso de Edificacion</option>
                <option value="Eventos">Permiso para Eventos</option>
                <option value="Comercial">Patente Comercial</option>
                <option value="Basura">Servicio de Basura</option>
              </Select>
            </FormControl>
            <Center h="100hv">
              <Button colorScheme="teal" onClick={handleFileUpload}>
                Enviar Comprobante
              </Button>
            </Center>
            <Center h="100hv">
              <BackToHomeButton />
            </Center>
          </Box>
        </VStack>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>¡Muchas Gracias!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Su comprobante se ha subido con éxito. Por favor estar a la espera de que un administrador valide su comprobante (1-3 días hábiles).
            </ModalBody>
            <ModalFooter>
              <BackToHomeButton />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default DatosTransferencia;
