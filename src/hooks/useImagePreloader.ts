"use client";

import { useState, useEffect } from "react";

interface PreloaderOptions {
  frameCount: number;
  sequencePath: string;
  startIndex?: number;
  padLength?: number;
  filenamePrefix?: string;
  filenameSuffix?: string;
  extension?: string;
}

export function useImagePreloader({
  frameCount,
  sequencePath,
  startIndex = 1,
  padLength = 4,
  filenamePrefix = "",
  filenameSuffix = "",
  extension = "png"
}: PreloaderOptions) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const currentIdx = startIndex + i;
      const img = new Image();
      const num = currentIdx.toString().padStart(padLength, "0");
      img.src = `${sequencePath}/${filenamePrefix}${num}${filenameSuffix}.${extension}`;
      
      img.onload = () => {
        loadedCount++;
        if (isMounted) {
          setLoaded(loadedCount);
        }
      };
      
      img.onerror = () => {
        // Fallback for missing images, still increment so we don't hang
        loadedCount++;
        if (isMounted) {
          setLoaded(loadedCount);
        }
      }
      loadedImages.push(img);
    }

    setImages(loadedImages);

    return () => {
      isMounted = false;
    };
  }, [frameCount, sequencePath, startIndex, padLength, filenamePrefix, filenameSuffix, extension]);

  return { images, isLoaded: loaded === frameCount, progress: loaded / frameCount };
}
