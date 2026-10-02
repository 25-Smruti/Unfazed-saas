export const initChatSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
    });

    socket.on('send_message', (data) => {
      io.to(data.roomId).emit('receive_message', {
        sender: data.sender,
        text: data.text,
        createdAt: new Date().toISOString()
      });
    });
  });
};
