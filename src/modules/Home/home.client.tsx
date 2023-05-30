import React, { useReducer, useMemo, useRef, useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client';
import {
  InitStateContext,
  reducer,
} from '../../../src/core/commonService/ssr/hooks/useInitState';
import Home from './home.view';

const get_initState = () => {
  // @ts-ignore
  return window.__INIT_STATE__;
};

const App = (props) => {
  const [state, dispatch] = useReducer(reducer, props.initState);

  return (
    <InitStateContext.Provider value={[state, dispatch]}>
      <Home></Home>
    </InitStateContext.Provider>
  );
};

hydrateRoot(
  document.getElementById('root'),
  <App initState={get_initState()}></App>,
);
