"use client";

import { Photo } from "@/app/lib/definitions";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { KeyboardEvent } from "react";
import { rotatePhotosLeft, rotatePhotosRight } from "../lib/utils";
import { useTransition, animated } from "@react-spring/web";

export default function CarouselTest({ photos }: { photos: Photo[] }) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [transitions, setTransitions] = useState<string>("");
  const mainRef = useRef<HTMLDivElement>(null);

  // Focus to <main> when component mounts
  useEffect(() => {
    mainRef.current?.focus();
  }, []);

  function handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowLeft":
        setCurrentIdx(prev => (prev - 1 + photos.length) % photos.length);
        setTransitions("backward");
        break;
      case "ArrowRight":
        setCurrentIdx(prev => (prev + 1) % photos.length);
        setTransitions("forward");
        break;
      default:
        console.log("Some other key was pressed.");
    }
  }

  const backwardTransitions = useTransition(photos[currentIdx], {
    from: { opacity: 0, transform: "perspective(2000px) rotateY(25deg) translateX(20%)" },
    enter: { opacity: 1, transform: "perspective(0px) rotateY(0deg) translateX(0%)" },
    leave: { opacity: 0, transform: "perspective(2000px) rotateY(25deg) translateX(20%)" },
  });

  const forwardTransitions = useTransition(photos[currentIdx], {
    from: { opacity: 0, transform: "perspective(2000px) rotateY(-25deg) translateX(-20%)" },
    enter: { opacity: 1, transform: "perspective(0px) rotateY(0deg) translateX(0%)" },
    leave: { opacity: 0, transform: "perspective(2000px) rotateY(-25deg) translateX(20%)" },
  });

  return (
    <main
      tabIndex={0} // makes <main> focusable
      onKeyDown={handleKeyDown}
      ref={mainRef}
      className="p-4 outline-none w-full h-full flex items-center justify-center"
    >
      <div className="bsp object-contain layout-responsive relative w-2/3 h-full flex items-center justify-center">
        {transitions === "backward" &&
          backwardTransitions((style, p) => (
            <animated.img
              src={p.url}
              alt={p.description}
              width={p.width}
              height={p.height}
              style={{
                ...style,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          ))}
        {transitions === "forward" &&
          forwardTransitions((style, p) => (
            <animated.img
              src={p.url}
              alt={p.description}
              width={p.width}
              height={p.height}
              style={{
                ...style,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          ))}
        {/* {photos.map((p: Photo, i: number) => {
          return (
            <Image
              key={p.id}
              src={p.url}
              width={p.width}
              height={p.height}
              alt={p.description}
              className={`object-contain layout-responsive w-[200px] max-h-full max-w-full 
              ${i === 0 ? "block" : "hidden"}`}
              priority={i === 0}
            />
          );
        })} */}
      </div>
    </main>
  );
}
