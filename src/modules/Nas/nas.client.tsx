import React, { useReducer, useMemo, useRef, useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client';
import Home from './nas.view';

const get_initState = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return window.__INIT_STATE__;
};

const App = (props) => {
  return <Home></Home>;
};

hydrateRoot(
  document.getElementById('root'),
  <App initState={get_initState()}></App>,
);
