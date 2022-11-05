import React, { FC } from "react";
import "./index.css";

interface InterButton {
  onChange?: () => void;
  children: React.ReactNode;
}

const Button: FC<InterButton> = (props) => {
  return (
    <div className="component-wrap">
      <button className="component-button" onClick={props.onChange}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
