import React from 'react';
import backgroundImage from './images/LogoConcepcion.png';
import { Box, Heading } from '@chakra-ui/react';

function App() {
  return (
    <Box  
      h='10vh'
      bg='gray'
      bgImage={`url(${backgroundImage})`}
      bgRepeat='no-repeat'
      bgSize='cover'
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex="1"
      >
        <Heading
          color='black'
          textTransform='uppercase'
          textAlign='center'
          fontSize='2xl'
          fontWeight='semibolds'
          textShadow="2px 2px 2px rgba(165, 192, 173, 0.5)" // Ajustado: sombra al texto
        >
          Pagos Generales <br /> de la Municipalidad de Concepción
        </Heading>
      </Box>
    </Box>
  );
}

export default App;
