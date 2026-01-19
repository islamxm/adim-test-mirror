"use client";

import { useEffect, useRef, useState } from "react";

import ColorThief from "colorthief";

export const useGetAverageColor = (alpha: number = 1, image?: string) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [color, setColor] = useState<string>();

  useEffect(() => {
    if (imgRef.current && image) {
      imgRef.current.onload = () => {
        if (imgRef.current) {
          const color = new ColorThief().getColor(imgRef.current);
          setColor(`rgba(${color}, ${alpha})`);
        }
      };
    }
  }, [imgRef, image, alpha]);

  return {
    color,
    imgRef,
  };
};
