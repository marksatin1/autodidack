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
import { useRef, useEffect, useReducer } from "react";
import { GalleryNavStates, GalleryNavAction } from "@/app/lib/definitions";
import { KeyboardEvent } from "react";

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [navStates, dispatch] = useReducer(galleryNavReducer, {
    current: 0,
    prev: photos.length - 1,
    currentAnimation: "",
    prevAnimation: "",
  });
  const mainRef = useRef<HTMLDivElement>(null);

  // Focus to <main> when component mounts
  useEffect(() => {
    mainRef.current?.focus();
    console.log(photos);
  }, []);

  function galleryNavReducer(state: GalleryNavStates, action: GalleryNavAction) {
    switch (action.type) {
      case "PREV":
        return {
          current: state.current === 0 ? photos.length - 1 : state.current - 1,
          prev: state.current,

          currentAnimation: "rotate-out-left",
          prevAnimation: "rotate-in-right",
        };
      case "NEXT":
        return {
          current: state.current === photos.length - 1 ? 0 : state.current + 1,
          prev: state.current,
          currentAnimation: "rotate-out-right",
          prevAnimation: "rotate-in-left",
        };
      default:
        return state;
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowLeft":
        dispatch({ type: "PREV" });
        break;
      case "ArrowRight":
        dispatch({ type: "NEXT" });
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
        {photos.map((p: Photo, i: number) => {
          return (
            <Image
              key={p.id}
              src={p.url}
              width={p.width}
              height={p.height}
              alt={p.description}
              className={`object-contain layout-responsive w-[200px] max-h-full max-w-full ${
                i === navStates.current
                  ? `${navStates.currentAnimation} block`
                  : i === navStates.prev
                  ? `${navStates.prevAnimation} hidden`
                  : "hidden"
              }`}
              priority={i === 0}
            />
          );
        })}
      </div>
    </main>
  );
}
