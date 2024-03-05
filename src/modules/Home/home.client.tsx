import React, { useReducer, useMemo, useRef, useEffect } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import Home from './home.view';

const get_initState = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return window.__INIT_STATE__;
};

const App = (props) => {
  return <>{props.children}</>;
};

hydrateRoot(
  document.getElementById('root'),
  <App>
    <Home initState={get_initState()}></Home>
  </App>,
);
