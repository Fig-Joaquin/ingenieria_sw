import React from 'react';
import backgroundImage from './images/LogoConcepcion.png'; // Asegúrate de que la ruta sea correcta
import {Box, Heading} from '@chakra-ui/react';

function App() {
  return (
      <Box  
      h='10vh'
      bg='gray'
      bgImage={`url(${backgroundImage})`}
      bgRepeat={'no-repeat'}
      bgSize={'cover'}
      
      >
        <Heading
        color='black'
        textTransform='uppercase'
        textAlign='center'
        fontSize='2xl'
        fontWeight='bold'
        position="absolute"
        top="4%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex="1"
        textShadow="2px 2px 2px rgba(220, 250, 229, 200)" // Agregado: sombra al texto
        padding="1rem" // Agregado: espacio interno
        borderRadius="8px" // Agregado: bordes redondeados
        margin="0 auto" // Agregado: centrar el título horizontalmente
        maxWidth="600px" // Agregado: ancho máximo del título
      >
        Pagos Generales <br /> de la Municipalidad de Concepción
      </Heading>
      </Box>
  );
}

export default App;
