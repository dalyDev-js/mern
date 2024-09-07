import gsap from "gsap";
import { useEffect } from "react";

function Content({ activeData }) {
  useEffect(() => {
    // Animate button colors
    gsap.to(".button", {
      color: activeData.buttonColor.text,
      backgroundColor: activeData.buttonColor.background,
      ease: "power3.inOut",
      duration: 1,
    });

    gsap.to("p", {
      color: activeData.headingColor,
      ease: "power3.inOut",
      duration: 0.8,
    });

    gsap.fromTo(
      ".text",
      { y: 200, opacity: 0 },
      {
        y: -10,
        opacity: 1,
        ease: "power3.out",
        duration: 1,
        stagger: {
          amount: 0.3,
        },
      }
    );

    return () => {};
  }, [activeData]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center md:items-start w-full md:w-2/3 text-center md:text-left">
        <h1 className="text-5xl font-bold mb-1 relative p-1 overflow-hidden w-full md:text-5xl lg:text-7xl md:my-8 lg:my-5">
          <p className="text">{activeData.heading}</p>
        </h1>
        <h6 className="text-2xl font-regular mb-6 w-full p-1 overflow-hidden md:text-4xl lg:my-6">
          <p className="text">{activeData.subHeading}</p>
        </h6>
        <p className="text-xs font-medium mb-8 p-1 overflow-hidden w-full md:text-base lg:my-6">
          <p className="text">{activeData.text}</p>
        </p>
        <div className="relative overflow-hidden p-4">
          <button className="cursor-pointer button rounded-2xl outline-none px-8 py-2 font-medium bg-amber-400 md:px-10 md:py-4">
            Hire Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Content;
