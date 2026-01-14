import { RefObject, useEffect, useRef, useState } from "react";

export const useToggleHeader = (ref: RefObject<HTMLDivElement | null> | null) => {
  const [isShowHeader, setIsShowHeader] = useState(true);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;
    const handleScroll = () => {
      const currentScrollTop = element.scrollTop;
      if (currentScrollTop > lastScrollTop.current && currentScrollTop > 50) {
        setIsShowHeader(false);
      } else {
        setIsShowHeader(true);
      }
      lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };
    element.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return { isShowHeader };
};
