import React, { useReducer, useEffect } from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Router from "../shared/Router";
import { reducer, InitStateContext } from "../shared/hooks/useInitState";

// 脱水
const get_initState = () => {
  return window.__INIT_STATE__;
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, get_initState());

  return (
    <BrowserRouter basename="/home">
      <InitStateContext.Provider value={[state, dispatch]}>
        <Router></Router>
      </InitStateContext.Provider>
    </BrowserRouter>
  );
};

ReactDom.hydrate(<App></App>, document.getElementById("root"));
