import { ImageResponse } from "next/og";

export const alt = "Autodidack | Home";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 692,
};

export default async function Image() {
  return (
    new ImageResponse(<img src="/pages/home" width={size.width} height={size.height} alt={alt} />),
    { ...size }
  );
}