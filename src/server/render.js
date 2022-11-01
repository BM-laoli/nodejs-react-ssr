import React from 'react';
import { renderToString } from "react-dom/server";
import {  StaticRouter } from 'react-router-dom/server';
import Router from '../shared/Router'

const render = (path) => { 
  return renderToString( 
  <StaticRouter  location={path} > 
    <Router></Router>
  </StaticRouter>);
};

export { render };
