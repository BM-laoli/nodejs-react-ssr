import React from 'react';

const Link = (props) => {
  return (
    <a href={props.to}> {props.children}</a>
  )
}

export default Link;