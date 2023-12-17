import React, { useState } from 'react';
import axios from 'axios';

export const CrearPermisoCirculacion = () => {
  const [formulario, setFormulario] = useState({
    rut: '',
    patente: '',
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/permiso/crear', formulario);
      console.log(response.data.mensaje);

      // Añadir redirección
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Solicitud de Permiso de Circulación:</h1>
      <p>
        <h2>Ingrese los datos del solicitante:</h2>
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          RUT:
          <input
            type="text"
            name="rut"
            value={formulario.rut}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          PATENTE:
          <input
            type="text"
            name="patente"
            value={formulario.patente}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <button type="submit">Enviar solicitud</button>
      </form>
    </div>
  );
};
