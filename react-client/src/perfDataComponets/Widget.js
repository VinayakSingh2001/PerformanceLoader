import React from "react";
import Cpu from "./Cpu";
import Info from "./Info";
import Mem from "./Mem";
import "./widget.css";
import socket from "../utilities/socketConnection";
import { useEffect, useState } from "react";

const Widget = ({ data }) => {
  const [isAlive, setIsAlive] = useState(true);

  const {
    freeMem,
    totalMem,
    usedMem,
    memUseage,
    osType,
    upTime,
    cpuType,
    numCores,
    cpuSpeed,
    cpuLoad,
    macA,
  } = data;

  const cpuData = { cpuLoad };
  const memData = { freeMem, totalMem, usedMem, memUseage };
  const infoData = { macA, osType, upTime, cpuSpeed, cpuType, numCores };

  const notAliveDiv = !isAlive ? (
    <div className="not-active">Offline</div>
  ) : (
    <></>
  );
  useEffect(() => {
    socket.on("connectedOrNot", ({ isAlive, machineMacA }) => {
      if (machineMacA === macA) {
        setIsAlive(isAlive);
      }
    });
  }, []);

  return (
    <div className="widget row justify-content-evenly">
      {/* <h1>Widget</h1> */}
      {notAliveDiv}
      <Cpu data={cpuData} />
      <Info data={infoData} />
      <Mem data={memData} />
    </div>
  );
};

export default Widget;
