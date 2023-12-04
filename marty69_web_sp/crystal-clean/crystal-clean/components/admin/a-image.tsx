"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";
import type { ImgHTMLAttributes } from "react";

type ImageElementProps = ImgHTMLAttributes<HTMLImageElement> & ImageProps;

export function UserImage({ src, ...props }: ImageElementProps) {
  const { alt, ...imageProps } = props; // Destructure props to separate 'alt' and rest of the props.

  return (
    <Image src={src} alt={alt} width={150} height={150} {...imageProps}></Image>
  );
}
