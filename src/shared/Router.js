import React from 'react';
import P1 from "../client/modules/Production/page/P1";
import P2 from "../client/modules/Production/page/P2";
import H1 from "../client/modules/Home/page/Hom1";
import H2 from "../client/modules/Home/page/Hom2";
import {  Route, Routes } from "react-router-dom";

const PRouter = (props) => {
  return (
    <Routes basename={props.basename}>
      <Route path="/pro/" element={<P1 />} />
      <Route path="/pro/p2" element={<P2 />} />
    </Routes>
  );
};
const HRouter = (props) => {
  return (
    <Routes basename={props.basename}>
      <Route path="/home/" element={<H1 />} />
      <Route path="/home/h2" element={<H2 />} />
    </Routes>
  );
};

export {
  PRouter,
  HRouter
}