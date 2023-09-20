import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Debes especificar la URL de tu servidor Express

function App() {
  const [mensaje, setMensaje] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {

    socket.on('mensaje', (mensaje) => {
      setMensaje(mensaje);
    });

  }, [ ]);

  const enviarMensaje = () => {
    // Enviar un mensaje al servidor
    socket.emit('mensaje', text);
  };

  return (
    <div>
      <h1>Mi Aplicación con WebSocket</h1>
      <p>Mensaje del servidor: {mensaje}</p>
      <input type='text' onChange={({ target }) => setText(target.value)} />
      <button onClick={enviarMensaje}>Enviar Mensaje</button>
    </div>
  );
}

export default App;
