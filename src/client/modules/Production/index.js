import React from "react";
import { Link } from "react-router-dom";
import { useInitState } from "../../../shared/hooks/useInitState";
import { Helmet } from "react-helmet";

const Production = (props) => {
  const [state] = useInitState();

  return (
    <>
      <div>
        <h1> 产品</h1>
        <br></br>
        <Link to="/"> 首页 </Link>
        <br />
        <ul>
          {state?.data?.map((item) => {
            return <li key={item.id}>{item.email}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Production;
