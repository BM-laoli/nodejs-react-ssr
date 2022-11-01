import React ,  {  useReducer } from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import Router from '../shared/Router';
import { reducer, InitStateContext,  } from '../shared/hooks/useInitState'

const App = () => {
// 脱水
const [state, dispatch] = useReducer(reducer, {});

useEffect(() => {
  if(window.__INIT_STATE?.data) {
    dispatch({
      type:"",
      payload: window.__INIT_STATE
    }) 
  }
}, []);

  return  (
    <BrowserRouter>
      <InitStateContext.Provider value={[ state, dispatch]}>
      <Router></Router>
      </InitStateContext.Provider>
    </BrowserRouter>
  )
}
ReactDom.hydrate(<App></App>, document.getElementById("root"));
