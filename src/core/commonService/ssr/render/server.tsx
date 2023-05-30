/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useReducer } from 'react';
import { renderToString } from 'react-dom/server';
import { reducer, InitStateContext } from '../hooks/useInitState';

const App = (props) => {
  const [state, dispatch] = useReducer(reducer, props.initState);

  return (
    <InitStateContext.Provider value={[state, dispatch]}>
      {props.children}
    </InitStateContext.Provider>
  );
};

const render = (PageContent, initState) => {
  return renderToString(
    <App initState={initState}>
      <PageContent></PageContent>
    </App>,
  );
};

export { render };
