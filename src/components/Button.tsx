import React, { FC } from 'react';
import { useInitState } from '../share/hooks/useInitState';

export interface InterButton {
  title: string;
}

const Button: FC<InterButton> = (props) => {
  const [state] = useInitState();

  return (
    <>
      <div>{JSON.stringify(state)}</div>
      <button
        onClick={() => {
          console.log('state', state);
        }}
      >
        {props.title}
      </button>
    </>
  );
};

export default Button;
