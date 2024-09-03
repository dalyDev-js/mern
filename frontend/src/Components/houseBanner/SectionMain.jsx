import { useEffect, useRef, useState } from "react";
import Content from "./Content";
import { data } from "../../data";
import Canvas from "./Canvas";
import gsap from "gsap";
function SectionMain() {
  const banner = useRef();

  const [activeData, setactiveData] = useState(data[0]);

  const handleSwatchClick = (item) => {
    if (activeData.id !== item.id) setactiveData(item);
  };

  useEffect(() => {
    gsap.to(banner.current, {
      background: activeData.background,
      ease: "power3.inOut",
      duration: 0.8,
    });

    gsap.to(".header", {
      color: activeData.headingColor,
      ease: "power3.inOut",
      duration: 0.8,
    });
    return () => {};
  }, [activeData]);

  return (
    <div ref={banner} className="w-full h-3/5 max-h-3/4">
      <div className="w-full h-full flex flex-col lg:flex-row lg:space-x-4">
        <div className="w-full  lg:w-1/2">
          <Canvas
            activeData={activeData}
            swatchData={data}
            handleSwatchClick={handleSwatchClick}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <Content activeData={activeData} />
        </div>
      </div>
    </div>
  );
}

export default SectionMain;
