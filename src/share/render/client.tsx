import React, { useReducer, useMemo } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { InitStateContext, reducer } from '../hooks/useInitState';
import Routes from '../Routes';

// 脱水
const get_initState = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return window.__INIT_STATE__;
};

const App = (props) => {
  const [state, dispatch] = useReducer(reducer, get_initState());

  const Component = useMemo(() => {
    const CH = Routes[state?.page] || <></>;
    return <CH></CH>;
  }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <InitStateContext.Provider value={[state, dispatch]}>
      {Component}
    </InitStateContext.Provider>
  );
};

hydrateRoot(document.getElementById('root'), <App></App>);
