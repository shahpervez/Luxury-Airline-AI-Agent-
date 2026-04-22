"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";

const FRAME_COUNT = 160;

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { images, isLoaded, progress } = useImagePreloader({
    frameCount: FRAME_COUNT,
    sequencePath: "/sequence-1",
    startIndex: 0,
    padLength: 3,
    filenamePrefix: "frame_",
    filenameSuffix: "_delay-0.05s",
    extension: "jpg"
  });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const render = (index: number) => {
      const img = images[Math.round(index)];
      if (!img) return;

      // Draw image covering the canvas (like object-fit: cover)
      const hRatio = rect.width / img.width;
      const vRatio = rect.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (rect.width - img.width * ratio) / 2;
      const centerShift_y = (rect.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    // Initial render
    render(0);

    // Render on scroll
    const unsubscribe = frameIndex.on("change", (latest) => {
      render(latest);
    });

    // Handle resize
    const handleResize = () => {
      const currentRect = canvas.getBoundingClientRect();
      canvas.width = currentRect.width * dpr;
      canvas.height = currentRect.height * dpr;
      ctx.scale(dpr, dpr);
      render(frameIndex.get());
    };
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10 text-white font-sans text-sm tracking-widest uppercase">
            Loading Sequence {Math.round(progress * 100)}%
          </div>
        )}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        {/* Overlay content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]),
              y: useTransform(scrollYProgress, [0, 0.2], [0, -50])
            }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-light tracking-tighter text-white">
              SHAH AIRLINE
            </h1>
            <p className="mt-6 text-sm md:text-base text-neutral-300 uppercase tracking-[0.3em]">
              Elevate Your Atmosphere
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
