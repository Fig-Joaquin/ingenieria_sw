import React, { useState } from 'react';
import axios from 'axios';

export const CrearPermisoConstruccion = () => {
  const [formulario, setFormulario] = useState({
    nombreSolicitante: '',
    rutSolicitante: '',
    direccionObra: '',
    comunaObra: '',
    empresa: '',
    cantidadTrabajadores: '',
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
      const response = await axios.post('/permconst/crear', formulario);
      console.log(response.data.mensaje);

      // Aquí redirigir al usuario.

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Permiso de Construcción:</h1>
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
          Dirección de la Obra:
          <input
            type="text"
            name="direccionObra"
            value={formulario.direccionObra}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          Comuna de la Obra:
          <input
            type="text"
            name="comunaObra"
            value={formulario.comunaObra}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          Empresa:
          <input
            type="text"
            name="empresa"
            value={formulario.empresa}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          Cantidad de Trabajadores:
          <input
            type="text"
            name="cantidadTrabajadores"
            value={formulario.cantidadTrabajadores}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          Teléfono de contacto:
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
