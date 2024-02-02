// where the socket.io listners and (mostly) emitters will be
const socketMain = (io, pid) => {
  io.on("connection", (socket) => {
    let machineMacA;
    const auth = socket.handshake.auth;
    console.log(auth.token);
    if (auth.token === "123kjhlkjnklsnflkdcmsldmefbjhhedkb") {
      //valid clientNode
      socket.join("nodeClient"); // this is a nodeClient
    } else if (auth.token === "123kjhlkjnklsnflkdcmsldm") {
      //valid reactClient
      socket.join("reactClient");
    } else {
      socket.disconnect();
      console.log("YOU HAVE BEEN DISCONNECTED!!");
    }
    console.log(`someone connected on worker ${process.pid}`);
    socket.emit("welcome", "welcome to our cluster driven socket.io server");

    socket.on("perfData", (data) => {
      console.log("Tick...", pid);
      console.log(data);
      if (!machineMacA) {
        machineMacA = data.macA;
        io.to("reactClient").emit("connectedOrNot", {
          machineMacA,
          isAlive: true,
        });
      }
      io.to("reactClient").emit("perfData", data);
    });

    socket.on("testConnection", (data) => {
      console.log(data);
    });

    socket.on("secondTest", (data) => {
      console.log(data);
    });

    socket.on("disconnect", (reason) => {
      //a nodeClient just disconnected. let the front-end know
      io.to("reactClient").emit("connectedOrNot", {
        machineMacA,
        isAlive: false,
      });
    });
  });
};

module.exports = socketMain;
