import socket from "../socketConnection";
import { useEffect } from "react";

const SecondTest = () => {
  useEffect(() => {
    socket.emit("secondTest", "DataDataData");
  });
  return <h1>Second Test</h1>;
};

export default SecondTest;
