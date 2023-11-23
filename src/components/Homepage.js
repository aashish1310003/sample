import React from 'react';
import "../styles/fetchdata.css";
import Header from './Header';
import SolarCard from "../services/fechdata";
import Future from "../services/Future";

const Homepage = () => {

  return (
    <div>
      <Header />
<SolarCard />
<Future/>
    </div>
  );
}

export default Homepage;
