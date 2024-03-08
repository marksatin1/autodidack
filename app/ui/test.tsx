"use client";

// import { useEffect } from "react";
import { Photo } from "../lib/definitions";
import { useEffect, useState } from "react";

export default function Test({ photos }: { photos: Photo[] }) {
  const [arr, setArr] = useState(photos);

  function rotatePhotosLeft() {
    let newPhotos = [...arr];
    let first = newPhotos.shift();
    if (first) newPhotos.push(first);
    setArr(newPhotos);
    // console.log("rPR: ");
    // console.log(newPhotos);
  }

  function rotatePhotosRight() {
    let newPhotos = [...arr];
    let last = newPhotos.pop();
    if (last) newPhotos.unshift(last);
    setArr(newPhotos);
    console.log("rPL: ");
    console.log(newPhotos);
  }

  useEffect(() => {
    console.log("uE 1: ");
    console.log(arr);
    // rotatePhotosRight();
    rotatePhotosLeft();

    setTimeout(() => {
      console.log("uE 2: ");
      console.log(arr);
    }, 3000);
  }, []);

  return <div>Hello</div>;
}
