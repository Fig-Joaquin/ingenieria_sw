import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Form from './routes/FormRoutes.jsx';
import DatosForm from './routes/TransferenciaRoutes.jsx';

createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <React.StrictMode>
      <Form />
      <DatosForm />
    </React.StrictMode>
  </ChakraProvider>,
);