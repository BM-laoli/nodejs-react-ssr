// import React, { useReducer, useEffect } from "react";
// import ReactDom from "react-dom";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import { reducer, InitStateContext } from "../../../shared/hooks/useInitState";
// import Home1 from "./page/Hom1";
// import Home2 from "./page/Hom2";

// const Router = () => {
//   return (
//     <Routes>
//       <Route path="/home1" element={<Home1 />} />
//       <Route path="/home2" element={<Home2 />} />
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
//     <BrowserRouter basename="/home">
//       <InitStateContext.Provider value={[state, dispatch]}>
//         <Router></Router>
//       </InitStateContext.Provider>
//     </BrowserRouter>
//   );
// };

// ReactDom.hydrate(<App></App>, document.getElementById("root"));
