"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Photo } from "../lib/definitions";

export default function BackgroundCarousel({ images }: { images: Photo[] }) {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 20000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-sm">
      {images.map((p, i) => {
        return (
          <Image
            key={p.id}
            src={p.url}
            width={p.width}
            height={p.height}
            alt={p.description}
            className={`absolute object-fill w-full h-full ${
              i === current ? "bg-fade" : "opacity-0"
            }`}
            priority={i === 0}
          />
        );
      })}
    </div>
  );
}
