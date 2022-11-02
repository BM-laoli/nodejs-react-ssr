import React, { useReducer, useEffect } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { reducer, InitStateContext } from "../shared/hooks/useInitState";
import P1 from "./modules/Production/page/P1";
import P2 from "./modules/Production/page/P2";
import H1 from "./modules/Home/page/Hom1";
import H2 from "./modules/Home/page/Hom2";

const PRouter = (props) => {
  return (
    <Routes basename={props.basename}>
      <Route path="/" element={<P1 />} />
      <Route path="/pro/p2" element={<P2 />} />
    </Routes>
  );
};
const HRouter = (props) => {
  return (
    <Routes basename={props.basename}>
      <Route path="/" element={<H1 />} />
      <Route path="home/h2" element={<H2 />} />
    </Routes>
  );
};

// 脱水
const get_initState = () => {
  return window.__INIT_STATE__;
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, get_initState());

  return (
    <BrowserRouter basename={state.page}>
      <InitStateContext.Provider value={[state, dispatch]}>
        {state.page === "home" && <HRouter basename={state.basename}></HRouter>}
        {state.page === "pro" && <PRouter basename={state.basename}></PRouter>}
      </InitStateContext.Provider>
    </BrowserRouter>
  );
};

ReactDom.hydrate(<App></App>, document.getElementById("root"));
