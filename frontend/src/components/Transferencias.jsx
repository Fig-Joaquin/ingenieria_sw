// components/UpdateStatusForm.js

import React, { useState } from 'react';
import axios from 'axios';

const UpdateStatusForm = () => {
  const [rut, setRut] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const handleUpdateStatus = async () => {
    try {
      await axios.put('http://localhost:443/usuario/usuarios/actualizar-status', { rut, newStatus });
      console.log('Estado del usuario actualizado exitosamente');
      // Puedes realizar acciones adicionales después de actualizar el estado
    } catch (error) {
      console.error('Error al actualizar el estado del usuario:', error);
    }
  };

  return (
    <div>
      <h2>Actualizar Estado del Usuario</h2>
      <label>RUT del usuario: </label>
      <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} />
      <br />
      <label>Nuevo estado: </label>
      <input type="text" value={newStatus} onChange={(e) => setNewStatus(e.target.value)} />
      <br />
      <button onClick={handleUpdateStatus}>Actualizar Estado</button>
    </div>
  );
};

export default UpdateStatusForm;
