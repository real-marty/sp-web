"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type MousePosition = {
  x: number;
  y: number;
};

type Props = {
  content: string;
  styling: string;
};

export default function TextSnapping({ content, styling }: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateSnapPosition = (
    initialX: number,
    initialY: number,
  ): MousePosition => {
    const fraction = 0.1; // Adjust for stronger or weaker "snapping"
    const deltaX = (mousePosition.x - initialX) * fraction;
    const deltaY = (mousePosition.y - initialY) * fraction;

    return {
      x: initialX + deltaX,
      y: initialY + deltaY,
    };
  };

  const initialPosition = { x: -30, y: 15 }; // Using percentages might need adjustments

  const snapPosition = calculateSnapPosition(
    initialPosition.x,
    initialPosition.y,
  );

  return (
    <>
      <motion.div
        aria-hidden="true"
        className={`${styling}`}
        animate={{
          x: snapPosition.x,
          y: snapPosition.y,
          rotate: 12,
        }}
        transition={{
          duration: 1,
        }}
      >
        <h1 className="font-rye 2xl:text-[12rem]  xl:text-[11rem] lg:text-[7rem] md:text-[5rem] text-[3rem] text-white">
          {content}
        </h1>
      </motion.div>
    </>
  );
}
