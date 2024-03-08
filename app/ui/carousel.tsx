"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Photo } from "../lib/definitions";
import Image from "next/image";

export default function Carousel({ slides }: { slides: Photo[] }) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const mainRef = useRef<HTMLDivElement>(null);

  // Focus to <main> when component mounts
  useEffect(() => {
    mainRef.current?.focus();
  }, []);

  function handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowLeft":
        setCurrentIdx(prev => (prev - 1 + slides.length) % slides.length);
        break;
      case "ArrowRight":
        setCurrentIdx(prev => (prev + 1) % slides.length);
        break;
      default:
        console.log("Some other key was pressed.");
    }
  }

  return (
    <main
      tabIndex={0} // makes <main> focusable
      onKeyDown={handleKeyDown}
      ref={mainRef}
      className="p-4 outline-none w-full h-full flex items-center justify-center"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {slides.map((p: Photo, i: number) => {
          return (
            <Image
              key={p.id}
              src={p.url}
              width={p.width}
              height={p.height}
              alt={p.description}
              className={`absolute object-contain layout-responsive w-full max-h-full max-w-full ${
                i === currentIdx ? "opacity-100" : "opacity-0"
              } duration-[4s]`}
              priority={i === 0}
            />
          );
        })}
      </div>
    </main>
  );
}
