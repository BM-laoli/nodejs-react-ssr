import React, { FC, useState } from 'react';

export interface InterButton {
  title: string;
}

const Button: FC<InterButton> = (props) => {
  const [state] = useState();

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
