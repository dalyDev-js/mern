// import React from "react";

import GetStarted from "../../Components/GetStarted";
import TrustedBy from "../../Components/TrustedBy";
import SectionMain from "../../Components/houseBanner/SectionMain";
import Slider from "../../Components/Slider";
import Category from "../../Components/Category";
import Support from "../../Components/Support";
const Home = () => {
  const isLoggedIn = localStorage.getItem("Token");
  return (
    <>
      {!isLoggedIn && <GetStarted />}
      <SectionMain />
      <Slider />
      <Category />
      <Support />
    </>
  );
};

export default Home;
