import "./App.css";
import socket from "./socketConnection";
import { useEffect, useState } from "react";
import Widget from "./perfDataComponets/Widget";

function App() {
  const [performanceData, setPerformanceData] = useState({});
  useEffect(() => {
    //socket was created on load of the component
    //and a listener to the socket
    socket.on("perfData", (data) => {
      //we just got some data
      // console.log(data);
      //copy performanceData so that we can mutate it
      const copyPerfData = { ...performanceData };
      //performanceData is not an array, its an object, this is cuz we dont know which machine just sent
      //its data so we can use the mac address as its property in performanceData every tick the data
      //comes through, just overwrite that value
      copyPerfData[data.macA] = data;
      setPerformanceData(copyPerfData);
    });
  }, []);
  return <Widget />;
}

export default App;
