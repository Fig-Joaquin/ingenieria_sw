import React, { useState } from 'react';
import axios from 'axios';

export const CrearPatenteComercial = () => {
  const [formulario, setFormulario] = useState({
    nombreComercio: '',
    rubro: '',
    direccion: '',
    numeroLocal: '',
    rutTitular: '',
    nombreTitular: '',
    telefono: '',
    email: '',
    fechaInicioActividades: '',
    actividadEconomica: '',
    cantidadEmpleados: '',
    ingresosAnuales: '',
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
      const response = await axios.post('/patcom/crear', formulario);
      console.log(response.data.mensaje);

      // Añadir redirección. 
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Solicitud de Patente Comercial:</h1>
      <p>
        <h2>Ingrese los datos del comercio:</h2>
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          NOMBRE COMERCIO:
          <input
            type="text"
            name="nombreComercio"
            value={formulario.nombreComercio}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          RUBRO:
          <input
            type="text"
            name="rubro"
            value={formulario.rubro}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          DIRECCIÓN:
          <input
            type="text"
            name="direccion"
            value={formulario.direccion}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          NÚMERO DEL LOCAL:
          <input
            type="number"
            name="numeroLocal"
            value={formulario.numeroLocal}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          CANTIDAD DE EMPLEADOS:
          <input
            type="number"
            name="cantidadEmpleados"
            value={formulario.cantidadEmpleados}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          INGRESOS ANUALES APROXIMADOS:
          <input
            type="number"
            name="ingresosAnuales"
            value={formulario.ingresosAnuales}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <button type="submit">Enviar solicitud</button>
      </form>
    </div>
  );
};
