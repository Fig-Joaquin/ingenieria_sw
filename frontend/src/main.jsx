import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import App from './app.jsx';
import Form from './routes/FormRoutes.jsx';
import backgroundImage from './images/mun.jpg'; // Asegúrate de que la ruta sea correcta
//
ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <Box
      as="div"
      position="relative"
      height="100vh"
    >
      <Box
        as="div"
        position="absolute"
        top="0"
        right="0"
        width="50%"
        height="50%" 
        backgroundImage={`url(${backgroundImage})`}
        backgroundSize="400px 4 00px"
        backgroundPosition="top right"
        backgroundRepeat="no-repeat"
      />
      <React.StrictMode>
        <Form />
        <App />
      </React.StrictMode>
    </Box>
  </ChakraProvider>,
);
