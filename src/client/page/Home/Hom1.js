import React from "react";
import { useInitState } from "../../../shared/hooks/useInitState";
import { Helmet } from "react-helmet";
import Link from '../../components/Link'

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
        <Link to="/home2">Go h2</Link>
      </div>
    </>
  );
};

export default Home;