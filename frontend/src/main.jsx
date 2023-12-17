import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Form from './routes/FormRoutes.jsx';

//
ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
      <React.StrictMode>
      <Form />
      </React.StrictMode>
  </ChakraProvider>,
);
