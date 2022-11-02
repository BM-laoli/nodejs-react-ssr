import React from "react";
import { useInitState } from "../../../../shared/hooks/useInitState";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

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
        <h1>Hom1</h1>
        <Link to="/home/h2">前往H2x</Link>
      </div>
    </>
  );
};

export default Home;
