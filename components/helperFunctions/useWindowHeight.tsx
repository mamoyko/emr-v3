import console from "console";

import { useState, useEffect } from "react";

const useWindowHeight = (): number => {
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowHeight;
};

export default useWindowHeight;
