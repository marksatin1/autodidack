// when you arrive at page, you see one photo (it fades in)
// clicking the photo (or pressing enter key) enlarges it to full screen
// modal? maybe also makes browser window go full screen?
// clicking the photo again (or esc key) returns you to the gallery
// right arrow key goes to next photo, left arrow key goes to previous photo
// also works in full screen mode
// the transition between photos is animated
// the image tilts up and outwards on the y axis, and fades out...
// and the next photo tilts in and fades in to take its place
// the gallery loops after last photo

"use client";

import { Photo } from "@/app/lib/definitions";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { KeyboardEvent } from "react";
import { rotatePhotosLeft, rotatePhotosRight } from "../lib/utils";

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [photoArr, setPhotoArr] = useState<Photo[]>(photos);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [lastKey, setLastKey] = useState<string>("");
  const mainRef = useRef<HTMLDivElement>(null);

  // Focus to <main> when component mounts
  useEffect(() => {
    mainRef.current?.focus();
  }, []);

  function handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowLeft":
        let rightShiftArr = rotatePhotosRight(photoArr);
        setPhotoArr(rightShiftArr);
        setCurrentIdx(prev => (prev - 1 + photoArr.length) % photoArr.length);
        setLastKey("ArrowLeft");
        break;
      case "ArrowRight":
        let leftShiftArr = rotatePhotosLeft(photoArr);
        setPhotoArr(leftShiftArr);
        setCurrentIdx(prev => (prev + 1) % photoArr.length);
        setLastKey("ArrowRight");
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
      <div className="bsp relative w-full h-full flex items-center justify-center">
        {photoArr.map((p: Photo, i: number) => {
          let animationClass = "";
          if (i === currentIdx) {
            animationClass = lastKey === "ArrowLeft" ? "rotate-out-right" : "";
          }

          return (
            <Image
              key={p.id}
              src={p.url}
              width={p.width}
              height={p.height}
              alt={p.description}
              className={`object-contain layout-responsive w-[200px] max-h-full max-w-full ${
                i === 0 ? "block" : "hidden"
              } ${animationClass}`}
              priority={i === 0}
            />
          );
        })}
      </div>
    </main>
  );
}
