import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react'; 

const BackToHomeButton = ({ to = '/' }) => {
  return (
    <Link to={to}>
      <Button colorScheme="teal" mt={8} spacing={4} align="stretch">
        Volver a la página principal
      </Button>
    </Link>
  );
};

export default BackToHomeButton;
