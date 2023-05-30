import { useContext, createContext } from 'react';

const InitStateContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        ...action.payload,
      };
  }
};

const useInitState = () => {
  const initStateCtx = useContext(InitStateContext);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [state = {}, dispatch = null] = initStateCtx;
  return [state, dispatch];
};

export { InitStateContext, useInitState, reducer };
