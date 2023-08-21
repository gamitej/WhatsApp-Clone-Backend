function SocketConnection(io) {
  // io.use((socket, next) => {
  //   const token = socket.handshake.query.token;
  //   if (!token) {
  //     return next(new Error('Authentication token missing'));
  //   }
  //   jwt.verify(token, SECRET_KEY, (err, decoded) => {
  //     if (err) {
  //       return next(new Error('Authentication error'));
  //     }
  //     const user = users.find(u => u.id === decoded.userId);
  //     if (!user) {
  //       return next(new Error('User not found'));
  //     }
  //     socket.user = user;
  //     next();
  //   });
  // });

  io.on("connection", (socket) => {
    console.log(`Connected to ${socket.id}`);

    // joined chat
    socket.on("join-chat", (data) => {
      socket.join(data.roomId);
      console.log(data);
    });

    // sent message to chat
    socket.on("send-chat-message", (data) => {
      console.log(data);
      socket.to(data.roomId).emit("received-chat-message", data);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected " + socket.id);
    });
    // end
  });
}

module.exports = { SocketConnection };
