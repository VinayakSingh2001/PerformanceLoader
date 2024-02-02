import "./App.css";
import socket from "./utilities/socketConnection";
import { useEffect, useState } from "react";
import Widget from "./perfDataComponets/Widget";

function App() {
  const [performanceData, setPerformanceData] = useState({});
  const perfMachineData = {};
  useEffect(() => {
    //socket was created on load of the component
    //and a listener to the socket
    socket.on("perfData", (data) => {
      // //we just got some data
      // console.log(data.macA);
      // //copy performanceData so that we can mutate it
      // const copyPerfData = { ...performanceData };
      // //performanceData is not an array, its an object, this is cuz we dont know which machine just sent
      // //its data so we can use the mac address as its property in performanceData every tick the data
      // //comes through, just overwrite that value
      // copyPerfData[data.macA] = data;

      perfMachineData[data.macA] = data;
    });
  }, []);

  useEffect(() => {
    setInterval(() => {
      setPerformanceData(perfMachineData);
    }, 1000);
  }, []);

  const widgets = Object.values(performanceData).map((d) => (
    <Widget data={d} key={d.macA} />
  ));
  return <div className="container">{widgets}</div>;
}

export default App;
