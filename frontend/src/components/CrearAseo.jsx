import { useState } from 'react';
import axios from 'axios';

export const CrearPagoBasura = () => {
  const [formulario, setFormulario] = useState({
    nombreResidente: '',
    rutResidente: '',
    direccion: '',
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
      const response = await axios.post('/aseo/crear', formulario);
      console.log(response.data.mensaje);

      // Aquí podrías redirigir al usuario a la página de subir comprobante, por ejemplo.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Servicio De Basura:</h1>
      <p><h2>Ingrese los datos del residente:</h2></p>
      <form onSubmit={handleSubmit}>
        <label>
          NOMBRE: 
          <input
            type="text"
            name="nombreResidente"
            value={formulario.nombreResidente}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          RUT:
          <input
            type="text"
            name="rutResidente"
            value={formulario.rutResidente}
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
          TELEFONO:
          <input
            type="text"
            name="telefono"
            value={formulario.telefono}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <label>
          CORREO ELECTRÓNICO:
          <input
            type="text"
            name="email"
            value={formulario.email}
            onChange={handleChange}
          />
        </label>
        <p></p>
        <button type="submit">Enviar solicitud de pago</button>
      </form>
    </div>
  );
};



