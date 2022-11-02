import React, { useContext } from "react";

const InitStateContext = React.createContext({
  name: "",
  page: "", // home or pro
  message: "",
  list: [],
  // 页面特定的 每个页面都不一样
  data: "",
});

const reducer = (state, action) => {
  switch (action.type) {
    case "changeTheme":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return {
        ...state,
        ...action.payload,
      };
  }
};

const useInitState = () => {
  const initStateCtx = useContext(InitStateContext);
  const [state = {}, dispatch = null] = initStateCtx;
  return [state, dispatch];
};

export { InitStateContext, useInitState, reducer };
