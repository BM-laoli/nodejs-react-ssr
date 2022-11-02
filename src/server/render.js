import React, { useReducer } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { reducer, InitStateContext } from "../shared/hooks/useInitState";
import P1 from "../client/modules/Production/page/P1";
import P2 from "../client/modules/Production/page/P2";
import H1 from "../client/modules/Home/page/Hom1";
import H2 from "../client/modules/Home/page/Hom2";

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
      <Route path="/home/h2" element={<H2 />} />
    </Routes>
  );
};

const App = (props) => {
  const [state, dispatch] = useReducer(reducer, props.data);

  return (
    <InitStateContext.Provider value={[state, dispatch]}>
      <StaticRouter location={props.path}>
        {state.page === "home" && <HRouter basename={state.basename}></HRouter>}
        {state.page === "pro" && <PRouter basename={state.basename}></PRouter>}
      </StaticRouter>
    </InitStateContext.Provider>
  );
};

const render = (path, data) => {
  console.log("path", path);
  return renderToString(<App data={data} path={path}></App>);
};

export { render };
