const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
// const cors = require('cors')
// const path = require('path')

const port = process.env.PORT || 3000
const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin : 'http://localhost:3001'
  }
});

// app.use(express.static(path.join(__dirname, '../front/public')));

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado')

    socket.on('mensaje', (mensaje) => {
        console.log(`Mensaje recibido: ${mensaje}`)
        // Puedes emitir mensajes a todos los clientes conectados
        io.emit('mensaje', mensaje);
    });

    // Manejar la desconexión del cliente
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado')
    });
});

// Inicia el servidor
server.listen(port, () => {
    console.log(`La aplicación está corriendo en http://localhost:${port}`)
});
