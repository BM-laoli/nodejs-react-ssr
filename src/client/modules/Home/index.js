import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>我是首页</h1>
      <br></br>
      <Link to="/production">  去 产品页面</Link>
    </div>
  );
};

export default Home;
