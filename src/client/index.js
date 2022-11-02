import React, { useReducer, useMemo } from "react";
import ReactDom from "react-dom";
import { reducer, InitStateContext } from "../shared/hooks/useInitState";
import { Router } from '../shared/Router'

// 脱水
const get_initState = () => {
  return window.__INIT_STATE__;
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, get_initState());
  
  const Component =  useMemo(() =>{
    const CH  = Router[state.page]  || <></>
    return <CH></CH>
  }, []);

  return (
      <InitStateContext.Provider value={[state, dispatch]}>
        { Component }
      </InitStateContext.Provider>
  );
};

ReactDom.hydrate(<App></App>, document.getElementById("root"));
