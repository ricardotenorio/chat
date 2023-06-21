import {Server, Socket} from 'socket.io';

const messages: string[] = [];

function socket({io}: {io: Server}) {
  console.log('Sockets enabled');

  io.on('connection', (socket: Socket) => {
    console.log(`User connected ${socket.id}`);

    socket.emit('get all messages', messages);
    socket.broadcast.emit('log', `User connected ${socket.id}`);

    socket.on('send message', message => {
      messages.push(message);

      socket.broadcast.emit('new message', message);
    });

    socket.on('disconnect', () => {
      console.log(`user disconnected ${socket.id}`);

      socket.broadcast.emit('log', `user disconnected ${socket.id}`);
    });
  });
}

export default socket;
