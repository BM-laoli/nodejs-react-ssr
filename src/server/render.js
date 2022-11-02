import React, { useReducer,  useMemo } from "react";
import { renderToString } from "react-dom/server";
import { reducer, InitStateContext } from "../shared/hooks/useInitState";
import { Router } from '../shared/Router'
import Helmet from 'react-helmet'

const App = (props) => {
  const [state, dispatch] = useReducer(reducer, props.data);
  
  const Component =  useMemo(() =>{
    const CH  = Router[state.page]  || (() => <></>)
    return <CH></CH>
  }, []);

  return (
    <InitStateContext.Provider value={[state, dispatch]}>
      { Component  }
    </InitStateContext.Provider>
  );
};

const render = (path, data ) => {
  return renderToString(<App data={data} path={path}></App>);
};

export { render };
