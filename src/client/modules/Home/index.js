import React from "react";
import { Link } from "react-router-dom";
import { useInitState } from "../../../shared/hooks/useInitState";
import { Helmet } from "react-helmet";

const Home = (props) => {
  const [state] = useInitState();

  return (
    <>
      <div>
        <ul>
          {state?.data?.map((item) => {
            return <li key={item.id}>{item.email}</li>;
          })}
        </ul>
        <br></br>
        <h1>我是首页</h1>
        <a href="/production">production</a>
      </div>
    </>
  );
};

export default Home;
