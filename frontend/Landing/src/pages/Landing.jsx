// import React from "react";

import Category from "../Layout/Category";
import GetStarted from "../Layout/GetStarted";
import SectionMain from "../Layout/houseBanner/SectionMain";
import Slider from "../Layout/Slider";
import Support from "../Layout/Support";
import TrustedBy from "../Layout/TrustedBy";

export const Landing = () => {
  return (
    <>
      <GetStarted />
      <TrustedBy />
      <SectionMain />
      <Slider />
      <Category />
      <Support />
    </>
  );
};
