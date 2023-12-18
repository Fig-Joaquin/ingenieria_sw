import React, { useState } from 'react';
import axios from 'axios';

const MostrarImagenesPorUsuario = () => {
  const [rutUsuario, setRutUsuario] = useState('');
  const [archivos, setArchivos] = useState([]);

  const handleBuscarArchivos = async () => {
    try {
      const response = await axios.post('http://localhost:443/rutaarchivo/buscar', { rutUsuario });
      setArchivos(response.data.archivos);
    } catch (error) {
      console.error('Error al buscar archivos por usuario:', error);
    }
  };

  return (
    <div>
      <h2>Mostrar Imágenes por Usuario</h2>
      <label>RUT del usuario: </label>
      <input type="text" value={rutUsuario} onChange={(e) => setRutUsuario(e.target.value)} />
      <button onClick={handleBuscarArchivos}>Buscar</button>

      <h3>Imágenes asociadas al usuario:</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {archivos.map((archivo) => (
          <div key={archivo._id} style={{ margin: '10px' }}>
            <img src={archivo.resized} alt={`Imagen asociada a ${archivo.rutUsuario}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostrarImagenesPorUsuario;
