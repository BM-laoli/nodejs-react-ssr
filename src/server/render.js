import React, { useReducer } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";

import { reducer, InitStateContext } from "../shared/hooks/useInitState";
import { HRouter, PRouter } from '../shared/Router'
const App = (props) => {
  const [state, dispatch] = useReducer(reducer, props.data);
  return (
    <InitStateContext.Provider value={[state, dispatch]}>
      <StaticRouter location={props.path}>
        {state.basename === "home" && <HRouter basename={state.basename}></HRouter>}
        {state.basename === "pro" && <PRouter basename={state.basename}></PRouter>}
      </StaticRouter>
    </InitStateContext.Provider>
  );
};

const render = (path, data) => {
  console.log("path--->", path);
  return renderToString(<App data={data} path={path}></App>);
};

export { render };
