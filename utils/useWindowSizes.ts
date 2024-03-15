import { useState } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import { EBreakpoints } from "../enum/types";


export const useWindowSizes = () => {
  const [size, setSize] = useState([0, 0]);

  useIsomorphicLayoutEffect(() => {
    function updateSize() {
      const windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      setSize([window.innerWidth, windowHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export const useIsXXS = () => useWindowSizes()[0] < EBreakpoints.XXS;
export const useIsXS = () => useWindowSizes()[0] < EBreakpoints.XS;
export const useIsSM = () => useWindowSizes()[0] < EBreakpoints.SM;
export const useIsMD = () => useWindowSizes()[0] < EBreakpoints.MD;
export const useIsLG = () => useWindowSizes()[0] < EBreakpoints.LG;
export const useIsXL = () => useWindowSizes()[0] < EBreakpoints.XL;
export const useIsXXL = () => useWindowSizes()[0] >= EBreakpoints.XL;
