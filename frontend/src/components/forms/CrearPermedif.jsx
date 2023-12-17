import React, { useState } from 'react';
import axios from 'axios';

export const CrearPermisoEdificacion = () => {
  const [formulario, setFormulario] = useState({
    nombreSolicitante: '',
    rutSolicitante: '',
    tipoEdificacion: '',
    direccionEdificacion: '',
    comunaEdificacion: '',
    telefono: '',
    email: '',
    montoPago: '',
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
      const response = await axios.post('/permedif/crear', formulario);
      console.log(response.data.mensaje);

      // Añadir redirección

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Permiso de Edificación:</h1>
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
          Tipo de Edificación:
          <input
            type="text"
            name="tipoEdificacion"
            value={formulario.tipoEdificacion}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          Dirección de la Edificación:
          <input
            type="text"
            name="direccionEdificacion"
            value={formulario.direccionEdificacion}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          Comuna de la Edificación:
          <input
            type="text"
            name="comunaEdificacion"
            value={formulario.comunaEdificacion}
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
        <label>
          Monto de Pago:
          <input
            type="text"
            name="montoPago"
            value={formulario.montoPago}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <button type="submit">Enviar solicitud de permiso de edificación</button>
      </form>
    </div>
  );
};

