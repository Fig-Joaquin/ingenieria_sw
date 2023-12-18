import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react'; 

const BackProfile = ({ to = '/profile' }) => {
  return (
    <Link to={to}>
      <Button colorScheme="teal" mt={8} spacing={4} align="stretch">
        Volver al perfil
      </Button>
    </Link>
  );
};

export default BackProfile;
