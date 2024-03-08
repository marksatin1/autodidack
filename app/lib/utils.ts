import { Photo } from "./definitions";

export function checkTransparency(
  ctx: CanvasRenderingContext2D | null,
  width: number,
  height: number
): boolean {
  if (ctx !== null) {
    const { data } = ctx.getImageData(0, 0, width, height);

    for (let i = 0; i < data.length; i += 4) {
      if (data[i] !== 0) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export function rotatePhotosLeft(photoArr: Photo[]) {
  let newPhotoArr = [...photoArr];
  let first = newPhotoArr.shift();
  if (first) newPhotoArr.push(first);
  return newPhotoArr;
}

export function rotatePhotosRight(photoArr: Photo[]) {
  let newPhotoArr = [...photoArr];
  let last = newPhotoArr.pop();
  if (last) newPhotoArr.unshift(last);
  return newPhotoArr;
}
