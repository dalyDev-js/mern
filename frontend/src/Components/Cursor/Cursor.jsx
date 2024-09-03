import gsap from "gsap";
import { useEffect, useState } from "react";

function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const hideCursor = () => {
      gsap.to(".cursor, .cursorDot", { opacity: 0, duration: 0.3 });
    };

    const showCursor = () => {
      gsap.to(".cursor, .cursorDot", { opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("mouseenter", showCursor);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("mouseenter", showCursor);
    };
  }, []);

  useEffect(() => {
    gsap.to(".cursor", {
      duration: 0.7,
      x: mousePosition.x * 2 - 50 + "%",
      y: mousePosition.y * 2 - 50 + "%",
      ease: "power3.out",
    });

    gsap.to(".cursorDot", {
      x: mousePosition.x,
      y: mousePosition.y,
      ease: "power3.out",
      duration: 0.1,
    });
  }, [mousePosition]);

  return (
    <>
      <div className="cursor"></div>
      <div className="cursorDot"></div>
    </>
  );
}

export default Cursor;
