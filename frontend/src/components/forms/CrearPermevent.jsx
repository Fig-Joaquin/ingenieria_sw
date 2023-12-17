import React, { useState } from 'react';
import axios from 'axios';

export const CrearPermisoEventos = () => {
  const [formulario, setFormulario] = useState({
    nombreSolicitante: '',
    rutSolicitante: '',
    tipoEvento: '',
    fechaEvento: '',
    asistentesAprox: '',
    lugarEvento: '',
    telefono: '',
    email: '',
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
      const response = await axios.post('/permevent/crear', formulario);
      console.log(response.data.mensaje);

      // Añadir redirección.

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Permiso de Eventos y Espectáculos:</h1>
      <p>
        <h2>Ingrese los datos del solicitante:</h2>
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Solicitante:
          <input
            type="text"
            name="nombreSolicitante"
            value={formulario.nombreSolicitante}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          RUT del Solicitante:
          <input
            type="text"
            name="rutSolicitante"
            value={formulario.rutSolicitante}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          Tipo de Evento:
          <input
            type="text"
            name="tipoEvento"
            value={formulario.tipoEvento}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          Fecha del Evento:
          <input
            type="text"
            name="fechaEvento"
            value={formulario.fechaEvento}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          Asistentes Aproximados:
          <input
            type="text"
            name="asistentesAprox"
            value={formulario.asistentesAprox}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          Lugar del Evento:
          <input
            type="text"
            name="lugarEvento"
            value={formulario.lugarEvento}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          Teléfono:
          <input
            type="text"
            name="telefono"
            value={formulario.telefono}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          Correo Electrónico:
          <input
            type="text"
            name="email"
            value={formulario.email}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <button type="submit">Enviar solicitud</button>
      </form>
    </div>
  );
};
