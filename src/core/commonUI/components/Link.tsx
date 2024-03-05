import React, { FC } from 'react';

type InterLink = {
  ref?: any;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Link: FC<InterLink> = (props) => {
  const { href, target, onClick } = props;
  return (
    <a onClick={onClick} href={href} target={target}>
      {props.children}
    </a>
  );
};

export { Link };
