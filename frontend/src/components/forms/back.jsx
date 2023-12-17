import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react'; // Asegúrate de importar el componente Button de tu biblioteca de UI

const BackToHomeButton = ({ to = '/' }) => {
  return (
    <Link to={to}>
      <Button colorScheme="teal" size="md" borderRadius="md">
        Volver a la página principal
      </Button>
    </Link>
  );
};

export default BackToHomeButton;
