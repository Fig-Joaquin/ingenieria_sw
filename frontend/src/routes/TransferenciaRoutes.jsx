import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DatosTransferencia from '../components/DatosTransferencia';
import { ChakraProvider } from '@chakra-ui/react';

const DatosForm = ({ loading, datos }) => {
  return (
    <ChakraProvider>
    <Router>
      <Routes>
          <Route path="/DatosTransferencia" element={<DatosTransferencia />} />
      </Routes>
    </Router>
    </ChakraProvider>
  );
};
export default DatosForm;
