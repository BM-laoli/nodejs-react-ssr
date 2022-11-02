import React, { useReducer, useEffect } from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { reducer, InitStateContext } from "../shared/hooks/useInitState";
import { HRouter, PRouter } from '../shared/Router';

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
