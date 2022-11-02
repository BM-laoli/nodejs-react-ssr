import React from "react";
import { useInitState } from "../../../../shared/hooks/useInitState";
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
        <h1>P1</h1>
        <a href="/pro/p2">production</a>
      </div>
    </>
  );
};

export default Home;
