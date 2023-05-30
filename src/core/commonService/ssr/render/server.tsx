/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useReducer } from 'react';
import { renderToString } from 'react-dom/server';
import { reducer, InitStateContext } from '../hooks/useInitState';

const App = (props) => {
  const [state, dispatch] = useReducer(reducer, props.data);

  return (
    // @ts-ignore
    <InitStateContext.Provider value={[state, dispatch]}>
      {props.children}
      <div
        dangerouslySetInnerHTML={{
          __html: ` <script>window.__INIT_STATE__ = ${JSON.stringify(
            props.data,
          )};</script>`,
        }}
      ></div>
    </InitStateContext.Provider>
  );
};

const render = (PageContent, data) => {
  return renderToString(
    <App data={data}>
      <PageContent></PageContent>
    </App>,
  );
};

export { render };
