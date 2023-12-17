import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Form from './routes/FormRoutes.jsx';

createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <React.StrictMode>
      <Form />
    </React.StrictMode>
  </ChakraProvider>,
);