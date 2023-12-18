import React, { useEffect, useState } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch('http://146.83.198.35:1704/adm-muni/check', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);

          // Verificar la ruta específica '/fine' en el servidor
          if (location.pathname === '/fines') {
            const fineVerificationResponse = await fetch('http://146.83.198.35:1704/adm-muni/check', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!fineVerificationResponse.ok) {
              setIsAuthenticated(false);
            }
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error al verificar el token:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Route {...rest} element={<Component />} />;

};

export default ProtectedRoute;
