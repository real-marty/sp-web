"use client";

import React, { useEffect, useRef } from "react";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    };

    const timer = setTimeout(playVideo, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const defaultSourceProps = {
    src: "/video/back.mp4",
    type: "video/mp4",
  };

  return (
    <video
      ref={videoRef}
      width="1080"
      loop
      muted
      className="-z-10 w-full h-full object-cover"
    >
      <source {...defaultSourceProps} />
    </video>
  );
}
