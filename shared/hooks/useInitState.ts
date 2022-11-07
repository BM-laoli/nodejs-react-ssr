import React, { useContext } from "react";

export interface InterInitStateContext {
  name: string;
  data: number;
}

export enum EnumInitStateAction {
  dispatchName = "CHANGE_NAME",
  dispatchData = "CHANGE_DATA",
}

export interface interInitStateReducerAction {
  type: EnumInitStateAction;
  payload: Partial<InterInitStateContext>;
}

const InitStateContext = React.createContext({
  name: "",
  data: "",
});

type TypeInitStateReducer = (value: interInitStateReducerAction) => void;

const reducer = (
  state: InterInitStateContext,
  action: interInitStateReducerAction
) => {
  switch (action.type) {
    case EnumInitStateAction.dispatchName:
      return {
        ...state,
        name: action.payload,
      };
    case EnumInitStateAction.dispatchData:
      return {
        ...state,
        data: action.payload,
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
  // 在使用的时候 InitStateContext.povrider 或做成  [inistate , reduver]
  const [state, dispatch] = initStateCtx as unknown as [
    Partial<InterInitStateContext>,
    TypeInitStateReducer
  ];
  return [state, dispatch];
};

export { InitStateContext, useInitState };
