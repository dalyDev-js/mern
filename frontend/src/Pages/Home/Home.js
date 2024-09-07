<<<<<<< HEAD
import React from "react";

export default function Home() {
  return <div>Home</div>;
}
=======
// import React from "react";

import GetStarted from "../../Components/GetStarted";
import TrustedBy from "../../Components/TrustedBy";
import SectionMain from "../../Components/houseBanner/SectionMain";
import Slider from "../../Components/Slider";
import Category from "../../Components/Category";
import Support from "../../Components/Support";
const Home = () => {
  return (
    <>
      <GetStarted />

      <SectionMain />
      <Slider />
      <Category />
      <Support />
    </>
  );
};

export default Home;
>>>>>>> adc2119ca6e787470a7169eb263d2166e8317f7b
