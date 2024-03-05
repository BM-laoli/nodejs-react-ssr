/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useReducer } from 'react';
import { renderToString } from 'react-dom/server';

const App = (props) => {
  return <>{props.children}</>;
};

const render = (PageContent, initState) => {
  return renderToString(
    <App>
      <PageContent initState={initState}></PageContent>
    </App>,
  );
};

export { render };
