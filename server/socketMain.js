// where the socket.io listners and (mostly) emitters will be
const socketMain = (io) => {
  io.on("connection", (socket) => {
    console.log(`someone connected on worker ${process.pid}`);
    socket.emit("welcome", "welcome to our cluster driven socket.io server");
  });
};

module.exports = socketMain;
