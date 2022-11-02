// import React, { useReducer, useEffect } from "react";
// import ReactDom from "react-dom";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import { reducer, InitStateContext } from "../shared/hooks/useInitState";
// import P1 from "./modules/Production/page/P1";
// import P2 from "./modules/Production/page/P2";

// const Router = () => {
//   return (
//     <Routes>
//       <Route path="/p1" element={<P1 />} />
//       <Route path="/p2" element={<P2 />} />
//     </Routes>
//   );
// };

// // 脱水
// const get_initState = () => {
//   return window.__INIT_STATE__;
// };

// const App = () => {
//   const [state, dispatch] = useReducer(reducer, get_initState());

//   return (
//     <BrowserRouter basename="/p">
//       <InitStateContext.Provider value={[state, dispatch]}>
//         <Router></Router>
//       </InitStateContext.Provider>
//     </BrowserRouter>
//   );
// };

// ReactDom.hydrate(<App></App>, document.getElementById("root"));
"use strict";