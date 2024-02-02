import React from "react";
import Cpu from "./Cpu";
import Info from "./Info";
import Mem from "./Mem";

const Widget = ({ data }) => {
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

  return (
    <>
      <h1>Widget</h1>
      <Cpu data={cpuData} />
      <Info data={infoData} />
      <Mem data={memData} />
    </>
  );
};

export default Widget;
