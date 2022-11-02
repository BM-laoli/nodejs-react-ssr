import React, { useReducer } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import Router from "../shared/Router";
import { reducer, InitStateContext } from "../shared/hooks/useInitState";

const App = (props) => {
  const [state, dispatch] = useReducer(reducer, props.data);
  return (
    <InitStateContext.Provider value={[state, dispatch]}>
      <StaticRouter>
        <Router />
      </StaticRouter>
    </InitStateContext.Provider>
  );
};

const render = (path, data, components) => {
  return renderToString(<App data={data} path={path}></App>);
};

export { render };
